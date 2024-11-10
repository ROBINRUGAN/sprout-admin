<template>
  <!-- <button @click="isCollapsed = !isCollapsed">nihao</button> -->
  <el-menu
    router
    :default-active="activeIndex"
    :collapse="isCollapsed"
    collapse-transition
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="/home/dashboard">
      <el-icon><Odometer /></el-icon>
      <template #title>工作台</template>
    </el-menu-item>

    <el-menu-item index="/home/addStuds">
      <el-icon><BottomRight /></el-icon>
      <template #title>学生导入</template>
    </el-menu-item>

    <el-menu-item index="/home/add">
      <el-icon><DocumentAdd /></el-icon>
      <template #title>发布任务</template>
    </el-menu-item>

    <el-menu-item index="/home/checkActivity">
      <el-icon><CircleCheck /></el-icon>
      <template #title>活动审核</template>
    </el-menu-item>

    <el-menu-item index="/home/past">
      <el-icon><Management /></el-icon>
      <template #title>往期活动</template>
    </el-menu-item>

    <el-menu-item index="/home/createAd">
      <el-icon><ChatRound /></el-icon>
      <template #title>发布广告</template>
    </el-menu-item>

    <el-menu-item index="/home/pastAd">
      <el-icon><setting /></el-icon>
      <template #title>管理广告</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(false)

const activeIndex = computed(() => {
  return route.path.startsWith('/home/dashboard') ? '/home/dashboard' : route.path
})

// 定义一个函数，用于检查屏幕尺寸并设置折叠状态
const checkScreenSize = () => {
  isCollapsed.value = window.innerWidth < 768
}

checkScreenSize()

// 挂载和卸载事件监听器
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
