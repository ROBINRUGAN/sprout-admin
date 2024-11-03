<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElUpload } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const fileList = ref([]) // 存储用户选择的文件
</script>

<template>
  <div class="wrapper">
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
      :accept=".xlsx, .xls"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template v-slot:tip>
        <div class="el-upload__tip">只能上传Excel文件</div>
      </template>
    </el-upload>
  </div>
</template>



<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
