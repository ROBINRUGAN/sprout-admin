<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* transition: all 0.3s; */
}
a {
  text-decoration: none;
}
textarea {
  resize: none;
}
.el-textarea__inner {
  resize: none !important;
}
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}

/* 滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background: transparent;
}

/* 滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* 当鼠标悬停在滚动条滑块上时的样式 */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* 隐藏滚动条的按钮 */
::-webkit-scrollbar-button {
  display: none;
}

/* 隐藏滚动条底部和侧面的角部分 */
::-webkit-scrollbar-corner {
  background-color: transparent;
}

.el-loading-spinner .circular {
  background: url('https://mewww.w2fzu.com/upmew/cat.gif');
  background-size: cover;
  animation: none !important;
  transform: none;
  width: 100px !important;
  height: 100px !important;
}

.el-loading-spinner .path {
  stroke: none !important;
}
</style>
