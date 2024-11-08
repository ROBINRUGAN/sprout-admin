
<template>
  <div ref="chartContainer" style="width: 100%; height: 300px"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { getDailyActiveApi } from '@/api/api'

const chartContainer = ref(null)
let myChart = null

// 图表配置
const option = {
  backgroundColor: 'rgba(222,244,241,1)', // 设置图表的背景颜色为淡蓝色（AliceBlue）
  grid: {
    left: '5%', // 距离容器左侧的距离
    right: '5%', // 距离容器右侧的距离
    top: '5%', // 距离容器顶部的距离
    bottom: '5%', // 距离容器底部的距离
    containLabel: true // 此选项确保 "label" 也包含在图表区域内，避免被裁剪
  },
  tooltip: {
    trigger: 'axis',
    // 背景颜色，默认为透明度为0.7的黑色
    backgroundColor: 'rgba(236,245,253,0.7)',
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
    position: function (point, params, dom, rect, size) {
      // point 是鼠标的位置，格式如 [x, y]
      var x = point[0] * 1.01
      var y = point[1] * 1.01
      // 计算 tooltip 的最佳位置
      var boxWidth = size.contentSize[0]
      var boxHeight = size.contentSize[1]
      var graphWidth = size.viewSize[0]

      // 防止 tooltip 溢出图表右边界
      x = x < graphWidth - boxWidth ? x : x - boxWidth
      // 防止 tooltip 溢出图表上边界
      y = y < boxHeight ? y : y - boxHeight

      return [x, y]
    },
    // 自定义提示框内容
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
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      name: '总日活量',
      type: 'line',
      smooth: true, // 添加这个属性来使线条平滑
      symbol: 'circle', // 默认不显示数据点
      color: 'transparent',
      symbolSize: 12, // 数据点大小
      emphasis: {
        focus: 'series',
        scale: true,
        itemStyle: {
          color: 'white', // 鼠标悬停时数据点的颜色为蓝色
          borderColor: 'rgba(64,128,255,1)', // 鼠标悬停时数据点边框的颜色
          borderWidth: 3, // 鼠标悬停时数据点边框的宽度
          shadowBlur: 1, // 鼠标悬停时数据点的阴影模糊大小
          shadowColor: 'rgba(0,0,255,0.5)' // 鼠标悬停时数据点的阴影颜色
        }
      },
      lineStyle: {
        width: 4, // 设置线条的宽度
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0, // 从左到右的渐变
          [
            { offset: 0, color: 'rgb(5, 236, 255)' }, // 天蓝色
            { offset: 1, color: 'rgb(138, 43, 236)' } // 紫色
          ]
        )
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(165, 206, 255, 0.5)' }, // 顶部颜色（淡蓝色，透明度50%）
          { offset: 1, color: 'rgba(255, 255, 255, 0)' } // 底部颜色（淡蓝色，透明度0%）
        ])
      },
      data:  []
    }
  ]
}
window.addEventListener('resize', function () {
    myChart.resize();
});

const xAxisData = ref([])
const seriesData = ref([])
const getDailyActive = () => {
  getDailyActiveApi().then((res) => {
    if (res.data.code === '0') {
      // 更新图表数据
      const data = res.data.data || []
      xAxisData.value = data.map(item => item.dateTime)
      seriesData.value = data.map(item => parseInt(item.cnt, 10))

      // 更新 option
      option.xAxis.data = xAxisData.value
      option.series[0].data = seriesData.value

      // 使用 myChart 手动更新图表
      if (myChart) {
        myChart.setOption(option)
      }

    } else {
      console.error(res.data.message)
    }
  }).catch(error => {
    console.error('接口请求错误:', error)
  })
}



onMounted(async () => {
  // 等待 getDailyActive 完成
  await getDailyActive()
  // 现在 getDailyActive 已经完成，可以继续执行后面的代码
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(option)
  }
})

</script>
