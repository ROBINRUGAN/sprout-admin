<template>
  <el-upload
    v-model:file-list="fileList"
    :http-request="uploadImage"
    list-type="picture-card"
    :before-upload="beforeUpload"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :limit="2"
    :auto-upload="true"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import { GetURLApi } from '@/api/api'
const fileList = ref<UploadUserFile[]>([])
const urlList = ref<string[]>([])
const emit = defineEmits(['urls'])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const beforeUpload = (file: { type: string; size: number }) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  const isAllowedType = allowedTypes.includes(file.type)
  if (!isAllowedType) {
    ElNotification.error('只允许上传jpg, png, jpeg, gif 格式的文件')
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

const handleRemove: UploadProps['onRemove'] = (uploadFile: any, uploadFiles) => {
  if (uploadFile.response) {
    const index = urlList.value.indexOf(uploadFile.response.data.fileUrl)
    if (index > -1) {
      urlList.value.splice(index, 1)
    }
  }
}
const handleSuccess: UploadProps['onSuccess'] = (res, file, fileList) => {
  // console.log('成功了')
  if (res.code === '0') {
    urlList.value.push(res.data.fileUrl)
  }
}
const handleChange: UploadProps['onChange'] = (uploadFiles) => {
  emit('urls', urlList.value)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
