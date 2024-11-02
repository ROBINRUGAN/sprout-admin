<template>
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
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(true)

const activeIndex = computed(() => {
  return route.path.startsWith('/home/dashboard') ? '/home/dashboard' : route.path
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  transition: all ease;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
