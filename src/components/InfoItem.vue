<template>
  <div class="wrapper">
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
  if (props.type === 'unaudited') {
    return '待审'
  } else if (props.type === 'passed') {
    return '通过'
  } else if (props.type === 'rejected') {
    return '拒绝'
  }
  return '公告'
})
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 5px;
  transition: all 0.3s ease;
  background-color: white;
  border-radius: 5px;
}
.wrapper:hover {
  background-color: rgb(245, 245, 245);
}

.basic {
  min-width: fit-content;
  padding: 5px 10px;
  font-size: 12px;
  text-align: center;
  border-radius: 5px;
}

.msg {
  background: linear-gradient(to right, #0090f7cc, #ba62fccc, #f2416bcc);
  color: white;
}
.unaudited {
  background-color: rgba(232, 243, 255, 1);
  color: rgba(31, 99, 255, 1);
}
.passed {
  background-color: rgba(232, 255, 236, 1);
  color: rgba(0, 191, 165, 1);
}
.rejected {
  background-color: rgba(255, 243, 243, 1);
  /* 红的 */
  color: rgba(255, 107, 107, 1);
}
.text {
  color: rgba(134, 144, 156, 1);
  font-size: 12px;
  margin-left: 8px;
}
</style>
