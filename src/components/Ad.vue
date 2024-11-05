<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import * as echarts from 'echarts'

const adContainer = ref(null)
let myChart = null

const state = reactive({
  selectedAdType: '',
  adTypes: [
    { value: 'open', label: '开屏页' },
    { value: 'home1', label: '风景图' },
    { value: 'home2', label: '欢迎新同学' }
  ],
  dataMap: {
    open: [131, 202, 400, 329, 541, 122, 188],
    home1: [300, 450, 520, 410, 600, 200, 330],
    home2: [50, 30, 200, 300, 450, 100, 120]
  }
})
</script>

<template>
  <div class="adData">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      "
    >
      <div style="display: flex; justify-content: space-between; width: 125px; align-items: center">
        <h1>广告统计</h1>
        <p style="font-size: 12px">(近七日)</p>
      </div>

      <el-select v-model="state.selectedAdType" placeholder="选择广告类型" style="width: 200px">
        <el-option
          v-for="item in state.adTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div ref="adContainer" style="width: 100%; height: 300px"></div>
  </div>
</template>

<style scoped>
.adData {
  height: 400px;
  background-color: rgb(224, 247, 255);

  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
