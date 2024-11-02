<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const loginData = ref({
  username: '',
  password: ''
})
</script>

<template>
  <div class="background">
    <el-row class="wrapper">
      <el-col :span="12" class="left">
        <div class="info">
          <p style="font-size: 32px">新苗同学</p>
          <p>你的大学生活助手</p>
          <p>大学原来如此有趣</p>
        </div>
        <img class="pic" src="../assets/login/pic.png" alt="mewch" />
      </el-col>
      <el-col :span="12" class="right">
        <img class="logo" src="../assets/login/logo.png" alt="" />
        <div class="wrapper2">
          <p style="font-size: 28px; margin: 20px 0 10px 20px">新苗同学</p>
          <div class="form">
            <input
              type="text"
              name="username"
              id="username"
              v-model="loginData.username"
              placeholder="账号"
            />
            <input
              type="password"
              name="password"
              id="password"
              v-model="loginData.password"
              placeholder="密码"
            />
            <button @click="authStore.Login(loginData)">登录</button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 80%;
}
input {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 5px;
  padding-left: 10px;
  font-size: 16px;
}
button {
  width: 100%;
  height: 40px;
  background: #4f8980;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #70b7ac;
}
</style>
