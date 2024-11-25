<template>
  <div class="dashboard" v-loading="loading">
    <!-- 日活数据 -->
    <div class="userData animate-shake" :style="{ animationDelay: `${getRandomDelay()}s` }">
      <h1>👏 欢迎回来</h1>
      <div class="activity-summary">
        <img src="../assets/home/dashboard-logo.png" alt="" class="activity-icon" />
        <div class="activity-info">
          <p>总任务</p>
          <div class="activity-count">
            <p class="count">{{ count }}</p>
            <p>个</p>
          </div>
        </div>
      </div>
      <div class="activity-header">
        <h1>日活数据</h1>
        <p class="subtitle">(近七日)</p>
      </div>
      <Stats />
    </div>

    <!-- 统计管理 -->
    <div class="tool animate-shake" :style="{ animationDelay: `${getRandomDelay()}s` }">
      <h1>统计管理</h1>
      <div class="iconBtns">
        <div class="toolWrapper">
          <router-link to="/home/dashboard/main">
            <button
              class="iconWrapper"
              @click="setFocus(1)"
              :class="{ 'is-focused': isFocused(1) }"
            >
              <el-icon><MessageBox /></el-icon>
            </button>
          </router-link>
          <p>主要信息</p>
        </div>
        <div class="toolWrapper">
          <router-link to="/home/dashboard/find">
            <button
              class="iconWrapper"
              @click="setFocus(2)"
              :class="{ 'is-focused': isFocused(2) }"
            >
              <el-icon><Histogram /></el-icon>
            </button>
          </router-link>
          <p>查询用户</p>
        </div>
        <div class="toolWrapper">
          <router-link to="/home/dashboard/where">
            <button
              class="iconWrapper"
              @click="setFocus(3)"
              :class="{ 'is-focused': isFocused(3) }"
            >
              <el-icon><DocumentCopy /></el-icon>
            </button>
          </router-link>
          <p>新生统计</p>
        </div>
        <div class="toolWrapper">
          <router-link to="/home/pastAd">
            <button
              class="iconWrapper"
              @click="setFocus(4)"
              :class="{ 'is-focused': isFocused(4) }"
            >
              <el-icon><Guide /></el-icon>
            </button>
          </router-link>
          <p>线上推广</p>
        </div>
        <div class="toolWrapper">
          <router-link to="/home/dashboard/ad">
            <button
              class="iconWrapper"
              @click="setFocus(5)"
              :class="{ 'is-focused': isFocused(5) }"
            >
              <el-icon><DataLine /></el-icon>
            </button>
          </router-link>
          <p>广告统计</p>
        </div>
      </div>
    </div>

    <!-- 信息模块 -->
    <div class="info animate-shake" :style="{ animationDelay: `${getRandomDelay()}s` }">
      <h1 style="margin-bottom: 10px">自动审核结果</h1>
      <InfoItem type="msg">
        <div style="display: flex; justify-content: center; align-items: center">
          <p>新苗管理员辛苦了～</p>
          &nbsp;&nbsp;
          <span style="font-size: 20px">🍔🍣🌮🍗🍦🥤🍩</span>
        </div>
      </InfoItem>

      <InfoItem v-for="(item, index) in announcements" :key="index" :type="item.type">
        <strong>{{ item.submitter }}</strong> 🫱 {{ item.name }}
      </InfoItem>
    </div>

    <!-- Bottompart模块 -->
    <div class="bottompart animate-shake" :style="{ animationDelay: `${getRandomDelay()}s` }">
      <RouterView />
    </div>

    <!-- 学生注册统计 -->
    <div class="image animate-shake" :style="{ animationDelay: `${getRandomDelay()}s` }">
      <h1 style="justify-content: center; display: flex">学生注册统计</h1>
      <RegisterPie style="margin: auto 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Stats from '@/components/Stats.vue'
import InfoItem from '@/components/InfoItem.vue'
import RegisterPie from '@/components/RegisterPie.vue'
import { ElIcon, ElNotification } from 'element-plus'
import { useToolSelectStore } from '@/stores/toolSelectStore'
import { getAnnouncementListApi, getTaskCountApi } from '@/api/api'
import { useRouter, useRoute } from 'vue-router'

const count = ref(0)
const toolSelect = useToolSelectStore()
const loading = ref(false)
const route = useRoute()
const router = useRouter()

