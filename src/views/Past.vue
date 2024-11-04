<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getPastApi, getPastChildApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  current: 1,
  size: 10,
  queryParentTask: 1,
  keyword: ''
})
const showSon = ref(false)
const showDetail = ref(false)

interface brief {
  id: ''
  faorson: 1
  parentId: -1
  isMain: 0
  Audit: false
  taskName: ''
  taskDescription: ''
  taskType: ''
  taskImages: ''
  taskPoints: 0
  taskRewards: ''
  taskRectangle: ''
  taskLatitude: ''
  taskLongitude: ''
  taskRadius: ''
  taskDifficulty: 0
  taskPriority: 0
  requiresGrade: ''
  requiresFaculty: ''
  requiresMajor: ''
  requiresPhoto: 0
  requiresAttitude: ''
  requiresItem: ''
  taskRequiresType: 0
  requiresAudit: 0
  startTime: ''
  endTime: ''
  tree: 0
  chan: 0
  water: 0
}

const items = ref<brief[]>([])
const detailItems = ref<brief[]>([])
const form = ref({
  id: '',
  faorson: 1,
  parentId: -1,
  isMain: 0,
  taskName: '',
  Audit: false,
  taskDescription: '',
  taskType: '',
  taskImages: '',
  taskPoints: 0,
  taskRewards: '',
  taskRectangle: '',
  taskLatitude: '',
  taskLongitude: '',
  taskRadius: '',
  taskDifficulty: 0,
  taskPriority: 0,
  requiresGrade: '',
  requiresFaculty: '',
  requiresMajor: '',
  requiresPhoto: 0,
  requiresAttitude: '',
  requiresItem: '',
  taskRequiresType: 0,
  requiresAudit: 0,
  startTime: '',
  endTime: '',
  tree: 0,
  chan: 0,
  water: 0
})

const search = () => {
  getPastApi(searchForm).then((res) => {
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      items.value = res.data.data.records
      showDetail.value = false
      showSon.value = false
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

const getDetail = (data: any, index: number) => {
  getPastChildApi({
    id: data.id,
    querySubTask: 1
  }).then((res) => {
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      detailItems.value = res.data.data.subTaskList
      showSon.value = true
      if (data.parentId == '0') {
        showDetail.value = true
        form.value = data
        if (form.value.requiresAudit === 1) {
          form.value.Audit = true
        } else {
          form.value.Audit = false
        }
        form.value.water = parseInt(form.value.taskRewards.split(',')[0])
        form.value.chan = parseInt(form.value.taskRewards.split(',')[1])
        form.value.tree = parseInt(form.value.taskRewards.split(',')[2])
      }
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

const getDetailInfo = (id: number) => {
  showDetail.value = true
  form.value = detailItems.value[id]
  if (form.value.requiresAudit === 1) {
    form.value.Audit = true
  } else {
    form.value.Audit = false
  }
  form.value.water = parseInt(items.value[id].taskRewards.split(',')[0])
  form.value.chan = parseInt(items.value[id].taskRewards.split(',')[1])
  form.value.tree = parseInt(items.value[id].taskRewards.split(',')[2])
}

onMounted(() => {
  search()
})
</script>
<template>
  <div :gutter="0" class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      活动一览
    </h1>
    <el-form :model="form" label-width="auto" style="margin-top: 20px" @submit.prevent="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="活动名称">
            <el-input v-model="searchForm.keyword" placeholder="活动名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动类型">
            <el-radio-group v-model="searchForm.queryParentTask">
              <el-radio :value="1" label="父任务"></el-radio>
              <el-radio :value="0" label="单项任务"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider />
  </div>
</template>
