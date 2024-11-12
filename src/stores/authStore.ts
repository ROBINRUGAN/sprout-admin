import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFacultyApi, getMajorApi, getPastApi, LoginApi } from '@/api/api'
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

    interface Colleges {
      facultyName: string
      id: number | string
    }
    interface Majors {
      majorName: string
      id: number | string
    }
    const colleges = ref<Colleges[]>([])
    const majors = ref<Majors[]>([])

    const fetchColleges = async () => {
      const res = await getFacultyApi()
      colleges.value = res.data.data.facultyList
    }

    const fetchMajors = async (collegeId: string) => {
      const res = await getMajorApi(collegeId)
      majors.value = res.data.data.majorList
    }

    const majorName = (majorId: string) => {
      console.log(majors.value)
      return majors.value.find((item) => item.id == majorId)?.majorName
    }

    const collegeName = (collegeId: string) => {
      console.log(colleges.value)
      return colleges.value.find((item) => item.id == collegeId)?.facultyName
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
    return {
      token,
      username,
      id,
      setToken,
      Login,
      Logout,
      fetchColleges,
      fetchMajors,
      majorName,
      collegeName
    }
  },
  {
    // 启用持久化
    persist: true
  }
)
