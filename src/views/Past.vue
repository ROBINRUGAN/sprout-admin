<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { getPastApi, getPastChildApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'

const searchForm = reactive({
  current: 1,
  size: 10,
  queryParentTask: 1,
  keyword: ''
})

const authStore = useAuthStore()

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
  taskDescription1: ''
  taskDescription2: ''
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
  requiresFacultyName: ''
  requiresMajor: ''
  requiresMajorName: ''
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
  taskDescription1: '',
  taskDescription2: '',
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
  requiresFacultyName: '',
  requiresMajor: '',
  requiresMajorName: '',
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
      showDetail.value = false

      if (data.parentId == '0') {
        showDetail.value = true
        form.value = data
        authStore.fetchColleges().then(() => {
          form.value.requiresFacultyName = authStore.collegeName(form.value.requiresFaculty)
        })
        authStore.fetchMajors(form.value.requiresFaculty).then(() => {
          form.value.requiresMajorName = authStore.majorName(form.value.requiresMajor)
        })

        form.value.taskDescription1 = form.value.taskDescription.split('\n')[0]
        form.value.taskDescription2 = form.value.taskDescription.split('\n')[1]
        form.value.Audit = form.value.requiresAudit === 1 ? true : false
        form.value.water = parseInt(form.value.taskRewards.split(',')[0])
        form.value.chan = parseInt(form.value.taskRewards.split(',')[1])
        form.value.tree = parseInt(form.value.taskRewards.split(',')[2])
      }
    } else {
      ElNotification.error(res.data.message)
    }
  })
}

const getDetailInfo = async (id: number) => {
  showDetail.value = true
  form.value = detailItems.value[id]
  console.log(form.value)
  await authStore.fetchColleges()
  await authStore.fetchMajors(form.value.requiresFaculty)

  if (form.value.requiresAudit === 1) {
    form.value.Audit = true
  } else {
    form.value.Audit = false
  }
  form.value.taskDescription1 = form.value.taskDescription.split('\n')[0]
  form.value.taskDescription2 = form.value.taskDescription.split('\n')[1]
  form.value.requiresFacultyName = authStore.collegeName(form.value.requiresFaculty)
  form.value.requiresMajorName = authStore.majorName(form.value.requiresMajor)
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
      style="margin-top: 20px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding: 20px"
      v-if="showDetail"
    >
      <div class="form-detail">
        <div class="form-column">
          <el-form-item label="任务封面">
            <el-image
              class="detailed-image"
              :src="form.taskImages"
              :preview-src-list="[form.taskImages]"
              fit="cover"
            />
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="form.requiresGrade" disabled />
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="form.requiresFacultyName" disabled />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.requiresMajorName" disabled />
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
          <!-- <el-form-item label="任务描述">
            <el-input v-model="form.taskDescription" type="textarea" :rows="6" disabled />
          </el-form-item> -->

          <el-form-item label="任务简介">
            <el-input v-model="form.taskDescription1" disabled />
          </el-form-item>
        </div>

        <div class="form-column">
          <el-form-item
            :label="
              form.taskRequiresType === 1
                ? '答题链接'
                : form.taskRequiresType === 2
                  ? '网页链接'
                  : '任务描述'
            "
          >
            <el-input v-model="form.taskDescription2" type="textarea" :rows="4" disabled />
          </el-form-item>
          <el-form-item label="任务奖励">
            <div class="reward-container">
              <div>
                <span style="margin-right: 20px">小水滴</span>
                <el-input-number
                  style="width: 110px"
                  v-model="form.water"
                  :min="0"
                  :max="1000"
                  disabled
                />
              </div>
              <div>
                <span style="margin-right: 20px">小铲子</span>
                <el-input-number
                  style="width: 110px"
                  v-model="form.chan"
                  :min="0"
                  :max="1000"
                  disabled
                />
              </div>
              <div>
                <span style="margin-right: 20px">小树苗</span>
                <el-input-number
                  style="width: 110px"
                  v-model="form.tree"
                  :min="0"
                  :max="1000"
                  disabled
                />
              </div>
              <div>
                <span style="margin-right: 20px">积&nbsp;&nbsp;&nbsp;分</span>
                <el-input-number
                  style="width: 110px"
                  v-model="form.taskPoints"
                  :min="1"
                  :max="1000"
                  disabled
                />
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item label="任务类型">
            <el-select v-model="form.taskType" disabled>
              <el-option label="开学前" :value="0" />
              <el-option label="注册时" :value="1" />
              <el-option label="开学后" :value="2" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="图片打卡">
            <el-select v-model="form.requiresPhoto" disabled>
              <el-option label="不需要" :value="0" />
              <el-option label="物品" :value="1" />
              <el-option label="人像" :value="2" />
              <el-option label="动作" :value="3" />
              <el-option label="其他" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="物品识别类型" v-if="form.requiresPhoto === 1">
            <el-select v-model="form.requiresItem" disabled>
              <el-option label="手机" :value="'67'" />
              <el-option label="行李箱" :value="'28'" />
              <el-option label="雨伞" :value="'25'" />
              <el-option label="背包" :value="'24'" />
              <el-option label="电脑" :value="'63'" />
              <el-option label="水壶" :value="'39'" />
              <el-option label="书" :value="'73'" />
              <el-option label="牙刷" :value="'79'" />
              <el-option label="吹风机" :value="'78'" />
            </el-select>
          </el-form-item>
          <el-form-item label="动作识别类型" v-if="form.requiresPhoto === 3">
            <el-select v-model="form.requiresAttitude" disabled>
              <el-option label="水平摆放" :value="'1'" />
              <el-option label="立正站直" :value="'2'" />
              <el-option label="加油动作" :value="'3'" />
              <el-option label="V动作" :value="'4'" />
              <el-option label="手摆成三角形" :value="'5'" />
              <el-option label="大字状" :value="'6'" />
              <el-option label="扎马步" :value="'7'" />
              <el-option label="右手举手" :value="'8'" />
              <el-option label="左手举手" :value="'9'" />
              <el-option label="双手比x" :value="'10'" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="是否人工审核">
            <el-switch v-model="form.Audit" active-text="是" inactive-text="否" disabled />
          </el-form-item> -->
          <!-- <el-form-item label="优先级">
            <el-slider v-model="form.taskPriority" :step="1" :min="1" :max="5" disabled />
          </el-form-item>
          <el-form-item label="难易程度">
            <el-slider v-model="form.taskDifficulty" :step="1" :min="1" :max="5" disabled />
          </el-form-item> -->
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

.detailed-image {
  height: 180px;
  width: 180px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.reward-container {
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
@media (max-width: 768px) {
  .detailed-image {
    width: 100%;
    height: fit-content;
  }
  .el-form-item {
    display: flex;
    flex-direction: column;
    align-items: start; /* 保持内容宽度自适应 */
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
    width: calc(100vw - 180px);
    /* width: 50vw; 保证下拉框、输入框、时间选择器等控件宽度充满父容器 */
  }
}
</style>
