<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getPastApi, getPastChildApi } from '@/api/api'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  current: 1,
  size: 10,
  queryParentTask: 1,
  keyword: ''
})
const showSon = ref(false)
const showDetail = ref(false)

interface brief {
  id: ''
  faorson: 1
  parentId: -1
  isMain: 0
  Audit: false
  taskName: ''
  taskDescription: ''
  taskType: ''
  taskImages: ''
  taskPoints: 0
  taskRewards: ''
  taskRectangle: ''
  taskLatitude: ''
  taskLongitude: ''
  taskRadius: ''
  taskDifficulty: 0
  taskPriority: 0
  requiresGrade: ''
  requiresFaculty: ''
  requiresMajor: ''
  requiresPhoto: 0
  requiresAttitude: ''
  requiresItem: ''
  taskRequiresType: 0
  requiresAudit: 0
  startTime: ''
  endTime: ''
  tree: 0
  chan: 0
  water: 0
}

const items = ref<brief[]>([])
const detailItems = ref<brief[]>([])
const form = ref({
  id: '',
  faorson: 1,
  parentId: -1,
  isMain: 0,
  taskName: '',
  Audit: false,
  taskDescription: '',
  taskType: '',
  taskImages: '',
  taskPoints: 0,
  taskRewards: '',
  taskRectangle: '',
  taskLatitude: '',
  taskLongitude: '',
  taskRadius: '',
  taskDifficulty: 0,
  taskPriority: 0,
  requiresGrade: '',
  requiresFaculty: '',
  requiresMajor: '',
  requiresPhoto: 0,
  requiresAttitude: '',
  requiresItem: '',
  taskRequiresType: 0,
  requiresAudit: 0,
  startTime: '',
  endTime: '',
  tree: 0,
  chan: 0,
  water: 0
})

const search = () => {
  getPastApi(searchForm).then((res) => {
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      items.value = res.data.data.records
      showDetail.value = false
      showSon.value = false
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

const getDetail = (data: any, index: number) => {
  getPastChildApi({
    id: data.id,
    querySubTask: 1
  }).then((res) => {
    if (res.data.code == '0') {
      ElMessage.success('查询成功')
      detailItems.value = res.data.data.subTaskList
      showSon.value = true
      if (data.parentId == '0') {
        showDetail.value = true
        form.value = data
        if (form.value.requiresAudit === 1) {
          form.value.Audit = true
        } else {
          form.value.Audit = false
        }
        form.value.water = parseInt(form.value.taskRewards.split(',')[0])
        form.value.chan = parseInt(form.value.taskRewards.split(',')[1])
        form.value.tree = parseInt(form.value.taskRewards.split(',')[2])
      }
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

const getDetailInfo = (id: number) => {
  showDetail.value = true
  form.value = detailItems.value[id]
  if (form.value.requiresAudit === 1) {
    form.value.Audit = true
  } else {
    form.value.Audit = false
  }
  form.value.water = parseInt(items.value[id].taskRewards.split(',')[0])
  form.value.chan = parseInt(items.value[id].taskRewards.split(',')[1])
  form.value.tree = parseInt(items.value[id].taskRewards.split(',')[2])
}

onMounted(() => {
  search()
})
</script>
