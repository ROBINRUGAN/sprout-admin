<script lang="ts" setup>
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
const treeData = ref([
  { item: '水滴', amount: 10 },
  { item: '铲子', amount: 10 },
  { item: '杂草', amount: 4 },
  { item: '小树苗', amount: 1 },
  { item: '中树苗', amount: 1 },
  { item: '大树', amount: 3 },
  { item: '已收获大树', amount: 1 }
])
const opData = ref([
  { item: '给小树浇水3滴', time: '2024/3/21 13:23' },
  { item: '除杂草', time: '2024/3/21 13:23 ' }
])

const taskData = ref([
  { name: '未雨绸缪', id: '327389', status: '已完成' },
    { name: '寻找宿舍', id: '327389', status: '已完成' },
    { name: '新生注册', id: '327389', status: '已完成' },
    { name: '领取新生物品', id: '327389', status: '已完成' },
    { name: '学分认定规则检测', id: '327389', status: '已完成' }
])
const mewch = ref(false)

const showMewch = () => {
  mewch.value = true
  ElMessage.success('查询成功')
}
</script>

<template>
  <el-col class="find">
    <el-row>
      <h1 style="margin-left: 10px;">查询用户</h1>
      <div class="wrapper">
        <div class="inputWrapper">
          <p>学号</p>
          <input type="text" placeholder="请输入" />
        </div>
        <div class="inputWrapper">
          <p>院系</p>
          <input type="text" placeholder="请输入" />
        </div>
        <div class="inputWrapper">
          <p>专业</p>
          <input type="text" placeholder="请输入" />
        </div>
        <button class="search" @click="showMewch">查询</button>
      </div>
    </el-row>
    <el-empty description="description" v-if="!mewch"/>
    <el-row  v-if="mewch">
      <el-col :span="8" class="infos">
        <p>真实姓名：翁鹏</p>
        <p>用户名：FZU7987208859</p>
        <p>ID：1762445889697591297</p>
        <p>认证情况：已认证</p>
        <p>学号：222200331</p>
        <p>院系：计算机与大数据学院</p>
        <p>专业：软件工程</p>
        <p>年级：大二</p>
        <p>性别：男</p>
        <p>地区：中国福建省</p>
        <p>手机号：180****1111</p>
        <p>身份证号：3503**********1633</p>
        <p>是否为VIP：否</p>
      </el-col>
      <el-col :span="16">
        <!-- <el-row class="twoimgs">
          <el-col
            :span="12"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
         
          </el-col>
          <el-col
            :span="12"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
      
          </el-col>
        </el-row> -->
        <el-row class="twodetail">
          <el-col
            :span="12"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            <h1>树林详情</h1>
            <el-table
              :data="treeData"
              stripe
              :show-header=false
              size="small"
              style="width: 140px; height: 110px; font-size: 12px; margin-top: 10px"
            >
              <el-table-column prop="item" width="90px"> </el-table-column>
              <el-table-column prop="amount" width="50px"> </el-table-column>
            </el-table>
          </el-col>
          <el-col
            :span="12"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            <h1>操作详情</h1>
            <el-table
              :data="opData"
              stripe
              :show-header=false
              size="small"
              style="width: 240px; height: 110px; font-size: 12px; margin-top: 10px"
            >
              <el-table-column prop="item" width="120px"> </el-table-column>
              <el-table-column prop="time" width="120px"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="onedetail">
          <el-col :span="24" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;">
            <h1>任务详情</h1>
            <el-table
              :data="taskData"
              stripe
              :show-header=false
              size="small"
              style="width: 510px; height: 140px; font-size: 12px; margin-top: 5px"
            >
              <el-table-column prop="name" width="240px"> </el-table-column>
              <el-table-column prop="id" width="170px"> </el-table-column>
              <el-table-column prop="status" width="100px"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-col>
</template>

<style scoped>
.twoimgs {
  height: 180px;
  background-color: #fff;
}
.twodetail {
  height: 180px;
  background-color: #fff;
}
.onedetail {
  height: 190px;
  background-color: #fff;
}
.find {
  
  height: 400px;
  overflow: scroll;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  padding-left: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.infos p {
  padding: 3px;
  font-size: 16px;
}
.infos {
  border-right: #000 1px solid;
  padding-left: 30px;
}
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 40px;
}
.inputWrapper {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
}
input {
  width: 70%;
  margin-left: 10px;
  display: flex;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
}
.search {
  width: 50%;
  height: 32px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
.search:hover {
  background-color: #66b1ff;
}
.search:active {
  background-color: #3d8ce6;
}
</style>
