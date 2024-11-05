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

// 图表配置
const option = reactive({
  backgroundColor: 'rgba(224, 247, 255,1)', // 设置图表的背景颜色为淡蓝色
  grid: { left: '5%', right: '5%', top: '5%', bottom: '5%', containLabel: true },
  tooltip: {
    trigger: 'axis',
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    textStyle: { color: '#000' },
    backgroundColor: 'rgba(236,245,253,0.7)',
    formatter: function (params) {
      let result = '<h1>' + params[0].name + '</h1>'
      result +=
        '<div style="background: #fff; padding: 10px; border-radius: 5px; margin-top: 5px; width:200px; display: flex; justify-content: space-between">'
      result += '<p>'
      result += params[0].seriesName
      result += '</p>'
      result += '<p>'
      result += params[0].value + '<br/>'
      result += '</p>'
      result += '</div>'
      return result
    }
  },
  xAxis: {
    type: 'category',
    data: [
      '2024-03-09',
      '2024-03-10',
      '2024-03-11',
      '2024-03-12',
      '2024-03-13',
      '2024-03-14',
      '2024-03-15'
    ],
    boundaryGap: true
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '点击次数',
      type: 'bar',
      barWidth: '20%',
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(5, 236, 255)' },
          { offset: 1, color: 'rgb(138, 43, 236)' }
        ])
      }
    }
  ]
})

window.addEventListener('resize', function () {
  myChart.resize()
})

onMounted(() => {
  if (adContainer.value) {
    myChart = echarts.init(adContainer.value)
    myChart.setOption(option)
  }
  state.selectedAdType = 'open'
})

watch(
  () => state.selectedAdType,
  (newType) => {
    if (newType) {
      const data = state.dataMap[newType]
      option.series[0].data = data
      myChart.setOption(option, true)
    }
  }
)
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
