<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification, ElUpload } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { AddStuApi } from '@/api/api'
const fileList = ref([]) // 存储用户选择的文件

const loading = ref(false)

// 处理文件变更的事件
const handleFileChange = (file, files) => {
  fileList.value = files // 更新文件列表
}

// 确认导入的处理函数
const submitUpload = async () => {
  loading.value = true
  if (fileList.value.length === 0) {
    setTimeout(() => {
      loading.value = false
    }, 1000)
    ElNotification.error('请先选择一个文件!')
    return
  }

  const formData = new FormData()
  formData.append('file', fileList.value[0].raw) // 只处理第一个文件
  console.log('上传文件:', fileList.value[0].raw)
  // 这里是你的上传逻辑，替换成你的API调用
  const res = await AddStuApi(formData)
  console.log(res)
  if (res.data.code === '0') {
    ElNotification.success('导入成功')
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      学生Excel批量录入
    </h1>
    <!-- 下载按钮 -->
    <el-button type="primary" style="margin-left: 15px; margin-bottom: 15px">
      <a
        href="https://engroc.oss-cn-fuzhou.aliyuncs.com/new-sprout/f852a587-389e-46d4-8422-b708c3693e0f.xlsx"
        style="color: white; text-decoration: none"
        >点击下载样例Excel文档</a
      >
    </el-button>
    <!-- 文件拖拽上传区 -->
    <el-upload
      class="upload-demo"
      drag
      :file-list="fileList"
      :auto-upload="false"
      :limit="1"
      :on-change="handleFileChange"
      accept=".xlsx, .xls"
    >
      <el-icon class="el-icon--upload">
        <img src="https://mewww.w2fzu.com//upmew/cat.gif" alt="" width="100" />
      </el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template v-slot:tip>
        <div class="el-upload__tip">只能上传Excel文件</div>
      </template>
    </el-upload>
    <!-- 确认导入按钮 -->
    <el-button type="success" style="margin-top: 15px" @click="submitUpload">确定导入</el-button>
  </div>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: calc(100vh - 100px);
}
.upload-demo {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  padding: 15px 20px;
}
</style>
