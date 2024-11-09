<script lang="ts" setup>
import { ref } from 'vue'
import { ElDivider, ElMessage, ElNotification } from 'element-plus'
import { getUserInfoApi } from '@/api/api'

const taskData = ref([
  { name: '未雨绸缪', id: '327389', status: '已完成', parentTask: '入学准备' },
  { name: '寻找宿舍', id: '327389', status: '已完成', parentTask: '入学准备' },
  { name: '新生注册', id: '327389', status: '已完成', parentTask: '入学准备' },
  { name: '领取新生物品', id: '327389', status: '已完成', parentTask: '新生指引' },
  { name: '学分认定规则检测', id: '327389', status: '已完成', parentTask: '学业规划' }
])

const studentAccount = ref('')

const mewch = ref(false)

const showMewch = async () => {
  await getUserInfoApi(studentAccount.value).then((res) => {
    console.log(res)
    if (res.data.code !== '0') {
      ElMessage.error(res.data.message || '未查询到结果！')
      return
    } else {
      const data = res.data.data

      // 对身份证号进行打码处理，保留前4位和后4位
      if (data.idCard) {
        data.idCard = data.idCard.replace(/^(\d{4})\d{10}(\d{4})$/, '$1**********$2')
      }

      // 对手机号进行打码处理，保留前3位和后4位
      if (data.phone) {
        data.phone = data.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
      }

      // 经纬度处理，保留到小数点后两位，并添加N/S和E/W标识
      if (data.registerLatitude) {
        let lat = parseFloat(data.registerLatitude)
        data.registerLatitude = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}`
      }

      if (data.registerLongitude) {
        const lon = parseFloat(data.registerLongitude)
        data.registerLongitude = `${Math.abs(lon).toFixed(2)}°${lon >= 0 ? 'E' : 'W'}`
      }

      userData.value = data
      mewch.value = true
      ElNotification.success('查询成功')
    }
  })
}

const userData = ref({
  id: '1842829088522289153',
  username: 'FZU5037753585',
  realName: '翁鹏',
  studentId: '222200331',
  grade: 2022,
  major: '软件工程',
  faculty: '计算机与大数据学院',
  region: '福建省莆田市',
  gender: '男',
  avatar:
    'https://ts1.cn.mm.bing.net/th?id=OIP-C.k6ekHYPyBdw5UcL1St3MjgAAAA&w=183&h=183&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
  idType: '身份证',
  idCard: '350302200310281633',
  phone: '18005471144',
  points: 1,
  isRegister: 1,
  registerLongitude: 119.31511219999999,
  registerLatitude: 26.07406702,
  drops: 98,
  shovel: 2,
  tares: 0,
  smallSapling: 3,
  mediumSapling: 0,
  bigSapling: 0
})
</script>

<template>
  <div class="find">
    <h1 class="title">查询用户</h1>
    <div class="wrapper">
      <label for="student-id">学号</label>
      <input
        id="student-id"
        v-model="studentAccount"
        type="number"
        placeholder="请输入"
        @keydown.enter="showMewch"
        class="inputField"
      />
      <button class="search" @click="showMewch">查询</button>
    </div>

    <el-empty description="description" v-if="!mewch" />
    <div v-if="mewch" class="info-container">
      <!-- 用户信息卡片，双列布局在宽度 > 1024px，单列布局在宽度 <= 1024px -->
      <div class="infos card">
        <div class="user-header">
          <img :src="userData.avatar" alt="头像" class="avatar" />
          <div class="user-basic-info">
            <p><strong>真实姓名：</strong>{{ userData.realName }}</p>
            <p><strong>用户名：</strong>{{ userData.username }}</p>
          </div>
        </div>
        <div class="user-details">
          <p><strong>ID：</strong>{{ userData.id }}</p>
          <p><strong>学号：</strong>{{ userData.studentId }}</p>
          <p><strong>年级：</strong>{{ userData.grade }}</p>
          <p><strong>专业：</strong>{{ userData.major }}</p>
          <p><strong>院系：</strong>{{ userData.faculty }}</p>
          <p><strong>地区：</strong>{{ userData.region }}</p>
          <p><strong>性别：</strong>{{ userData.gender }}</p>
          <p>
            <strong>{{ userData.idType }}号：</strong>{{ userData.idCard }}
          </p>
          <p><strong>手机号：</strong>{{ userData.phone }}</p>
          <p><strong>积分：</strong>{{ userData.points }}</p>
          <p><strong>注册状态：</strong>{{ userData.isRegister === 1 ? '已注册' : '未注册' }}</p>
          <p>
            <strong>注册坐标：</strong>经度 {{ userData.registerLongitude }}, 纬度
            {{ userData.registerLatitude }}
          </p>
        </div>
        <ElDivider />
        <h2 class="section-title">物品详情</h2>
        <div class="items-details">
          <p><strong>水滴：</strong>{{ userData.drops }}</p>
          <p><strong>铲子：</strong>{{ userData.shovel }}</p>
          <p><strong>杂草：</strong>{{ userData.tares }}</p>
          <p><strong>小树苗：</strong>{{ userData.smallSapling }}</p>
          <p><strong>中树苗：</strong>{{ userData.mediumSapling }}</p>
          <p><strong>大树苗：</strong>{{ userData.bigSapling }}</p>
        </div>
      </div>

      <!-- 任务详情卡片，单列布局 -->
      <div class="details card">
        <h1 class="section-title">任务详情</h1>
        <el-table :data="taskData" stripe size="small" class="large-table">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <el-table-column prop="status" label="完成状态"></el-table-column>
          <el-table-column prop="parentTask" label="父任务名称"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.find {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  font-size: 14px;
  color: #666;
  margin-right: 5px;
}

.inputField {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search {
  padding: 8px 16px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search:hover {
  background-color: #66b1ff;
}

.search:active {
  background-color: #3d8ce6;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 100%;
  color: #000;
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.user-basic-info p {
  margin: 0;
}

.section-title {
  font-size: 1.2em;
  color: #000;

  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
}

.user-details,
.items-details {
  display: flex;
  flex-wrap: wrap;
}

.user-details p,
.items-details p {
  font-size: 14px;
  color: #333;
  margin: 4px 0;
  flex: 1 1 45%;
}

/* 响应式布局：小于1024px宽度时，用户信息单列显示 */
@media (max-width: 1024px) {
  .user-details p,
  .items-details p {
    flex: 1 1 100%;
  }
}

.large-table {
  width: 100%;
  font-size: 12px;
}
</style>
