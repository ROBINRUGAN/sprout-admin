<template>
  <div class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      广告发布
    </h1>
    <el-form ref="adForm" :model="form" label-width="120px">
      <div class="grid-container">
        <div class="grid-item">
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
            <UploadFile @urls="setURL"></UploadFile>
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
        </div>
        <div class="grid-item">
          <!-- 学院选择 -->
          <el-form-item label="目标学院">
            <el-select v-model="form.targetFacultyRange" placeholder="请选择...">
              <el-option
                v-for="college in colleges"
                :key="college.id"
                :value="college.id"
                :label="college.facultyName"
              ></el-option>
            </el-select>
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

          <!-- 表单提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue'
import UploadFile from '@/components/UploadFile.vue' // 确保路径正确
import { getFacultyApi, putAdApi } from '@/api/api' // 确保API路径正确
import { ElNotification } from 'element-plus'

const form = reactive({
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

const keywordArray = computed(() => {
  return form.keywords.split(',').filter(Boolean)
})

const keywordCount = computed(() => {
  return keywordArray.value.length
})

const submitForm = async () => {
  form.keywordsCount = keywordCount.value
  const res = await putAdApi(form)
  if (res.data.code == '0') {
    ElNotification.success('发布成功')
  } else {
    ElNotification.error(res.data.message)
  }
}

const colleges = ref([])

const setURL = (urls) => {
  form.imgContent = urls.join('<')
  console.log(form.imgContent)
}

const fetchColleges = async () => {
  const res = await getFacultyApi()
  colleges.value = res.data.data.facultyList
}

onBeforeMount(() => {
  fetchColleges()
})
</script>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 85vh;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
