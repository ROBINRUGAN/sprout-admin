<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adDetailApi } from '@/api/api' // 确保API路径正确
import { ElMessage } from 'element-plus'

// 初始化响应式数据
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

// 创建生命周期钩子
onMounted(() => {
  fetchAdList()
})

// 数据接口类型定义
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

// 获取广告详细信息
const getDetail = (id: number) => {
  isShow.value = true
  form.value = items.value[id]
}

// 获取广告列表数据
const fetchAdList = async () => {
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
  </div>
    <!-- 显示广告列表 -->
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
</template>
