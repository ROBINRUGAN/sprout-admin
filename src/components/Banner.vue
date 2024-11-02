<template>
  <el-container class="app-header">
    <el-header>
      <div class="header-logo">
        <img src="../assets/login/logo.png" alt="Logo" />
        <span style="font-size: 20px; font-family: AlibabaPuHui-medium">新苗同学</span>
      </div>
    </el-header>
  </el-container>
</template>

<script lang="ts" setup>
import { ElContainer, ElHeader } from 'element-plus'
</script>

<style scoped>
.app-header .el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 6px 10px 0px rgba(78, 89, 105, 0.06);
  width: 100%;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
