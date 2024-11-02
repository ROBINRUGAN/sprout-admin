<template>
  <h1 style="justify-content: center; display: flex; margin-top: 20px">学生注册统计</h1>
  <div ref="chartContainer" style="width: 100%; height: 340px"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

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
    trigger: 'item',
    position: function (point, params, dom, rect, size) {
      var x = point[0] * 1.01
      var y = point[1] * 1.01
      var boxWidth = size.contentSize[0]
      var boxHeight = size.contentSize[1]
      var graphWidth = size.viewSize[0]

      x = x < graphWidth + boxWidth ? x : x + boxWidth
      x = x < graphWidth - boxWidth ? x : x - boxWidth
      y = y < boxHeight ? y : y - boxHeight
      return [x, y]
    }
  },
  legend: {
    left: 'center',
    bottom: 10,
    data: ['已注册', '未注册']
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
      name: '学生注册情况',
      type: 'pie',
      radius: '50%',
      center: ['50%', '50%'],
      data: [
        { value: 3335, name: '已注册' },
        { value: 1235, name: '未注册' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
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

    // 使用 setTimeout 延迟触发 resize
    setTimeout(() => {
      myChart.resize()
    }, 100) // 延迟100毫秒，确保布局完成

    // 使用 requestAnimationFrame 在渲染完成后再调整图表
    requestAnimationFrame(() => {
      myChart.resize()
    })

    window.addEventListener('resize', resizeChart)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  if (myChart) {
    myChart.dispose()
  }
})
</script>
