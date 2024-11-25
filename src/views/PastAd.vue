<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adDetailApi } from '@/api/api' // 确保API路径正确
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const loading = ref(false)
const isShow = ref(false)
const searchForm = reactive({
  current: 1,
  size: 10,
  adType: null,
  startTime: '',
  endTime: ''
})
const form = ref({
  adType: null,
  wordsContent: '',
  imgContent: '',
  linkUrl: '',
  keywords: '',
  pushMethod: null,
  pushPosition: '',
  targetFacultyRange: '',
  targetGenderRange: '',
  targetGradeRange: '',
  startTime: '',
  endTime: '',
  cost: '',
  keywordsCount: 1
})
onMounted(() => {
  fetchAdList()
})
interface brief {
  id: number
  adType: null
  wordsContent: ''
  imgContent: ''
  linkUrl: ''
  keywords: ''
  pushMethod: null
  pushPosition: ''
  targetFacultyRange: ''
  targetGenderRange: ''
  targetGradeRange: ''
  startTime: ''
  endTime: ''
  cost: ''
  keywordsCount: 1
}
const items = ref<brief[]>([])

const getDetail = (id: number) => {
  isShow.value = true
  form.value = items.value[id]
  console.log(form.value)
  authStore.fetchColleges().then(() =>
    authStore.fetchMajors(form.value.targetFacultyRange).then(() => {
      form.value.targetFacultyRange = authStore.collegeName(form.value.targetFacultyRange)
      form.value.targetGradeRange =
        form.value.targetGradeRange == '-1' ? '全部' : form.value.targetGradeRange
      form.value.linkUrl = form.value.linkUrl == '-1' ? '无跳转捏' : form.value.linkUrl
      form.value.targetGradeRange =
        form.value.targetGradeRange == '-1' ? '全部' : form.value.targetGradeRange
    })
  )
}

