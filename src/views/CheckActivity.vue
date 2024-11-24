<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { getPastApi, getPastChildApi, getTaskSubmitApi, submitAuditApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { ElAvatar, ElCard, ElDescriptions, ElDescriptionsItem, ElDialog } from 'element-plus'

const dialogVisible = ref(false)

const openAuditDialog = () => {
  dialogVisible.value = true
}

const loading = ref(false)

const auditForm = reactive({
  ids: [0],
  //审核状态 1-审核通过 2-审核不通过
  auditsStatus: 0,
  completionScore: [100],
  auditSuggestion: ['无']
})

// 审核操作
const handleAudit = async (type: number) => {
  auditForm.auditsStatus = type

  console.log(auditForm)
  const res = await submitAuditApi(auditForm)
  if (res.data.code === '0') {
    ElNotification.success('审核操作成功')
    dialogVisible.value = false
    taskInfo.value.auditsSuggestion = auditForm.auditSuggestion[0]
    taskInfo.value.auditsStatus = auditForm.auditsStatus
  } else {
    ElNotification.error('审核操作失败：' + res.data.message)
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
  location: '-1'
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
  location: '-1',
  submitTime: '',
  submitNote: '',
  auditsStatus: null,
  auditsSuggestion: null,
  auditsAdminId: 0
})
const search = () => {
  loading.value = true
  getPastApi(searchForm).then((res) => {
    if (res.data.code == '0') {
      ElNotification.success('搜索任务成功')
      items.value = res.data.data.records
      showDetail.value = false
      showSon.value = false
      showTask.value = false
      setTimeout(() => {
        loading.value = false
      }, 1000)
    } else {
      ElNotification.error(res.data.message)
    }
  })
}
onMounted(() => {
  search()
})
const getDetail = (data: any, index: number) => {
  showTask.value = false
  showDetail.value = false
  loading.value = true
  getPastChildApi({
    id: data.id,
    querySubTask: 1
  }).then((res) => {
    console.log(data)
    if (res.data.code == '0') {
      ElNotification.success('查询子任务成功')
      detailItems.value = res.data.data.subTaskList
      showSon.value = true
      setTimeout(() => {
        loading.value = false
      }, 500)
      if (data.parentId == '0') {
        showDetail.value = true
        getDetailInfo(data.id)
      }
    } else {
      ElNotification.error(res.data.message)
    }
  })
}

const getDetailInfo = async (data: any) => {
  showTask.value = false
  loading.value = true
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
    ElNotification.success('查询参与者成功')
    setTimeout(() => {
      loading.value = false
    }, 200)
  } else {
    ElNotification.error(res.data.message)
  }
}

