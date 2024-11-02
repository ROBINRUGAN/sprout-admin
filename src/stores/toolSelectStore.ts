import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToolSelectStore = defineStore(
  'toolSelect',
  () => {
    const focused = ref(1)

    // Actions 用于改变 focused 的值
    function setFirst() {
      focused.value = 1
    }

    function setSecond() {
      focused.value = 2
    }

    function setThird() {
      focused.value = 3
    }

    function setForth() {
      focused.value = 4
    }

    function setFifth() {
      focused.value = 5
    }

    // 返回所有的状态和方法
    return { focused, setFirst, setSecond, setThird, setForth, setFifth }
  },
  {
    // 启用持久化
    persist: true
  }
)
