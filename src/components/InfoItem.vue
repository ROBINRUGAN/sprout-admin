<template>
  <div class="wrapper" @mouseover="hover = true" @mouseleave="hover = false">
    <div :class="type" class="basic">{{ tag }}</div>
    <p class="text"><slot></slot></p>
    <!-- 删除按钮 -->
    <button v-if="hover" class="delete-btn" @click="handleDelete">&#10060;</button>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue'

// 定义一个接收 color 的 prop
const props = defineProps({
  type: String,
  id: [String, Number] // 唯一标识符，便于删除操作
})

// 事件向父组件发送
const emit = defineEmits(['delete'])

// 控制鼠标悬浮状态
const hover = ref(false)

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

// 删除逻辑
const handleDelete = () => {
  emit('delete', props.id) // 向父组件发送删除事件
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 5px;
  transition: all 0.3s ease;
  background-color: white;
  border-radius: 5px;
  position: relative; /* 让按钮定位生效 */
}
.wrapper:hover {
  background-color: rgb(245, 245, 245);
}

.basic {
  min-width: fit-content;
  padding: 5px 10px;
  font-size: 12px;
  text-align: center;
  font-family: Roboto;
}

.msg {
  background-color: rgba(232, 255, 251, 1);
  color: rgb(68, 212, 208);
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
  background-color: rgba(255, 247, 232, 1);
  color: rgba(255, 142, 33, 1);
}
.text {
  color: rgba(134, 144, 156, 1);
  font-size: 12px;
  margin-left: 8px;
}

/* 删除按钮样式 */
.delete-btn {
  position: absolute;
  right: 10px;
  background-color: transparent;
  border: none;
  color: rgb(189, 0, 0);
  font-size: 12px;
  cursor: pointer;
  opacity: 0.8;
}
.delete-btn:hover {
  opacity: 1;
}
</style>