const getTaskInfo = (id: number, item: any) => {
  taskInfo.value = taskItems.value[id]
  showTask.value = true
  auditForm.ids[0] = item.id
  auditForm.auditSuggestion[0] = item.auditsSuggestion
  // auditForm.completionScore[0] = item.completionScore
}
</script>
<template>
  <div class="wrapper" v-loading="loading">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      学生提交审核
    </h1>
    <el-form :model="form" label-width="auto" style="margin-top: 20px" @submit.prevent="search">
      <div class="form-group">
        <!-- 任务名称 -->
        <div class="form-item">
          <el-form-item label="任务名称">
            <el-input v-model="searchForm.keyword" placeholder="任务名称"></el-input>
          </el-form-item>
        </div>
        <!-- 任务类型 -->
        <div class="form-item">
          <el-form-item label="任务类型">
            <el-radio-group v-model="searchForm.queryParentTask">
              <el-radio :value="1" label="父任务"></el-radio>
              <el-radio :value="0" label="单项任务"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <el-divider />

    <div class="scroll-container">
      <div class="card" v-for="(item, index) in items" :key="index" @click="getDetail(item, index)">
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '任务id: ' + item.id }}</div>
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
          <div class="card-id">{{ '任务id: ' + item.id }}</div>
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
          <div class="card-id">{{ '任务id: ' + item.id }}</div>
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
      <div class="task-info-container">
        <!-- 左侧头像和审核部分 -->
        <div class="left-section">
          <el-image
            :src="taskInfo.avatar"
            :preview-src-list="[taskInfo.avatar]"
            class="large-avatar"
          />
          <el-button type="primary" @click="openAuditDialog" class="audit-button"
            >进行审核</el-button
          >
          <div style="display: flex; margin-top: 20px">
            <p v-if="taskInfo.auditsSuggestion">
              <strong>审核意见：</strong>{{ taskInfo.auditsSuggestion }}
            </p>

            <p v-if="taskInfo.auditsStatus !== null" style="margin-left: 20px">
              <strong>审核状态：</strong
              >{{
                taskInfo.auditsStatus === 2
                  ? '不通过'
                  : taskInfo.auditsStatus === 1
                    ? '通过'
                    : '暂未审核'
              }}
            </p>
          </div>
        </div>
        <!-- 右侧详细信息 -->
        <div class="right-section">
          <el-descriptions :column="1" class="details-info">
            <el-descriptions-item label="用户ID" v-if="taskInfo.userId">{{
              taskInfo.userId
            }}</el-descriptions-item>
            <el-descriptions-item label="用户名" v-if="taskInfo.username">{{
              taskInfo.username
            }}</el-descriptions-item>
            <el-descriptions-item label="真实姓名" v-if="taskInfo.realName">{{
              taskInfo.realName
            }}</el-descriptions-item>
            <el-descriptions-item label="学号" v-if="taskInfo.studentId">{{
              taskInfo.studentId
            }}</el-descriptions-item>
            <!-- <el-descriptions-item label="任务ID" v-if="taskInfo.taskId">{{
              taskInfo.taskId
            }}</el-descriptions-item>
            <el-descriptions-item label="父任务ID" v-if="taskInfo.parentTaskId">{{
              taskInfo.parentTaskId
            }}</el-descriptions-item> -->
            <el-descriptions-item
              label="定位信息"
              v-if="taskInfo.location != '-1' && taskInfo.location != null"
              >{{ taskInfo.location }}</el-descriptions-item
            >
            <el-descriptions-item label="提交备注" v-if="taskInfo.submitNote">{{
              taskInfo.submitNote
            }}</el-descriptions-item>
            <el-descriptions-item label="任务提交时间" v-if="taskInfo.submitTime">
              {{ new Date(taskInfo.submitTime).toLocaleString() }}
            </el-descriptions-item>
            <!-- <el-descriptions-item label="审核管理员ID" v-if="taskInfo.auditsAdminId">{{
              taskInfo.auditsAdminId
            }}</el-descriptions-item> -->
            <el-descriptions-item label="提交图片" v-if="taskInfo.photo">
              <!-- <el-descriptions-item label="提交图片" > -->
              <el-image
                :src="taskInfo.photo"
                fit="cover"
                style="width: 100px; height: 100px; border-radius: 10px"
                :preview-src-list="[taskInfo.photo]"
              />
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>

    <!-- 审核对话框 -->
    <el-dialog title="审核任务" v-model="dialogVisible">
      <el-form>
        <el-form-item label="审核意见">
          <el-input type="textarea" v-model="auditForm.auditSuggestion[0]" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="完成评分">
          <el-input v-model="auditForm.completionScore[0]"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="danger" @click="handleAudit(2)">不通过</el-button>
        <el-button type="success" @click="handleAudit(1)">通过</el-button>
      </template>
    </el-dialog>
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
  width: 450px;
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

.task-info-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.large-avatar {
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.7);
}

.audit-button {
  margin-top: 10px;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.details-info .el-descriptions__label {
  font-weight: bold;
}

.form-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.form-item {
  flex: 1;
}

@media (max-width: 1024px) {
  .form-group {
    flex-direction: column;
  }
  .task-info-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
