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
</script>


<template>
  <div :gutter="0" class="wrapper">
    <div class="left">
      <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
        活动信息录入
      </h1>
      <el-form :model="form" label-width="auto">
        <!-- 表单内容将在后续 commits 中添加 -->
      </el-form>
    </div>
  </div>
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
