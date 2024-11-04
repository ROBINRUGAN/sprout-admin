<template>
  <div class="whereWrapper" ref="whereContainer" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaMapData from '@/assets/china.json' // 请确保正确引入中国地图数据的路径

const whereContainer = ref(null)
let myChart = null
</script>

<style scoped>
.whereWrapper {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
