<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { getPastApi, getPastChildApi, getTaskSubmitApi, submitAuditApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { ElAvatar, ElCard, ElDescriptions, ElDescriptionsItem, ElDialog } from 'element-plus'

const dialogVisible = ref(false)

// 打开审核对话框
const openAuditDialog = () => {
  dialogVisible.value = true
}

const auditForm = reactive({
  ids: [0],
  //审核状态 1-审核通过 2-审核不通过
  auditsStatus: 0,
  completionScore: [0],
  auditSuggestion: ['无']
})

// 审核操作
const handleAudit = async (type: number) => {
  auditForm.auditsStatus = type

  console.log(auditForm)
  const res = await submitAuditApi(auditForm)
  if (res.data.code === '0') {
    ElMessage.success('审核操作成功')
    dialogVisible.value = false
    taskInfo.value.auditsSuggestion = auditForm.auditSuggestion[0]
    taskInfo.value.auditsStatus = auditForm.auditsStatus
  } else {
    ElMessage.error('审核操作失败：' + res.data.message)
  }
}

const searchForm = reactive({
  current: 1,
  size: 10,
  //查询父任务 还是 单项任务 0-单项任务 1-父任务
  queryParentTask: 1,
  keyword: ''
})
const showSon = ref(false)
const showDetail = ref(false)
const showTask = ref(false)
const form = ref({
  id: '',
  faorson: 1,
  parentId: -1,
  isMain: 0,
  taskName: '',
  taskDescription: '',
  taskType: '',
  taskImages: '',
  taskPoints: 0,
  taskRewards: '',
  taskRectangle: '',
  //纬度
  taskLatitude: '',
  //经度
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
interface brief {
  id: ''
  faorson: 1
  parentId: -1
  isMain: 0
  taskName: ''
  taskDescription: ''
  taskType: ''
  taskImages: ''
  taskPoints: 0
  taskRewards: ''
  taskRectangle: ''
  //纬度
  taskLatitude: ''
  //经度
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
interface task {
  id: 0
  userId: 0
  username: ''
  realName: ''
  studentId: ''
  avatar: ''
  taskId: 0
  parentTaskId: 0
  photo: ''
  location: ''
  submitTime: ''
  submitNote: ''
  auditsStatus: null
  auditsSuggestion: null
  auditsAdminId: 0
}
const items = ref<brief[]>([])
const detailItems = ref<brief[]>([])
const taskItems = ref<task[]>([])
const taskInfo = ref<task>({
  id: 0,
  userId: 0,
  username: '',
  realName: '',
  studentId: '',
  avatar: '',
  taskId: 0,
  parentTaskId: 0,
  photo: '',
  location: '',
  submitTime: '',
  submitNote: '',
  auditsStatus: null,
  auditsSuggestion: null,
  auditsAdminId: 0
})
const search = () => {
  getPastApi(searchForm).then((res) => {
    // console.log(res.data.data.records)
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      items.value = res.data.data.records
      showDetail.value = false
      showSon.value = false
      showTask.value = false
    } else {
      ElMessage.error(res.data.message)
    }
  })
}
onMounted(() => {
  search()
})
const getDetail = (data: any, index: number) => {
  getPastChildApi({
    id: data.id,
    querySubTask: 1
  }).then((res) => {
    console.log(data)
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      detailItems.value = res.data.data.subTaskList
      showSon.value = true
      if (data.parentId == '0') {
        showDetail.value = true
      }
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

const getDetailInfo = async (data: any) => {
  const res = await getTaskSubmitApi({
    current: '1',
    size: '114514',
    taskId: data
  })
  if (res.data.code === '0') {
    taskItems.value = res.data.data.records
    showDetail.value = true
    taskItems.value.forEach((item) => {
      if (item.auditsSuggestion == null) {
        item.auditsSuggestion = '尚未填写'
      }
    })
    console.log(taskItems.value)
    ElMessage.success('查询成功')
  } else {
    ElMessage.error(res.data.message)
  }
}

const getTaskInfo = (id: number, item: any) => {
  taskInfo.value = taskItems.value[id]
  showTask.value = true
  auditForm.ids[0] = item.id
}
</script>

<template>
  <div class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      学生提交审核
    </h1>
    <el-form :model="form" label-width="auto" style="margin-top: 20px" @submit.prevent="search">
      <el-row :gutter="20">
        <!-- 活动名称 -->
        <el-col :span="8">
          <el-form-item label="活动名称">
            <el-input v-model="searchForm.keyword" placeholder="活动名称"></el-input>
          </el-form-item>
        </el-col>
        <!-- 活动类型 -->
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

    <div class="scroll-container">
      <div class="card" v-for="(item, index) in items" :key="index" @click="getDetail(item, index)">
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <div class="scroll-container" v-if="showSon">
      <div
        class="card"
        v-for="(item, index) in detailItems"
        :key="index"
        @click="getDetailInfo(item.id)"
      >
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <div class="scroll-container" v-if="showDetail">
      <div
        class="card"
        v-for="(item, index) in taskItems"
        :key="index"
        @click="getTaskInfo(index, item)"
      >
        <img :src="item.avatar" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.realName }}</div>
          <div class="card-description">{{ item.auditsSuggestion }}</div>
        </div>
      </div>
    </div>

    <el-card class="box-card" v-if="showTask">
      <template v-slot:header>
        <div class="clearfix">
          <span>任务详细信息</span>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label="头像">
          <el-avatar :src="taskInfo.avatar"></el-avatar>
        </el-descriptions-item>
        <el-descriptions-item label="定位信息">{{ taskInfo.location }}</el-descriptions-item>
        <el-descriptions-item label="图片">
          <el-image style="height: 100px" :src="taskInfo.photo" fit="cover" />
        </el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ taskInfo.realName }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ taskInfo.studentId }}</el-descriptions-item>
        <el-descriptions-item label="提交备注">{{ taskInfo.submitNote }}</el-descriptions-item>
        <el-descriptions-item label="任务提交时间">{{ taskInfo.submitTime }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">{{
          taskInfo.auditsStatus === 0 ? '不通过' : '通过'
        }}</el-descriptions-item>
        <el-descriptions-item label="审核意见">{{
          taskInfo.auditsSuggestion
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="openAuditDialog">进行审核</el-button>
    </el-card>
  </div>
  <!-- 审核对话框 -->
  <el-dialog title="审核任务" v-model="dialogVisible">
    <el-form>
      <el-form-item label="审核意见">
        <el-input type="textarea" v-model="auditForm.auditSuggestion[0]" rows="3"></el-input>
      </el-form-item>
      <el-form-item label="完成评分">
        <el-input type="textarea" v-model="auditForm.completionScore[0]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="danger" @click="handleAudit(2)">不通过</el-button>
      <el-button type="success" @click="handleAudit(1)">通过</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
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

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
}

.card {
  display: inline-block;
  width: 450px; /* 这里的宽度可以根据您的设计来调整 */
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  vertical-align: top;
}
.card-image {
  width: 450px;
  height: 250px;
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

.card-description {
  font-size: 0.9em;
  color: #666;
}
.card-id {
  justify-content: right;
  font-size: 0.5em;
  margin-top: -5px;
  margin-bottom: 10px;
  padding: 0;
  color: #666;
  display: flex;
}
</style>
