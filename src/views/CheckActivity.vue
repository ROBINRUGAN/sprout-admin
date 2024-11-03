<template>
  <div class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      学生提交审核
    </h1>
    <el-form :model="form" label-width="auto" style="margin-top: 20px" @submit.prevent="search">
      <el-row :gutter="20">
        <!-- 活动名称 -->
        <el-col :span="8">
          <el-form-item label="活动名称">
            <el-input v-model="searchForm.keyword" placeholder="活动名称"></el-input>
          </el-form-item>
        </el-col>
        <!-- 活动类型 -->
        <el-col :span="12">
          <el-form-item label="活动类型">
            <el-radio-group v-model="searchForm.queryParentTask">
              <el-radio :value="1" label="父任务"></el-radio>
              <el-radio :value="0" label="单项任务"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-divider />

    <div class="scroll-container">
      <div class="card" v-for="(item, index) in items" :key="index" @click="getDetail(item, index)">
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <div class="scroll-container" v-if="showSon">
      <div
        class="card"
        v-for="(item, index) in detailItems"
        :key="index"
        @click="getDetailInfo(item.id)"
      >
        <img :src="item.taskImages" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.taskName }}</div>
          <div class="card-description">{{ item.taskDescription.split('\n')[0] }}</div>
        </div>
      </div>
    </div>

    <div class="scroll-container" v-if="showDetail">
      <div
        class="card"
        v-for="(item, index) in taskItems"
        :key="index"
        @click="getTaskInfo(index, item)"
      >
        <img :src="item.avatar" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-id">{{ '活动id: ' + item.id }}</div>
          <div class="card-title">{{ item.realName }}</div>
          <div class="card-description">{{ item.auditsSuggestion }}</div>
        </div>
      </div>
    </div>

    <el-card class="box-card" v-if="showTask">
      <template v-slot:header>
        <div class="clearfix">
          <span>任务详细信息</span>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label="头像">
          <el-avatar :src="taskInfo.avatar"></el-avatar>
        </el-descriptions-item>
        <el-descriptions-item label="定位信息">{{ taskInfo.location }}</el-descriptions-item>
        <el-descriptions-item label="图片">
          <el-image style="height: 100px" :src="taskInfo.photo" fit="cover" />
        </el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ taskInfo.realName }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ taskInfo.studentId }}</el-descriptions-item>
        <el-descriptions-item label="提交备注">{{ taskInfo.submitNote }}</el-descriptions-item>
        <el-descriptions-item label="任务提交时间">{{ taskInfo.submitTime }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">{{
          taskInfo.auditsStatus === 0 ? '不通过' : '通过'
        }}</el-descriptions-item>
        <el-descriptions-item label="审核意见">{{
          taskInfo.auditsSuggestion
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="openAuditDialog">进行审核</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.el-button--primary {
  width: 100px;
}
.el-divider--horizontal {
  margin: 0;
}

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
}

.card {
  display: inline-block;
  width: 450px; /* 这里的宽度可以根据您的设计来调整 */
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  vertical-align: top;
}
.card-image {
  width: 450px;
  height: 250px;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.card-description {
  font-size: 0.9em;
  color: #666;
}
.card-id {
  justify-content: right;
  font-size: 0.5em;
  margin-top: -5px;
  margin-bottom: 10px;
  padding: 0;
  color: #666;
  display: flex;
}
</style>
