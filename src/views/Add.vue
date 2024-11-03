<template>
  <div :gutter="0" class="wrapper">
    <div class="left">
      <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
        活动信息录入
      </h1>
      <el-form :model="form" label-width="auto">
        <!-- 表单内容将在后续 commits 中添加 -->
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.left {
  background-color: #fff;
  width: 100%;
}
</style>
