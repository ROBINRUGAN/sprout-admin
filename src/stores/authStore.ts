import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginApi } from '@/api/api'
import { ElNotification } from 'element-plus'
import router from '@/router'
export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const username = ref('')
    const id = ref('')
    const setToken = (data: string) => {
      token.value = data
    }
    const Logout = () => {
      token.value = ''
      username.value = ''
      id.value = ''
      router.push({ path: '/login' })
    }
    const Login = async (loginData: any) => {
      const res = await LoginApi(loginData)
      if (res.data.code === '0') {
        ElNotification.success('登录成功！')
        setToken(res.data.data.token)
        username.value = res.data.data.username
        id.value = res.data.data.id
        router.push({ path: '/home' })
      } else {
        ElNotification.error(res.data.message)
      }
    }
    return { token, username, id, setToken, Login, Logout }
  },
  {
    // 启用持久化
    persist: true
  }
)
