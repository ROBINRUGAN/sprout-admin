<template>
  <div
    class="whereWrapper"
    ref="whereContainer"
    style="width: 99%; margin: 0 auto; height: 400px"
  ></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaMapData from '@/assets/china.json' // 请确保正确引入中国地图数据的路径
import { getStudentRegisterMapApi } from '@/api/api'

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
      let result = '<h4>' + params.name + '</h4>'
      result +=
        '<div style="background: #fff; padding: 10%; border-radius: 5px; margin-top: 5px; width:100%; min-width:max-content; display: flex; justify-content: space-between">'
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
    show: false,
    max: 10,
    left: '0',
    top: '0',
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
      roam: true, // 允许缩放和平移
      // layoutCenter: ['50%', '70%'], // 地图位置
      layoutSize: '100%', // 地图大小
      label: {
        show: false,
        color: 'rgba(0,0,0,0.6)'
      },
      data: [
        { name: '北京市', value: 0 },
        { name: '天津市', value: 0 },
        { name: '上海市', value: 0 },
        { name: '重庆市', value: 0 },
        { name: '河北省', value: 0 },
        { name: '河南省', value: 0 },
        { name: '云南省', value: 0 },
        { name: '辽宁省', value: 0 },
        { name: '黑龙江省', value: 0 },
        { name: '湖南省', value: 0 },
        { name: '安徽省', value: 0 },
        { name: '山东省', value: 0 },
        { name: '新疆维吾尔自治区', value: 0 },
        { name: '江苏省', value: 0 },
        { name: '浙江省', value: 0 },
        { name: '江西省', value: 0 },
        { name: '湖北省', value: 0 },
        { name: '广西壮族自治区', value: 0 },
        { name: '甘肃省', value: 0 },
        { name: '山西省', value: 0 },
        { name: '内蒙古自治区', value: 0 },
        { name: '陕西省', value: 0 },
        { name: '吉林省', value: 0 },
        { name: '福建省', value: 0 },
        { name: '贵州省', value: 0 },
        { name: '广东省', value: 0 },
        { name: '青海省', value: 0 },
        { name: '西藏自治区', value: 0 },
        { name: '四川省', value: 0 },
        { name: '宁夏回族自治区', value: 0 },
        { name: '海南省', value: 0 },
        { name: '台湾省', value: 0 },
        { name: '香港特别行政区', value: 0 },
        { name: '澳门特别行政区', value: 0 }
      ]
    }
  ]
}

// 加载接口数据并更新地图
const updateMapData = async () => {
  try {
    const response = await (await getStudentRegisterMapApi()).data
    if (response.success && response.data) {
      const apiData = response.data
      console.log('接口返回数据:', apiData)
      // 更新返回的省份数据
      option.series[0].data = option.series[0].data.map((item) => {
        const updatedItem = apiData.find((apiItem) => apiItem.name === item.name)
        if (updatedItem) {
          return { ...item, value: updatedItem.value }
        }
        return item // 保留原始数据
      })

      myChart.setOption(option) // 更新图表
    } else {
      console.error('接口返回数据异常:', response)
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

// 监听窗口大小变化
window.addEventListener('resize', function () {
  myChart.resize()
})

// 初始化图表
onMounted(() => {
  myChart = echarts.init(whereContainer.value)
  myChart.setOption(option)
  updateMapData() // 加载并更新接口数据
})
</script>

<style scoped>
.whereWrapper {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
</style>
