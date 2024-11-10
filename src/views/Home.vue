<script lang="ts" setup>
import Banner from '@/components/Banner.vue'
import Aside from '@/components/Sidebar.vue'
</script>

<template>
  <el-container>
    <el-header class="header">
      <Banner />
    </el-header>
    <el-container>
      <el-aside class="aside">
        <Aside></Aside>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.header {
  padding: 0;
  background-color: #fff;
  box-shadow: 0px 6px 10px 0px rgba(78, 89, 105, 0.05);
  z-index: 200;
}
.aside {
  // position: absolute;
  width: fit-content;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(78, 89, 105, 0.2);
  z-index: 100;
  min-height: calc(100vh - 64px);
}
.main {
  background-color: rgba(255, 255, 255, 1);
}
</style>
