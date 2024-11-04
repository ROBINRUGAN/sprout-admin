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
