<template>
  <div class="dashboard">
    <!-- 日活数据 -->
    <div class="userData">
      <h1>👏 欢迎回来</h1>
      <div class="activity-summary">
        <img src="../assets/home/dashboard-logo.png" alt="" class="activity-icon" />
        <div class="activity-info">
          <p>总活动</p>
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
    <div class="tool">
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
    <div class="info">
      <InfoItem type="info"> 欢迎每一位新苗er～ </InfoItem>
      <InfoItem type="activity"> 活动“每日锻炼”开始啦 </InfoItem>
      <InfoItem type="activity"> 活动“校规检测”开始啦 </InfoItem>
      <InfoItem type="activity"> 活动“了解校史”开始啦 </InfoItem>
      <InfoItem type="msg"> 你有新的审核：寻找宿舍 </InfoItem>
      <InfoItem type="info"> 快去发布广告吧～ </InfoItem>
    </div>

    <!-- Bottompart模块 -->
    <div class="bottompart">
      <RouterView />
    </div>

    <!-- 学生注册统计 -->
    <div class="image">
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
import { ElIcon } from 'element-plus'
import { useToolSelectStore } from '@/stores/toolSelectStore'
import { getTaskCountApi } from '@/api/api'
const count = ref(0)

const toolSelect = useToolSelectStore()

function isFocused(index: number) {
  return toolSelect.focused === index
}

function setFocus(index: number) {
  toolSelect.focused = index
}

// 页面加载完成后触发 resize 事件来确保布局正常渲染
onMounted(async () => {
  await nextTick()
  // // 加入短暂延迟后再触发 resize，确保布局稳定
  // setTimeout(() => {
  //   window.dispatchEvent(new Event('resize'))
  // }, 50)

  await getTaskCountApi().then((res) => {
    count.value = res.data.data
  })
})
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.userData {
  grid-column: 1;
  grid-row: 1 / span 2;
  background-color: rgba(222, 244, 241, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

.info {
  grid-column: 2;
  grid-row: 2;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  overflow: auto;
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

/* Mobile layout: Each module takes full width */
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
    grid-column: unset;
    grid-row: unset;
  }
}
</style>
