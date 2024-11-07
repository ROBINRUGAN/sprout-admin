<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
const emit = defineEmits(['getLng', 'getLat'])
let map = null
const lng = ref(119.19799)
const lat = ref(26.059948)
window._AMapSecurityConfig = {
  securityJsCode: 'c8e0907dda5024560fded97a48b7a84b'
}
onMounted(() => {
  AMapLoader.load({
    key: 'c68305c796b23c3f2bfdc18b25b3aaa0', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '2D', // 是否为3D地图模式
        zoom: 17, // 初始化地图级别
        center: [119.19799, 26.059948] // 初始化地图中心点位置
      })
      var clickHandler = function (e) {
        lng.value = e.lnglat.getLng()
        lat.value = e.lnglat.getLat()
        var marker = new AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [lng.value, lat.value],
            anchor: 'bottom-center'
          })
        map.clearMap();
        map.add(marker)
        console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')
        emit('getLng', e.lnglat.getLng().toString())
        emit('getLat', e.lnglat.getLat().toString())
      }

      //绑定事件
      map.on('click', clickHandler)
    })
    .catch((e) => {
      // console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>
<template>
  <div id="container"></div>
</template>
<style scoped>
#container {
  border-radius: 50px;
  padding: 0px;
  margin: 0px;
  width: 750px;
  height: 500px;
}
</style>
