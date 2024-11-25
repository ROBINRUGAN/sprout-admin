<template>
  <div ref="chartContainer" style="width: 99%; height: 340px"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import { getStudentRegisterApi } from '@/api/api'

const unregisteredCount = ref(0)
const registeredCount = ref(0)

const chartContainer = ref(null)
let myChart = null

// Chart configuration
const option = {
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    textStyle: {
      color: '#000'
    },
    trigger: 'item'
  },
  legend: {
    left: 'center',
    bottom: 0,
    data: ['已注册', '未注册']
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '学生注册情况',
      type: 'pie',
      radius: ['40%', '70%'],
      roseType: 'area',

      data: [
        { value: 0, name: '已注册' },
        { value: 0, name: '未注册' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        show: false // 隐藏标签
      }
    }
  ]
}

// Resize handler to adjust chart size
function resizeChart() {
  if (myChart) {
    myChart.resize()
  }
}
window.addEventListener('resize', function () {
  myChart.resize()
})

onMounted(async () => {
  await nextTick() // 等待 DOM 更新完成

  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(option)
    // 获取学生注册数据并更新图表
    getStudentRegisterApi().then((res) => {
      registeredCount.value = res.data.data.registeredCount
      unregisteredCount.value = res.data.data.unregisteredCount

      // 更新图表的数据
      updateChart()
    })
  }
})

// 监听已注册和未注册的数量变化并更新图表
function updateChart() {
  if (myChart) {
    myChart.setOption({
      series: [
        {
          data: [
            { value: registeredCount.value, name: '已注册' },
            { value: unregisteredCount.value, name: '未注册' }
          ]
        }
      ]
    })
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  if (myChart) {
    myChart.dispose()
  }
})
</script>
