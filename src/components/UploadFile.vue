<template>
  <el-upload
    v-model:file-list="fileList"
    :http-request="uploadImage"
    list-type="picture"
    :before-upload="beforeUpload"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :limit="2"
    :auto-upload="true"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">支持上传jpg/png/avi/mov/mp4文件，不超过50M</div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <template v-if="isVideo(dialogFileType)">
      <video :src="dialogImageUrl" controls style="max-width: 100%"></video>
    </template>
    <template v-else>
      <img :src="dialogImageUrl" alt="Preview" style="max-width: 100%" />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
const emit = defineEmits(['urls'])
import { GetURLApi } from '@/api/api'
const fileList = ref<UploadUserFile[]>([])
const urlList = ref<string[]>([])
import { ElNotification } from 'element-plus'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogFileType = ref('')
const isVideo = (fileType: string) => {
  // 视频文件的MIME类型通常以"video/"开头
  return fileType.startsWith('video/')
}

const beforeUpload = (file: { type: string; size: number }) => {
  const allowedTypes = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'image/jpeg',
    'image/png'
  ]
  const isAllowedType = allowedTypes.includes(file.type)
  if (!isAllowedType) {
    ElNotification.error('只允许上传 mp4, mov, avi, jpg, png, jpeg 格式的文件')
    return false
  }
  const isLt500M = file.size / 1024 / 1024 < 50
  if (!isLt500M) {
    ElNotification.error('文件大小不能超过 50MB')
    return false
  }
  return true
}

const uploadImage: UploadProps['httpRequest'] = async ({ file }) => {
  const formData = new FormData()
  formData.append('files', file)
  const res = await GetURLApi(formData)
  return res.data
}

const handleRemove: UploadProps['onRemove'] = (uploadFile: any) => {
  if (uploadFile.response) {
    const index = urlList.value.indexOf(uploadFile.response.data.fileUrl)
    if (index > -1) {
      urlList.value.splice(index, 1)
    }
  }
}
const handleSuccess: UploadProps['onSuccess'] = (res) => {
  // console.log('成功了')
  if (res.code === '0') {
    urlList.value.push(res.data.fileUrl)
  }
}
const handleChange: UploadProps['onChange'] = () => {
  emit('urls', urlList.value)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
  dialogFileType.value = uploadFile.raw?.type!
  console.log(uploadFile)
}
</script>
