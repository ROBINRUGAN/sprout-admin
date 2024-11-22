<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification, ElUpload } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { AddStuApi } from '@/api/api'
const fileList = ref([]) // 存储用户选择的文件

const loading = ref(false)

// 处理文件变更的事件
const handleFileChange = (file, files) => {
  const allowedFormats = ['.xlsx', '.xls']
  const maxSize = 5 * 1024 * 1024 // 最大文件限制

  if (!allowedFormats.some(format => file.name.endsWith(format))) {
    ElNotification.error('文件格式不正确，仅支持 .xlsx 或 .xls 文件')
    resetFileList()
    return false
  }
  
  fileList.value = files // 更新文件列表
  return true
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
  try {
    // 调用 API 上传文件
    const res = await AddStuApi(formData)
    console.log(res)

    // 根据响应结果显示通知
    if (res.data.code === '0') {
      ElNotification.success('导入成功')
      resetFileList()
    } else {
      ElNotification.error(`导入失败：${res.data.message || '未知错误'}`)
      resetFileList()
    }
  } catch (error) {
    // 捕获异常并显示通知
    console.error('上传失败:', error)
    ElNotification.error(`上传失败：${error.response?.data?.message || error.message || '服务器异常'}`)
  } finally {
    // 确保结束加载状态
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}

// 清空文件列表
const resetFileList = () => {
  fileList.value = []
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
