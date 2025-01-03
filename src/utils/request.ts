import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

// 创建axios实例
export const service = axios.create({
  baseURL: `https://sprout.mewtopia.cn/`,
  timeout: 20000, // 超时时间
  withCredentials: false, // 是否允许带cookie
  maxContentLength: Infinity,
  maxBodyLength: Infinity
})

const hasExpired = ref(false)

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'

    const authStore = useAuthStore()

    const token = authStore.token

    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 'A000100') {
      if (!hasExpired.value) ElNotification.info('登录已过期，请重新登录')
      hasExpired.value = true

      setTimeout(() => {
        hasExpired.value = false
      }, 1000)
      router.push({ path: '/login' })
    }
    return response
  },
  (error) => Promise.reject(error)
)

export default service
