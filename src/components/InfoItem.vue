<template>
  <div style="display: flex; align-items: center; margin-bottom: 10px">
    <div :class="type" class="basic">{{ tag }}</div>
    <p class="text"><slot></slot></p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义一个接收 color 的 prop
const props = defineProps({
  type: String
})

const tag = computed(() => {
  if (props.type === 'activity') {
    return '活动'
  } else if (props.type === 'info') {
    return '公告'
  } else if (props.type === 'msg') {
    return '消息'
  }
  return '其他'
})
</script>

<style scoped>
.basic {
  padding: 5px 10px;
  font-size: 12px;
  text-align: center;
  font-family: Roboto;
}
.msg {
  background-color: rgba(232, 255, 251, 1);
  color: rgb(68, 212, 208);
}
.info {
  background-color: rgba(232, 243, 255, 1);
  color: rgba(31, 99, 255, 1);
}
.activity {
  background-color: rgba(255, 247, 232, 1);
  color: rgba(255, 142, 33, 1);
}
.text {
  color: rgba(134, 144, 156, 1);
  font-size: 12px;
  margin-left: 8px;
}
</style>
