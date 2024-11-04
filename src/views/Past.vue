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

onMounted(() => {
  search()
})

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
        @click="getDetailInfo(index)"
      >
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <el-form :model="form" label-width="auto" disabled v-if="showDetail" style="margin-top: 20px">
      <el-row :gutter="0">
        <el-col :span="12" style="padding: 0 40px">
          <el-form-item label="父活动ID" v-if="form.faorson === 0">
            <el-input v-model="form.parentId" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="活动类型">
            <el-radio-group v-model="form.isMain">
              <el-radio :value="1" label="主线任务" />
              <el-radio :value="0" label="支线任务" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任务对象年级">
            <el-input v-model="form.requiresGrade" />
          </el-form-item>
          <el-form-item label="任务对象所在学院">
            <el-input v-model="form.requiresFaculty" placeholder="请选择..."> </el-input>
          </el-form-item>
          <el-form-item label="任务对象专业">
            <el-input v-model="form.requiresMajor" placeholder="请选择..."> </el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="form.taskName" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="活动方式">
            <el-select v-model="form.taskRequiresType" placeholder="请选择...">
              <el-option label="其他" :value="0" />
              <el-option label="答题" :value="1" />
              <el-option label="浏览网页" :value="2" />
              <el-option label="摄像头打卡" :value="3" />
              <el-option label="定位打卡" :value="4" />
              <el-option label="图片打卡" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="地点半径(m)"
            v-if="form.taskRequiresType === 3 || form.taskRequiresType === 4"
          >
            <el-input v-model="form.taskRadius" placeholder="请输入..." />
          </el-form-item>

          <el-form-item label="活动时段">
            <el-col :span="11">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" style="display: flex; justify-content: center">
              <span>—</span>
            </el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="form.endTime"
                placeholder="Pick a time"
                style="width: 100%"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="活动描述">
            <el-input v-model="form.taskDescription" type="textarea" :rows="6" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding: 0 40px">
          <el-form-item label="活动封面">
            <el-image style="height: 100px" :src="form.taskImages" fit="cover" />
          </el-form-item>
          <el-form-item label="活动奖励">
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border: 1px solid rgba(187, 187, 187, 1);
                border-radius: 5px;
                padding: 10px;
              "
            >
              <div>
                <span style="margin-right: 20px">小水滴</span>
                <el-input-number v-model="form.water" :min="1" :max="10" />
              </div>
              <div>
                <span style="margin-right: 20px">小铲子</span>
                <el-input-number v-model="form.chan" :min="1" :max="10" />
              </div>
              <div>
                <span style="margin-right: 20px">小树苗</span>
                <el-input-number v-model="form.tree" :min="1" :max="10" />
              </div>
              <div>
                <span style="margin-right: 20px">积&nbsp;&nbsp;&nbsp;分</span>
                <el-input-number v-model="form.taskPoints" :min="1" :max="10" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="form.taskType" placeholder="请选择...">
              <el-option label="开学前" :value="0" />
              <el-option label="注册时" :value="1" />
              <el-option label="开学后" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="图片打卡">
            <el-select v-model="form.requiresPhoto" placeholder="请选择...">
              <el-option label="不需要" :value="0" />
              <el-option label="物品" :value="1" />
              <el-option label="人像" :value="2" />
              <el-option label="动作" :value="3" />
              <el-option label="其他" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="物品识别类型" v-if="form.requiresPhoto === 1">
            <el-select v-model="form.requiresItem">
              <el-option label="背包" :value="24" />
              <el-option label="雨伞" :value="25" />
              <el-option label="杯子" :value="41" />
              <el-option label="笔记本电脑" :value="63" />
              <el-option label="书" :value="73" />
              <el-option label="吹风机" :value="78" />
              <el-option label="牙刷" :value="79" />
              <el-option label="身份证" :value="1" />
              <el-option label="录取通知书" :value="2" />
              <el-option label="银行卡" :value="3" />
              <el-option label="证件照" :value="4" />
              <el-option label="手机" :value="5" />
              <el-option label="衣物" :value="6" />
              <el-option label="文具" :value="7" />
            </el-select>
          </el-form-item>
          <el-form-item label="动作识别类型" v-if="form.requiresPhoto === 3">
            <el-select v-model="form.requiresAttitude">
              <el-option label="水平摆放" :value="1" />
              <el-option label="立正站直" :value="2" />
              <el-option label="加油动作" :value="3" />
              <el-option label="V动作" :value="4" />
              <el-option label="手摆成三角形" :value="5" />
              <el-option label="大字状" :value="6" />
              <el-option label="扎马步" :value="7" />
              <el-option label="右手举手" :value="8" />
              <el-option label="左手举手" :value="9" />
              <el-option label="双手比x" :value="10" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否人工审核">
            <el-switch v-model="form.Audit" active-text="是" inactive-text="否" />
          </el-form-item>
          <el-form-item label="优先级">
            <el-slider
              v-model="form.taskPriority"
              :step="1"
              :min="1"
              :max="5"
              show-stops
              show-input
            />
          </el-form-item>
          <el-form-item label="难易程度">
            <el-slider
              v-model="form.taskDifficulty"
              :step="1"
              :min="1"
              :max="5"
              show-stops
              show-input
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped>
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
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
