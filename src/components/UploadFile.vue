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
</template>
