<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from 'vue'
import UploadImg from '@/components/UploadImg.vue'
import MapContainer from '@/components/MapContainer.vue'
import { ElMessage } from 'element-plus'
import { getFacultyApi, getMajorApi, CreateFatherApi, CreateSonApi } from '@/api/api'

interface Colleges {
  facultyName: string
  id: number
}
interface Majors {
  majorName: string
  id: number
}

const colleges = ref<Colleges[]>([])
const majors = ref<Majors[]>([])
const form = reactive({
  faorson: 1,
  parentId: -1,
  isMain: 0,
  taskName: '',
  taskDescription: '',
  taskType: '',
  taskImages: '',
  taskPoints: 0,
  taskRewards: '',
  taskRectangle: '-1',
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
})

const getLat = (lat: string) => {
  form.taskLatitude = lat
}
const getLng = (lng: string) => {
  form.taskLongitude = lng
}
const setURL = (urls: string[]) => {
  form.taskImages = urls.join('<')
}
const onSubmit = async () => {
  form.requiresAudit = form.requiresAudit ? 1 : 0
  form.taskRewards = form.water + ',' + form.chan + ',' + form.tree
  if (form.taskRequiresType === 3 || form.taskRequiresType === 4) {
    if (form.taskLatitude === '' || form.taskLongitude === '' || form.taskRadius === '') {
      ElMessage.error('请填写完整的地点信息')
      return
    }
    form.taskRectangle = form.taskLongitude + ',' + form.taskLatitude + ',' + form.taskRadius
  }

  console.log('上传信息' + form)
  let res = null
  if (form.faorson == 1) res = await CreateFatherApi(form)
  else if (form.faorson == 0) res = await CreateSonApi(form)
  if (res) {
    if (res.data.code == '0') {
      ElMessage.success('发布成功')
    } else {
      ElMessage.error(res.data.message)
    }
  }
}
</script>


<template>
<template>
  <el-form-item label="活动地点" v-if="form.taskRequiresType === 3 || form.taskRequiresType === 4">
    <el-button plain @click="mapVisible = true">打开地图定位</el-button>
    <el-dialog v-model="mapVisible" title="请在下面点击选取活动中心点" width="800">
      <MapContainer style="margin: auto" @getLng="getLng" @getLat="getLat" />
    </el-dialog>
  </el-form-item>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.left {
  background-color: #fff;
  width: 100%;
}
</style>
