<template>
  <div :gutter="0" class="wrapper">
    <h1 style="font-size: 24px; margin-top: 15px; margin-left: 15px; margin-bottom: 15px">
      广告发布
    </h1>
    <el-form ref="adForm" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <!-- 广告类型 -->
          <el-form-item label="广告类型">
            <el-select v-model="form.adType" placeholder="请选择">
              <el-option label="文本" :value="1"></el-option>
              <el-option label="图片" :value="2"></el-option>
              <el-option label="视频" :value="3"></el-option>
              <el-option label="文本+图片" :value="4"></el-option>
              <el-option label="文本+视频" :value="5"></el-option>
            </el-select>
          </el-form-item>

          <!-- 文本内容 -->
          <el-form-item label="文本内容">
            <el-input v-model="form.wordsContent" type="textarea"></el-input>
          </el-form-item>

          <!-- 图片/视频内容 -->
          <el-form-item label="图片/视频内容">
            <UploadFile @urls="setURL"></UploadFile>
          </el-form-item>

          <!-- 跳转链接 -->
          <el-form-item label="跳转链接">
            <el-input v-model="form.linkUrl" placeholder="请输入跳转链接或-1代表无跳转"></el-input>
          </el-form-item>

          <!-- 关键字 -->
          <el-form-item label="关键字">
            <el-input v-model="form.keywords" placeholder="请输入关键字，用逗号分隔"></el-input>
          </el-form-item>

        <!-- 广告时间范围 -->
        <el-form-item label="广告时间范围">
            <el-col :span="11">
            <el-date-picker
                v-model="form.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="开始时间"
                style="width: 100%"
            />
            </el-col>
            <el-col :span="2" style="text-align: center">—</el-col>
            <el-col :span="11">
            <el-date-picker
                v-model="form.endTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="结束时间"
                style="width: 100%"
            />
            </el-col>
        </el-form-item>

        <!-- 广告费用 -->
        <el-form-item label="广告费用">
            <el-input v-model="form.cost" type="number" placeholder="请输入广告费用"></el-input>
        </el-form-item>

        </el-col>
        <el-col :span="12">
          <!-- 目标学院 -->
          <el-form-item label="目标学院">
            <el-select v-model="form.targetFacultyRange" placeholder="请选择...">
              <el-option
                v-for="college in colleges"
                :key="college.id"
                :value="college.id"
                :label="college.facultyName"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 目标性别 -->
          <el-form-item label="目标性别">
            <el-select v-model="form.targetGenderRange" placeholder="请选择">
              <el-option label="女" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="全部" value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- 目标年级范围 -->
          <el-form-item label="目标年级范围">
            <el-input
              v-model="form.targetGradeRange"
              placeholder="请输入目标年级范围，用逗号分隔或-1代表全部"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