// 根据路由更新选中状态
function updateFocusByRoute() {
  const path = route.path

  if (path.includes('/home/dashboard/main')) {
    setFocus(1)
  } else if (path.includes('/home/dashboard/find')) {
    setFocus(2)
  } else if (path.includes('/home/dashboard/where')) {
    setFocus(3)
  } else if (path.includes('/home/pastAd')) {
    setFocus(4)
  } else if (path.includes('/home/dashboard/ad')) {
    setFocus(5)
  }
}

// 监听页面变化
onMounted(() => {
  updateFocusByRoute() // 初始化时检查路径
  router.afterEach(updateFocusByRoute) // 每次路由变化时更新
})

function isFocused(index: number) {
  return toolSelect.focused === index
}

function setFocus(index: number) {
  toolSelect.focused = index
}

// 生成随机的动画延迟时间
function getRandomDelay() {
  return (Math.random() * 0.5).toFixed(2) // 0 到 0.5 秒之间的随机延迟
}

// 定义数据状态
const announcements = ref([])

// 格式化接口返回的数据并排序
const formatAnnouncements = (data) => {
  return data
    .map((item) => {
      if (item.type === 'audit') {
        const statusMap = {
          0: { type: 'unaudited', label: '待审' },
          1: { type: 'passed', label: '通过' },
          2: { type: 'rejected', label: '拒绝' }
        }
        const status = statusMap[item.auditsStatus] || {}
        return {
          type: status.type,
          submitter: item.submitterName,
          name: item.name,
          auditsStatus: item.auditsStatus // 添加状态字段用于排序
        }
      }
      return null // 过滤掉无效数据
    })
    .filter(Boolean) // 去掉 null 数据
    .sort((a: { type: string | number }, b: { type: string | number }) => {
      // 自定义排序逻辑：拒绝 > 待审 > 通过
      const priorityMap = { rejected: 0, unaudited: 1, passed: 2 }
      return priorityMap[a.type] - priorityMap[b.type]
    })
}

// 获取公告列表
const fetchAnnouncements = async () => {
  try {
    const response = await getAnnouncementListApi()
    if (response.data && response.data.success) {
      announcements.value = formatAnnouncements(response.data.data)
    } else {
      console.error('获取公告列表失败:', response.data.message)
    }
  } catch (error) {
    console.error('接口请求失败:', error)
  }
}

// 页面加载完成后获取数据
onMounted(async () => {
  loading.value = true
  await fetchAnnouncements()
  await getTaskCountApi().then((res) => {
    if (res.data.code !== '0') {
      ElNotification.error('获取任务数量失败')
      return
    } else {
      count.value = res.data.data
    }
    loading.value = false
  })
})
</script>

<style scoped>
/* 抖动动画 */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }
  20%,
  60% {
    transform: translateX(-10px) rotate(-2deg);
  }
  40%,
  80% {
    transform: translateX(10px) rotate(2deg);
  }
}

/* 小弹跳和压扁效果动画 */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-50px) scaleY(1); /* 向上弹跳并稍微压扁 */
  }
}

.animate-shake {
  animation:
    shake 1.5s ease-in-out,
    bounce 0.5s ease-in-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.animate-shake:hover {
  transform: scale(1.01);
  box-shadow:
    0 2px 12px 0 rgba(0, 196, 108, 0.5),
    0 2px 12px 0 rgba(0, 185, 255, 0.5);
}

.dashboard {
  /* overflow: auto; */
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  width: 100%;
  /* box-sizing: border-box; */
}

.userData {
  grid-column: 1;
  grid-row: 1 / span 2;
  background-color: rgba(222, 244, 241, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
}

.activity-summary {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.activity-info {
  display: flex;
  flex-direction: column;
}

.activity-count {
  display: flex;
  align-items: baseline;
}

.count {
  font-size: 24px;
  font-weight: bold;
  padding-top: 5px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 12px;
}

.tool {
  grid-column: 2;
  grid-row: 1;
  background-color: rgba(182, 232, 231, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* 信息模块 */
.info {
  grid-column: 2;
  grid-row: 2;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  overflow-y: auto;
  max-height: 350px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.bottompart {
  grid-column: 1;
  grid-row: 3;
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
}

.image {
  grid-column: 2;
  grid-row: 3;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.toolWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: max-content;
}

.iconWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  margin-bottom: 4px;
  height: 32px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: none;
  font-size: 20px;
  color: black;
}

.iconWrapper:hover {
  color: #409eff;
  cursor: pointer;
}

.is-focused {
  color: #409eff;
}

.iconBtns {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  text-align: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

@media (max-width: 1024px) {
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .userData,
  .tool,
  .info,
  .bottompart,
  .image {
    width: 100%;
  }
}
</style>
