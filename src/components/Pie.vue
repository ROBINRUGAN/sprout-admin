<template>
  <div ref="chartContainer" style="width: 100%; height: 340px"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { getFacultyCountApi } from '@/api/api'

const chartContainer = ref(null)
let myChart = null

// 图表配置
const option = {
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    // 边框颜色
    borderColor: 'transparent',
    // 边框圆角
    borderRadius: 10,
    // 内边距
    padding: 10,
    // 文字样式
    textStyle: {
      color: '#000'
    },
    trigger: 'item'
  },
  legend: {
    show: true,
    left: 'center',
    top: 'bottom',
    data: [
      // '经济与管理学院',
      // '计算机与软件学院',
      // '化学学院',
      // '材料学院',
      // '土木学院',
      // '物理与信息工程学院',
      // '电气工程及其自动化学院',
      // '外国语学院'
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '学院人数统计',
      type: 'pie',
      radius: ['10%', '70%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      label: {
        show: false // 这里设置不显示标签
      },
      labelLine: {
        show: false // 这里设置不显示标签的引导线
      },
      data: [
        // { value: 24, name: '经济与管理学院' },
        // { value: 20, name: '计算机与软件学院' },
        // { value: 16, name: '化学学院' },
        // { value: 13, name: '材料学院' },
        // { value: 15, name: '土木学院' },
        // { value: 10, name: '物理与信息工程学院' },
        // { value: 17, name: '电气工程及其自动化学院' },
        // { value: 20, name: '外国语学院' }
      ]
    }
  ]
}

window.addEventListener('resize', function () {
  myChart.resize()
})

const getFacultyCount = () => {
  
  getFacultyCountApi().then((res) => {
      
      if (res.data.code === '0') {
       
        // 提取数据
        const data = res.data.data || []
        const legendData = data.map(item => item.facultyName)
        const seriesData = data.map(item => ({ value: item.count, name: item.facultyName }))

        // 更新图表的 option
        option.legend.data = legendData
        option.series[0].data = seriesData

        //更新图表
        if (myChart) {
          myChart.setOption(option)
        }
      } else {
        console.error(res.message || '数据获取失败')
      }
    })
    .catch((error) => {
      console.error('接口请求错误:', error)
    })
}

onMounted(async () => {
   
  await getFacultyCount()
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(option)
  }
})
</script>
