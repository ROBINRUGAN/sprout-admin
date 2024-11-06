<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adDetailApi } from '@/api/api' // 确保API路径正确
import { ElMessage } from 'element-plus'

// 初始化响应式数据
const isShow = ref(false)
const searchForm = reactive({
  current: 1,
  size: 10,
  adType: null,
  startTime: '',
  endTime: ''
})
const form = ref({
  adType: null,
  wordsContent: '',
  imgContent: '',
  linkUrl: '',
  keywords: '',
  pushMethod: null,
  pushPosition: '',
  targetFacultyRange: '',
  targetGenderRange: '',
  targetGradeRange: '',
  startTime: '',
  endTime: '',
  cost: '',
  keywordsCount: 1
})

// 创建生命周期钩子
onMounted(() => {
  fetchAdList()
})

// 数据接口类型定义
interface brief {
  id: number
  adType: null
  wordsContent: ''
  imgContent: ''
  linkUrl: ''
  keywords: ''
  pushMethod: null
  pushPosition: ''
  targetFacultyRange: ''
  targetGenderRange: ''
  targetGradeRange: ''
  startTime: ''
  endTime: ''
  cost: ''
  keywordsCount: 1
}
const items = ref<brief[]>([])

// 获取广告详细信息
const getDetail = (id: number) => {
  isShow.value = true
  form.value = items.value[id]
}

// 获取广告列表数据
const fetchAdList = async () => {
  const res = await adDetailApi(searchForm)
  if (res.data.code == '0') {
    ElMessage.success('查询成功')
    isShow.value = false
    items.value = res.data.data.records
  } else {
    ElMessage.error(res.data.message)
  }
}
</script>
