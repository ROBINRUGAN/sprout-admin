<template>
  <div class="whereWrapper" ref="whereContainer" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaMapData from '@/assets/china.json' // 请确保正确引入中国地图数据的路径

const whereContainer = ref(null)
let myChart = null

echarts.registerMap('china', chinaMapData)

const option = {
  title: {
    text: '新生注册位置统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(236,245,253,0.7)',
    formatter: function (params) {
      let result = '<h1>' + params.name + '</h1>'
      result +=
        '<div style="background: #fff; padding: 10px; border-radius: 5px; margin-top: 5px; width:200px; display: flex; justify-content: space-between">'
      result += '<p>'
      result += params.seriesName
      result += '</p>'
      result += '<p>'
      result += params.value + '<br/>'
      result += '</p>'
      result += '</div>'
      return result
    }
  },
  visualMap: {
    min: 50,
    max: 270,
    left: 'left',
    top: 'top',
    text: ['高', '低'],
    realtime: true,
    calculable: true,
    inRange: {
      color: ['rgba(222,244,241,1)', 'rgba(0, 128, 102, 1)'] // 色阶从浅绿到深绿
    }
  },
  series: [
    {
      name: '人数',
      type: 'map',
      mapType: 'china',
      roam: false, // 允许缩放和平移
      layoutCenter: ['50%', '70%'], // 地图位置
      layoutSize: '120%', // 地图大小
      label: {
        show: false,
        color: 'rgba(0,0,0,0.6)'
      },
      data: [
        { name: '北京市', value: 217 },
        { name: '天津市', value: 195 },
        { name: '上海市', value: 240 },
        { name: '重庆市', value: 182 },
        // ...其他省份数据
      ]
    }
  ]
}
</script>

<style scoped>
.whereWrapper {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
