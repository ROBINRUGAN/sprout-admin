<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getPastApi, getPastChildApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'

const searchForm = reactive({
  current: 1,
  size: 10,
  queryParentTask: 1,
  keyword: ''
})

const loading = ref(true)

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
const search = async () => {
  loading.value = true
  await getPastApi(searchForm).then((res) => {
    if (res.data.code == '0') {
      ElNotification.success('搜索任务成功')
      items.value = res.data.data.records
      showDetail.value = false
      showSon.value = false
      setTimeout(() => {
        loading.value = false
      }, 1000)
      // loading.value = false
    } else {
      ElNotification.error(res.data.message)
    }
  })
}
onMounted(() => {
  search()
})

const getDetail = async (data: any, index: number) => {
  loading.value = true
  await getPastChildApi({
    id: data.id,
    querySubTask: 1
  }).then((res) => {
    if (res.data.code == '0') {
      ElNotification.success('查询子任务成功')
      setTimeout(() => {
        loading.value = false
      }, 1000)
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
      ElNotification.error(res.data.message)
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
  form.value.water = parseInt(detailItems.value[id].taskRewards.split(',')[0])
  form.value.chan = parseInt(detailItems.value[id].taskRewards.split(',')[1])
  form.value.tree = parseInt(detailItems.value[id].taskRewards.split(',')[2])
}
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <h1 style="font-size: 24px; margin: 15px 0">任务一览</h1>
    <el-form :model="form" label-width="auto" @submit.prevent="search">
      <div class="form-group">
        <div class="form-item">
          <el-form-item label="任务名称">
            <el-input v-model="searchForm.keyword" placeholder="任务名称"></el-input>
          </el-form-item>
        </div>
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
        @click="getDetailInfo(index)"
      >
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '任务id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <el-form
      :model="form"
      label-width="auto"
      style="margin-top: 20px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding: 20px"
      v-if="showDetail"
    >
      <div class="form-detail">
        <div class="form-column">
          <el-form-item label="任务封面">
            <el-image
              style="
                height: 180px;
                width: 180px;
                box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.5);
                border-radius: 5px;
              "
              :src="form.taskImages"
              fit="cover"
            />
          </el-form-item>
          <el-form-item label="任务对象年级">
            <el-input v-model="form.requiresGrade" disabled />
          </el-form-item>
          <el-form-item label="任务对象所在学院">
            <el-input v-model="form.requiresFaculty" disabled />
          </el-form-item>
          <el-form-item label="任务对象专业">
            <el-input v-model="form.requiresMajor" disabled />
          </el-form-item>
          <el-form-item label="任务名称">
            <el-input v-model="form.taskName" disabled />
          </el-form-item>
          <el-form-item label="任务方式">
            <el-select v-model="form.taskRequiresType" disabled>
              <el-option label="其他" :value="0" />
              <el-option label="答题" :value="1" />
              <el-option label="浏览网页" :value="2" />
              <el-option label="摄像头打卡" :value="3" />
              <el-option label="定位打卡" :value="4" />
              <el-option label="图片打卡" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="任务时段">
            <div class="datetime-range">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                disabled
                style="width: 100%"
              />
              <span>—</span>
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                disabled
                style="width: 100%"
              />
            </div>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="form.taskDescription" type="textarea" :rows="6" disabled />
          </el-form-item>
        </div>
        <div class="form-column">
          <el-form-item label="任务奖励">
            <div class="reward-container">
              <div>
                <span>小水滴</span>
                <el-input-number v-model="form.water" :min="1" :max="10" disabled />
              </div>
              <div>
                <span>小铲子</span>
                <el-input-number v-model="form.chan" :min="1" :max="10" disabled />
              </div>
              <div>
                <span>小树苗</span>
                <el-input-number v-model="form.tree" :min="1" :max="10" disabled />
              </div>
              <div>
                <span>积分</span>
                <el-input-number v-model="form.taskPoints" :min="1" :max="10" disabled />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="form.taskType" disabled>
              <el-option label="开学前" :value="0" />
              <el-option label="注册时" :value="1" />
              <el-option label="开学后" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="图片打卡">
            <el-select v-model="form.requiresPhoto" disabled>
              <el-option label="不需要" :value="0" />
              <el-option label="物品" :value="1" />
              <el-option label="人像" :value="2" />
              <el-option label="动作" :value="3" />
              <el-option label="其他" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否人工审核">
            <el-switch v-model="form.Audit" active-text="是" inactive-text="否" disabled />
          </el-form-item>
          <el-form-item label="优先级">
            <el-slider v-model="form.taskPriority" :step="1" :min="1" :max="5" disabled />
          </el-form-item>
          <el-form-item label="难易程度">
            <el-slider v-model="form.taskDifficulty" :step="1" :min="1" :max="5" disabled />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: calc(100vh - 100px);
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
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
.form-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.form-item {
  flex: 1;
}
.form-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.form-column {
  /* flex: 1; */
}
.reward-container {
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.datetime-range {
  display: flex;
  align-items: center;
}
.datetime-range span {
  margin: 0 10px;
}
@media (max-width: 1024px) {
  .form-group {
    flex-direction: column;
  }
  .form-detail {
    grid-template-columns: 1fr;
  }
}
</style>
