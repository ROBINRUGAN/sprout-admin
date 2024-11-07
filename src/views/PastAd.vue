<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adDetailApi } from '@/api/api' // 确保API路径正确
import { ElMessage } from 'element-plus'

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
  // console.log(items.value[id])
  form.value = items.value[id]
}

const fetchAdList = async () => {
  // console.log(searchForm)
  const res = await adDetailApi(searchForm)
  if (res.data.code == '0') {
    ElMessage.success('查询成功')
    isShow.value = false
    items.value = res.data.data.records
  } else {
    ElMessage.error(res.data.message)
  }
}
</script>
<template>
  <div :gutter="0" class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      广告一览
    </h1>
    <!-- 查询部分 -->
    <el-form :model="searchForm" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="广告类型">
            <el-select v-model="searchForm.adType" placeholder="请选择">
              <el-option label="文本" :value="1"></el-option>
              <el-option label="图片" :value="2"></el-option>
              <el-option label="视频" :value="3"></el-option>
              <el-option label="文本+图片" :value="4"></el-option>
              <el-option label="文本+视频" :value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="广告时间范围">
            <el-col :span="11">
              <el-date-picker
                v-model="searchForm.startTime"
                type="datetime"
                value-format="YYYY-MM-DDTHH:mm:ss"
                placeholder="开始时间"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" style="text-align: center">—</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="searchForm.endTime"
                type="datetime"
                value-format="YYYY-MM-DDTHH:mm:ss"
                placeholder="结束时间"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="fetchAdList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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

    <el-form
      ref="adForm"
      :model="form"
      label-width="120px"
      disabled
      v-if="isShow"
      style="margin-top: 20px"
    >
      <el-row>
        <el-col :span="12">
          <!-- 广告类型 -->
          <el-form-item label="广告类型">
            <el-select v-model="form.adType" placeholder="请选择">
              <el-option label="文本" :value="1"></el-option>
              <el-option label="图片" :value="2"></el-option>
              <el-option label="视频" :value="3"></el-option>
              <el-option label="文本+图片" :value="4"></el-option>
              <el-option label="文本+视频" :value="5"></el-option>
            </el-select>
          </el-form-item>

          <!-- 文本内容 -->
          <el-form-item label="文本内容">
            <el-input v-model="form.wordsContent" type="textarea"></el-input>
          </el-form-item>

          <!-- 图片/视频内容 -->
          <el-form-item label="图片/视频内容">
            <el-image style="height: 100px" :src="form.imgContent" fit="cover" />
          </el-form-item>

          <!-- 跳转链接 -->
          <el-form-item label="跳转链接">
            <el-input v-model="form.linkUrl" placeholder="请输入跳转链接或-1代表无跳转"></el-input>
          </el-form-item>

          <!-- 关键字 -->
          <el-form-item label="关键字">
            <el-input v-model="form.keywords" placeholder="请输入关键字，用逗号分隔"></el-input>
          </el-form-item>

          <!-- 推送方式 -->
          <el-form-item label="推送方式">
            <el-select v-model="form.pushMethod" placeholder="请选择">
              <el-option label="app内展示" :value="1"></el-option>
              <el-option label="消息推送" :value="2"></el-option>
              <el-option label="全部" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <!-- 推送位置 -->
          <el-form-item label="推送位置">
            <el-select v-model="form.pushPosition" placeholder="请选择推送位置">
              <el-option label="消息推送" value="0"></el-option>
              <el-option label="开屏" value="1"></el-option>
              <el-option label="首页" value="2"></el-option>
              <el-option label="首页轮播图" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 学院选择 -->
          <el-form-item label="目标学院">
            <el-input v-model="form.targetFacultyRange" placeholder="请选择..."> </el-input>
          </el-form-item>

          <!-- 目标性别 -->
          <el-form-item label="目标性别">
            <el-select v-model="form.targetGenderRange" placeholder="请选择">
              <el-option label="女" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="全部" value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- 目标年级范围 -->
          <el-form-item label="目标年级范围">
            <el-input
              v-model="form.targetGradeRange"
              placeholder="请输入目标年级范围，用逗号分隔或-1代表全部"
            ></el-input>
          </el-form-item>

          <!-- 广告开始时间和结束时间 -->
          <el-form-item label="广告时间范围">
            <el-col :span="11">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="开始时间"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" style="text-align: center">—</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="结束时间"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>

          <!-- 广告费用 -->
          <el-form-item label="广告费用">
            <el-input v-model="form.cost" type="number" placeholder="请输入广告费用"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped>
.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
}

.card {
  display: inline-block;
  width: 550px; /* 这里的宽度可以根据您的设计来调整 */
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
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0;
  color: #666;
  display: flex;
}

.card-description {
  font-size: 0.9em;
  color: #666;
}
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.el-button--primary {
  width: 100px;
}
.el-divider--horizontal {
  margin: 0;
}
</style>
