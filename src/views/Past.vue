<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'

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
</script>
