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
        { name: '河北省', value: 160 },
        { name: '河南省', value: 180 },
        { name: '云南省', value: 150 },
        { name: '辽宁省', value: 210 },
        { name: '黑龙江省', value: 130 },
        { name: '湖南省', value: 195 },
        { name: '安徽省', value: 175 },
        { name: '山东省', value: 220 },
        { name: '新疆维吾尔自治区', value: 140 },
        { name: '江苏省', value: 230 },
        { name: '浙江省', value: 210 },
        { name: '江西省', value: 160 },
        { name: '湖北省', value: 205 },
        { name: '广西壮族自治区', value: 180 },
        { name: '甘肃省', value: 120 },
        { name: '山西省', value: 170 },
        { name: '内蒙古自治区', value: 110 },
        { name: '陕西省', value: 190 },
        { name: '吉林省', value: 140 },
        { name: '福建省', value: 195 },
        { name: '贵州省', value: 165 },
        { name: '广东省', value: 250 },
        { name: '青海省', value: 95 },
        { name: '西藏自治区', value: 85 },
        { name: '四川省', value: 220 },
        { name: '宁夏回族自治区', value: 105 },
        { name: '海南省', value: 135 },
        { name: '台湾省', value: 230 },
        { name: '香港特别行政区', value: 215 },
        { name: '澳门特别行政区', value: 80 }
      ]
    }
  ]
}
window.addEventListener('resize', function () {
  myChart.resize()
})
onMounted(() => {
  myChart = echarts.init(whereContainer.value)
  myChart.setOption(option)
})
</script>
<style scoped>
.whereWrapper {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
