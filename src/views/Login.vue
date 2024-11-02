<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="background">
    <el-row class="wrapper">
      <el-col :span="12" class="left">
        <!-- 左侧内容待添加 -->
      </el-col>
      <el-col :span="12" class="right">
        <!-- 右侧内容待添加 -->
      </el-col>
    </el-row>
  </div>
</template>
