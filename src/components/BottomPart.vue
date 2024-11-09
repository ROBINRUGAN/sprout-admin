<script setup>
import { onMounted,ref } from 'vue'
import { ElTable, ElTableColumn, ElIcon } from 'element-plus'
import Pie from '@/components/Pie.vue'
import { getHotTaskApi } from '@/api/api'


const tableData = ref([
  // { rank: '1', activityName: '新生注册', completionVolume: '999+人',  parentTask: '1' },
  // { rank: '2', activityName: '寻找宿舍', completionVolume: '999+人', parentTask: '2' },
  // { rank: '3', activityName: '未雨绸缪', completionVolume: '999+人', parentTask: '3' },
  // { rank: '4', activityName: '探索巍巍学府', completionVolume: '837人', parentTask: '4' },
  // { rank: '5', activityName: '了解校史', completionVolume: '756人', parentTask: '5' },
  // { rank: '6', activityName: '校规检测', completionVolume: '542人', parentTask: '6' },
  // { rank: '7', activityName: '每日锻炼', completionVolume: '377人', parentTask: '7' }
])
// 获取热门任务数据并更新 tableData
const getHotTasks = () => {
  getHotTaskApi().then((res) => {
    if (res.data.code === '0') {
      // 映射 API 返回数据到 tableData
      tableData.value = res.data.data.map(item => ({
        rank: item.rank,
        activityName: item.taskName,
        completionVolume: item.count + '人',
        parentTask: item.parentTaskName
      }))
    } else {
      console.error(res.message || '数据获取失败')
    }
  }).catch(error => {
    console.error('接口请求错误:', error)
  })
}

onMounted(() => {
  getHotTasks()
})

</script>

<template>
  <div class="bottompart">
    <div class="hot-col">
      <div class="hot">
        <h1>热门活动</h1>
        <br />
        <el-table
          :data="tableData"
          style="width: 100%; height: 270px"
          :header-cell-style="{ backgroundColor: '#f5f5f5', color: '#000' }"
        >
          <el-table-column prop="rank" label="排名" width="60px"></el-table-column>
          <el-table-column prop="activityName" label="活动名称" width="220px"></el-table-column>
          <el-table-column prop="completionVolume" label="完成量" width="90px"></el-table-column>
          <el-table-column label="所属父任务">
            <template #default="scope">
              <div>
                {{ scope.row.parentTask }}
             
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="summary-col">
      <div class="summary">
        <h1>学生分类统计</h1>
        <Pie />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottompart {
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
}

.hot-col,
.summary-col {
  flex: 1;
  min-width: 280px; /* 设置一个最小宽度，以便在屏幕较小时自动换行 */
}

.hot {
  height: 400px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.summary {
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Mobile layout */
@media (max-width: 1024px) {
  .bottompart {
    flex-direction: column;
  }

  .hot-col,
  .summary-col {
    width: 100%;
  }
}
</style>
