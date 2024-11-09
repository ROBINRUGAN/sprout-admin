<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import * as echarts from 'echarts'
import { getAdClickApi, getAdListApi } from '@/api/api'
import { ElNotification } from 'element-plus'

const adContainer = ref(null)
let myChart = null

const state = reactive({
  selectedAdType: '',
  adTypes: [] // 将广告类型初始化为空数组
})

// 图表配置
const option = reactive({
  backgroundColor: 'rgba(224, 247, 255,1)',
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
      result += '<p>' + params[0].seriesName + '</p>'
      result += '<p>' + params[0].value + '</p>'
      result += '</div>'
      return result
    }
  },
  xAxis: {
    type: 'category',
    data: [],
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

// 页面挂载时初始化图表并获取广告类型列表
onMounted(() => {
  if (adContainer.value) {
    myChart = echarts.init(adContainer.value)
    myChart.setOption(option)
  }

  // 调用获取广告类型列表接口
  getAdListApi().then((res) => {
    if (res.data.code === '0') {
      state.adTypes = res.data.data.map((item) => ({
        value: item.id,
        label: item.wordsContent
      }))
      // 设置默认选中的广告类型为第一个
      if (state.adTypes.length > 0) {
        state.selectedAdType = state.adTypes[0].value
      }
    } else {
      ElNotification.error(res.data.message || '获取广告类型失败！')
    }
  })
})

// 监听选中的广告类型变化，获取对应广告的点击次数数据并更新图表
watch(
  () => state.selectedAdType,
  (newType) => {
    if (newType) {
      // 调用获取广告点击次数接口
      getAdClickApi(newType).then((res) => {
        if (res.data.code === '0') {
          // 更新图表数据
          const dates = res.data.data.map((item) => item.date)
          const clickCounts = res.data.data.map((item) => item.clickCount)

          option.xAxis.data = dates
          option.series[0].data = clickCounts
          myChart.setOption(option, true)
        } else {
          ElNotification.error(res.data.message || '获取广告点击数据失败！')
        }
      })
    }
  }
)

window.addEventListener('resize', () => {
  if (myChart) {
    myChart.resize()
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
