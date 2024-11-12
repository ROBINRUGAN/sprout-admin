<template>
  <div ref="chartContainer" style="width: 250px; height: 250px"></div>
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
    // position: function (point, params, dom, rect, size) {
    //   var x = point[0] * 1.01
    //   var y = point[1] * 1.01
    //   var boxWidth = size.contentSize[0]
    //   var boxHeight = size.contentSize[1]
    //   var graphWidth = size.viewSize[0]

    //   x = x < graphWidth + boxWidth ? x : x + boxWidth
    //   x = x < graphWidth - boxWidth ? x : x - boxWidth
    //   y = y < boxHeight ? y : y - boxHeight
    //   return [x, y]
    // }
  },
  legend: {
    left: 'center',
    bottom: 0,
    data: ['已注册', '未注册']
  },
  toolbox: {
    show: true,
    feature: {
      // mark: { show: true },
      // dataView: { show: true, readOnly: false },
      // restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '学生注册情况',
      type: 'pie',
      // radius: ['10%', '50%'],
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

    // // 延迟触发 resize
    // setTimeout(() => {
    //   myChart.resize()
    // }, 100)

    // requestAnimationFrame(() => {
    //   myChart.resize()
    // })

    // window.addEventListener('resize', resizeChart)
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
