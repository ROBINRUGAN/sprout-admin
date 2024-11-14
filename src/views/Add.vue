<script lang="ts" setup>
import { reactive, ref, onBeforeMount, watch } from 'vue'
import UploadImg from '@/components/UploadImg.vue'
import MapContainer from '@/components/MapContainer.vue'
import { ElNotification } from 'element-plus'
import { getFacultyApi, getMajorApi, CreateFatherApi, CreateSonApi, getPastApi } from '@/api/api'
interface Colleges {
  facultyName: string
  id: number
}
interface Majors {
  majorName: string
  id: number
}
interface brief {
  taskName: ''
  id: ''
}
const items = ref<brief[]>([])
const loading = ref(false)
const mapVisible = ref(false)
const colleges = ref<Colleges[]>([])
const majors = ref<Majors[]>([])
const form = reactive({
  faorson: 1,
  parentId: 0,
  isMain: 0,
  taskName: '',
  taskDescription1: '',
  taskDescription2: '',
  taskDescription: '',
  taskType: '',
  taskImages: '',
  taskPoints: 0,
  taskRewards: '',
  taskRectangle: '-1',
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
  taskRequiresType: null,
  requiresAudit: 0,
  startTime: '',
  endTime: '',
  tree: 0,
  chan: 0,
  water: 0
})
const getLat = (lat: string) => {
  form.taskLatitude = lat
}
const getLng = (lng: string) => {
  form.taskLongitude = lng
}
const onSubmit = async () => {
  loading.value = true
  form.requiresAudit = form.requiresAudit ? 1 : 0
  form.taskRewards = form.water + ',' + form.chan + ',' + form.tree
  form.taskDescription = form.taskDescription1 + '\n' + form.taskDescription2
  if (form.taskRequiresType === 4) {
    if (form.taskLatitude === '' || form.taskLongitude === '' || form.taskRadius === '') {
      ElNotification.error('请填写完整的地点信息')
      setTimeout(() => {
        loading.value = false
      }, 1000)
      return
    }
    form.taskRectangle = form.taskLongitude + ',' + form.taskLatitude + ',' + form.taskRadius
  }

  console.log(form)
  let res = null
  if (form.faorson == 1) res = await CreateFatherApi(form)
  else if (form.faorson == 0) res = await CreateSonApi(form)
  if (res) {
    if (res.data.code == '0') {
      ElNotification.success('发布成功')
    } else {
      ElNotification.error(res.data.message)
    }
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}
const setURL = (urls: string[]) => {
  form.taskImages = urls.join('<')
}

const fetchColleges = async () => {
  // 调用API获取学院列表
  const res = await getFacultyApi()

  colleges.value = res.data.data.facultyList
  // console.log(colleges.value)
}

const fetchMajors = async () => {
  form.requiresMajor = ''
  if (form.requiresFaculty) {
    const res = await getMajorApi(form.requiresFaculty)
    majors.value = res.data.data.majorList
    // console.log(majors.value)
  }
}

watch(
  () => form.faorson,
  () => {
    if (form.faorson === 1) {
      form.parentId = -1
    } else {
      form.parentId = null
    }
  }
)

onBeforeMount(async () => {
  fetchColleges()
  await getPastApi({
    current: 1,
    size: 10,
    queryParentTask: 1,
    keyword: ''
  }).then((res) => {
    if (res.data.code == '0') {
      items.value = res.data.data.records
    } else {
      ElNotification.error(res.data.message)
    }
  })
})
</script>
<template>
  <div class="wrapper" v-loading="loading">
    <div class="left">
      <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
        任务信息录入
      </h1>

      <el-form :model="form">
        <div class="form-grid">
          <div class="form-item">
            <el-form-item label="任务等级">
              <el-radio-group v-model="form.faorson">
                <el-radio :value="1" label="父" />
                <el-radio :value="0" label="子" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务属性" v-if="form.faorson === 1">
              <el-radio-group v-model="form.parentId">
                <el-radio :value="-1" label="含多项子任务" />
                <el-radio :value="0" label="单项" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="父任务" v-if="form.faorson === 0">
              <el-select v-model="form.parentId" placeholder="请输入...">
                <el-option
                  v-for="item in items"
                  :key="item.id"
                  :value="item.id"
                  :label="item.taskName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务类型">
              <el-radio-group v-model="form.isMain">
                <el-radio :value="1" label="主线任务" />
                <el-radio :value="0" label="支线任务" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务对象年级">
              <el-input v-model="form.requiresGrade" />
            </el-form-item>
            <el-form-item label="任务对象所在学院">
              <el-select
                v-model="form.requiresFaculty"
                placeholder="请选择..."
                @change="fetchMajors"
              >
                <el-option
                  v-for="college in colleges"
                  :key="college.id"
                  :value="college.id"
                  :label="college.facultyName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务对象专业">
              <el-select v-model="form.requiresMajor" placeholder="请选择...">
                <el-option
                  v-for="major in majors"
                  :key="major.id"
                  :value="major.id"
                  :label="major.majorName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务名称">
              <el-input v-model="form.taskName" placeholder="请输入..." />
            </el-form-item>
            <el-form-item label="任务方式" v-if="form.faorson === 0 || form.parentId === 0">
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
              label="任务地点"
              v-if="
                (form.faorson === 0 || form.parentId === 0) &&
                (form.taskRequiresType === 3 || form.taskRequiresType === 4)
              "
            >
              <el-button @click="mapVisible = true">打开地图定位</el-button>
              <el-dialog
                v-model="mapVisible"
                style="border-radius: 20px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                title="请在下面点击选取任务中心点"
                width="70vw"
              >
                <MapContainer style="margin: auto" @getLng="getLng" @getLat="getLat" />
              </el-dialog>
            </el-form-item>
            <el-form-item
              label="地点半径(m)"
              v-if="
                (form.faorson === 0 || form.parentId === 0) &&
                (form.taskRequiresType === 3 || form.taskRequiresType === 4)
              "
            >
              <el-input v-model="form.taskRadius" placeholder="请输入..." />
            </el-form-item>

            <el-form-item label="任务时段">
              <div class="time-picker">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
                <span>—</span>
                <el-date-picker
                  v-model="form.endTime"
                  placeholder="Pick a time"
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  type="datetime"
                />
              </div>
            </el-form-item>

            <el-form-item label="任务简介">
              <el-input v-model="form.taskDescription1" />
            </el-form-item>
            <el-form-item label="任务描述">
              <el-input v-model="form.taskDescription2" type="textarea" :rows="4" />
            </el-form-item>
          </div>

          <div class="form-item">
            <el-form-item label="任务封面">
              <UploadImg @urls="setURL"></UploadImg>
            </el-form-item>
            <el-form-item label="任务奖励">
              <div class="reward-inputs">
                <div>
                  <span style="margin-right: 20px">小水滴</span>
                  <el-input-number style="width: 130px" v-model="form.water" :min="0" :max="10" />
                </div>
                <div>
                  <span style="margin-right: 20px">小铲子</span>
                  <el-input-number style="width: 130px" v-model="form.chan" :min="0" :max="10" />
                </div>
                <div>
                  <span style="margin-right: 20px">小树苗</span>
                  <el-input-number style="width: 130px" v-model="form.tree" :min="0" :max="10" />
                </div>
                <div>
                  <span style="margin-right: 20px">积&nbsp;&nbsp;&nbsp;分</span>
                  <el-input-number
                    style="width: 130px"
                    v-model="form.taskPoints"
                    :min="0"
                    :max="10"
                  />
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
            <el-form-item
              label="图片打卡"
              v-if="(form.faorson === 0 || form.parentId === 0) && form.taskRequiresType == 5"
            >
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
            <el-form-item label="是否人工审核" v-if="form.faorson === 0 || form.parentId === 0">
              <el-switch v-model="form.requiresAudit" active-text="是" inactive-text="否" />
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
            <el-form-item label="难易度">
              <el-slider
                v-model="form.taskDifficulty"
                :step="1"
                :min="1"
                :max="5"
                show-stops
                show-input
              />
            </el-form-item>
            <el-form-item>
              <el-button
                size="large"
                type="primary"
                @click="onSubmit"
                round
                style="margin: auto; width: 100px"
                >创建任务</el-button
              >
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: calc(100vh - 100px);
}

.left {
  background-color: #fff;
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-item {
  padding: 0 20px;
}

.time-picker {
  display: flex;
  gap: 10px;
  align-items: center;
}

.reward-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 5px;
  padding: 10px;
}

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