const fetchAdList = async () => {
  loading.value = true
  const res = await adDetailApi(searchForm)
  if (res.data.code == '0') {
    ElNotification.success('查询成功')
    isShow.value = false
    items.value = res.data.data.records
    setTimeout(() => {
      loading.value = false
    }, 1000)
  } else {
    ElNotification.error(res.data.message)
  }
}
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      广告一览
    </h1>
    <!-- 查询部分 -->
    <el-form :model="searchForm">
      <div style="display: flex; gap: 20px; flex-wrap: wrap">
        <!-- <el-form-item label="广告类型" style="flex: 1; min-width: 200px">
          <el-select v-model="searchForm.adType" placeholder="请选择">
            <el-option label="文本" :value="1"></el-option>
            <el-option label="图片" :value="2"></el-option>
            <el-option label="视频" :value="3"></el-option>
            <el-option label="文本+图片" :value="4"></el-option>
            <el-option label="文本+视频" :value="5"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="时间范围" style="flex-wrap: wrap">
          <div id="time_range" style="display: flex; width: 100%; justify-content: center">
            <el-date-picker
              v-model="searchForm.startTime"
              type="datetime"
              value-format="YYYY-MM-DDTHH:mm:ss"
              placeholder="开始时间"
              style="width: 100%; min-width: 170px"
            />

            <span class="separator">—</span>

            <el-date-picker
              v-model="searchForm.endTime"
              type="datetime"
              value-format="YYYY-MM-DDTHH:mm:ss"
              placeholder="结束时间"
              style="width: 100%; min-width: 170px"
            />
          </div>
        </el-form-item>

        <el-button
          style="flex: 0.2; padding: 0 20px; min-width: max-content; margin: 0 auto"
          type="primary"
          @click="fetchAdList"
          >查询</el-button
        >
      </div>
    </el-form>
    <el-divider />
    <div class="scroll-container">
      <div class="card" v-for="(item, index) in items" :key="index" @click="getDetail(index)">
        <img :src="item.imgContent" alt="" class="card-image" />
        <div class="card-id">{{ '广告id: ' + item.id }}</div>
        <div class="card-content">
          <div class="card-title">{{ item.wordsContent }}</div>
        </div>
      </div>
    </div>

    <el-form ref="adForm" :model="form" disabled v-if="isShow" style="margin-top: 20px">
      <div class="form-grid">
        <div class="left-column">
          <!-- <el-form-item label="广告类型">
            <el-select v-model="form.adType" placeholder="请选择">
              <el-option label="文本" :value="1"></el-option>
              <el-option label="图片" :value="2"></el-option>
              <el-option label="视频" :value="3"></el-option>
              <el-option label="文本+图片" :value="4"></el-option>
              <el-option label="文本+视频" :value="5"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item :label="form.adType == 6 ? '投放标题' : '广告标题'">
            <el-input v-model="form.wordsContent"></el-input>
          </el-form-item>

          <el-form-item :label="form.adType == 6 ? '投放内容' : '广告内容'">
            <el-image
              class="detailed-image"
              :src="form.imgContent"
              :preview-src-list="[form.imgContent]"
              fit="cover"
            />
          </el-form-item>

          <el-form-item label="跳转链接">
            <el-input v-model="form.linkUrl" placeholder="请输入跳转链接或-1代表无跳转"></el-input>
          </el-form-item>

          <el-form-item label="关键字" v-if="form.keywords">
            <el-input v-model="form.keywords" placeholder="请输入关键字，用逗号分隔"></el-input>
          </el-form-item>

          <el-form-item label="推送方式" v-if="form.pushMethod">
            <el-select v-model="form.pushMethod" placeholder="请选择">
              <el-option label="app内展示" :value="1"></el-option>
              <el-option label="消息推送" :value="2"></el-option>
              <el-option label="全部" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="推送位置" v-if="form.pushPosition">
            <el-select v-model="form.pushPosition" placeholder="请选择推送位置">
              <el-option label="消息推送" value="0"></el-option>
              <el-option label="开屏页" value="1"></el-option>
              <el-option label="首页弹窗" value="2"></el-option>
              <el-option label="首页轮播图" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="right-column" v-if="form.targetFacultyRange">
          <el-form-item label="目标学院">
            <el-input v-model="form.targetFacultyRange" placeholder="请选择..."></el-input>
          </el-form-item>

          <el-form-item label="目标性别" v-if="form.targetGenderRange">
            <el-select v-model="form.targetGenderRange" placeholder="请选择">
              <el-option label="女" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="全部" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="目标年级范围" v-if="form.targetGradeRange">
            <el-input
              v-model="form.targetGradeRange"
              placeholder="请输入目标年级范围，用逗号分隔或-1代表全部"
            ></el-input>
          </el-form-item>

          <el-form-item label="广告时间范围" v-if="form.startTime && form.endTime">
            <div class="date-picker-group">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="开始时间"
                style="width: 45%"
              />
              <span class="separator">—</span>
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="结束时间"
                style="width: 45%"
              />
            </div>
          </el-form-item>

          <el-form-item label="广告费用" v-if="form.cost">
            <el-input v-model="form.cost" type="number" placeholder="请输入广告费用"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: calc(100vh - 100px);
}

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
}

.card {
  display: inline-block;
  width: 550px;
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  vertical-align: top;
}

.card-image {
  width: 550px;
  height: 300px;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.card-id {
  justify-content: right;
  font-size: 0.5em;
  margin: 10px;
  color: #666;
  display: flex;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
}

.date-picker-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.separator {
  padding: 0 8px;
  text-align: center;
}
.detailed-image {
  height: 200px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #time_range {
    flex-wrap: wrap;
  }
}
@media (max-width: 768px) {
  .detailed-image {
    width: 100%;
    height: fit-content;
  }
  :deep().el-form-item {
    display: flex;
    flex-direction: column;
    align-items: start; /* 保持内容宽度自适应 */
    margin-bottom: 5px;
  }
  .el-form-item .el-form-item__label {
    text-align: left; /* 保持标签左对齐 */
    margin-bottom: 5px; /* 增加标签与输入框之间的间距 */
  }
  .el-form-item .el-form-item__content {
    width: 100%; /* 确保输入框或下拉框宽度充满父容器 */
  }
  .el-select,
  .el-input,
  .el-input-number,
  .el-date-picker {
    width: calc(100vw - 140px);
    /* width: 50vw; 保证下拉框、输入框、时间选择器等控件宽度充满父容器 */
  }
}
</style>
