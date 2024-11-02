<template>
  <el-container class="app-header">
    <el-header>
      <div class="header-logo">
        <img src="../assets/login/logo.png" alt="Logo" />
        <span style="font-size: 20px; font-family: AlibabaPuHui-medium">新苗同学</span>
      </div>

      <div class="header-controls">
        <!-- <el-input placeholder="搜索..." prefix-icon="search" v-model="searchInfo" /> -->
        <!-- <el-button
          icon="switch"
          style="font-size: 15px; padding: 14px; border-radius: 20px; height: 40px; width: 40px"
        />
        <el-button
          icon="moon"
          style="font-size: 15px; padding: 14px; border-radius: 20px; height: 40px; width: 40px"
        /> -->
        <el-dropdown style="border: none">
          <el-avatar
            :src="avatarUrl"
            fit="fill"
            :size="50"
            style="background-color: transparent; margin-left: 20px; border: none"
          ></el-avatar>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>

              <el-dropdown-item @click="authStore.Logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </el-container>
</template>

<script lang="ts" setup>
import {
  ElInput,
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar
} from 'element-plus'
import { ref } from 'vue'
import logo from '@/assets/login/logo.png'
import { useAuthStore } from '@/stores/authStore'
const searchInfo = ref('')
const avatarUrl = ref(logo)
const authStore = useAuthStore()
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

.header-controls {
  display: flex;
  align-items: center;
}

.header-controls .el-input {
  margin-right: 10px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

/* Adjust other styles as needed */
</style>
