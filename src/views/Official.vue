<template>
  <!-- Part 1 -->
  <div class="part1">
    <div class="container">
      <img src="../assets/login/logo.png" class="logo" />
      <img src="../assets/official/title.png" style="width: 660px" />
      <h2
        style="
          background: linear-gradient(to right, #0090f7, #ba62fc, #f2416b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 28px;
          margin: 20px 0;
        "
      >
        你的智能大学生活助手
      </h2>
      <el-carousel :height="carouselHeight" class="carousel" indicator-position="none">
        <el-carousel-item>
          <img src="../assets/official/carousel1.png" class="carousel-img" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/official/carousel2.png" class="carousel-img" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/official/carousel3.png" class="carousel-img" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/official/carousel4.png" class="carousel-img" />
        </el-carousel-item>
      </el-carousel>
      <div class="entrance">
        <div class="android" @click="downloadAndroid">
          <img src="../assets/official/android.svg" />
          <span>Download for Android</span>
        </div>
        <div class="manage" @click="$router.push('/login')">
          <span>Enter Manage Center</span>
          <img src="../assets/official/manage.png" />
        </div>
      </div>
    </div>
  </div>

  <!-- Part 2 -->
  <div class="part2">
    <h1
      style="
        background: linear-gradient(to right, #0090f7, #ba62fc, #f2416b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 28px;
      "
    >
      强大、有趣、稳定、便捷。
    </h1>
    <div class="grid">
      <div v-for="(intro, index) in intros" :key="index" class="intro-item">
        <img :src="intro.img" alt="Intro Image" class="intro-img" />
        <h3 class="intro-title">{{ intro.title }}</h3>
        <p class="intro-content">{{ intro.content }}</p>
      </div>
    </div>
  </div>

  <!-- Part 3 -->
  <div class="part3">
    <!-- <img src="../assets/official/sprout.png" style="width: 30%; min-width: 250px" /> -->
    <img class="group" src="../assets/official/group_phone.png" />
    <div>
      <div class="devices">
        <div>
          <img src="../assets/official/client.png" />
          <p>客户端</p>
        </div>
        <div>
          <img src="../assets/official/admin.png" />
          <p>管理端</p>
        </div>
        <div>
          <img src="../assets/official/more.png" />
          <p>敬请期待</p>
        </div>
      </div>
      <img src="../assets/official/group_web.png" style="width: 60%" />
    </div>
  </div>

  <!-- Part 4 -->
  <div class="part4">
    <h1>期待我们能做出更精彩的事情。</h1>
    <div class="stat">
      <p><span class="number">18+</span><span class="desc">用户</span></p>
      <p><span class="number">88+</span><span class="desc">五星好评</span></p>
    </div>
    <p class="contact">联系我们</p>
    <p style="color: gray; font-weight: bold">Sprout新苗团队</p>
    <p class="footer">地址：福建省福州市福州大学旗山校区</p>
    <p class="footer">©Sprout新苗 版权所有</p>
  </div>
</template>
<style lang="scss" scoped>
.part1,
.part2,
.part3,
.part4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

.part1 {
  padding-top: 80px;
  text-align: center;
  background: linear-gradient(to right, #ccf783, #b4fdff);
}
.part1 > .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}
.logo {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 50px;
  border: solid white 5px;
  border-radius: 100%;
}
.part1 > h2 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.carousel {
  width: 70%;
}
.carousel-img {
  height: 100%;
}
.entrance {
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 5px 15px 25px rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  padding: 15px;
  background-color: white;
}
.entrance img {
  width: 30px;
}
.android,
.manage {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 40px;
  cursor: pointer;
}
.android {
  padding: 8px;
  border-style: solid;
  border-color: #102e6c;
  border-width: 2px;
}
.manage {
  padding: 10px;
  background: linear-gradient(to right, #fff81d, #75f9fd);
}
.android span,
.manage span {
  text-align: center; // 使文字居中
  flex-grow: 1; // 占据剩余空间
  font-size: 20px;
}

.part2 {
  margin-top: 80px;
  margin-bottom: 80px;
}
.part2 p {
  text-align: center;
}
.intro-content {
  // 保留换行
  white-space: pre-line;
}
.grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行 3 列 */
  gap: 20px;
  padding: 20px;
  width: 80%;
}
.grid > .intro-item {
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(69, 158, 255, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid img {
  width: 50px;
}
.grid p {
  color: gray;
  font-size: small;
  max-width: 180px;
}
.grid h3 {
  margin: 15px;
}
.part2,
.part3 {
  margin-bottom: 0;
}
.part3 .group {
  width: 80%;
}
.part3 > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  justify-content: space-evenly;
}
.devices {
  width: 330px;
}
.devices > div {
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  padding: 12px 25px 12px 25px;
  border-radius: 5px;
}
.devices > div:nth-child(2) {
  margin-left: auto;
}
.devices img {
  width: 40px;
}

.part4 > h1 {
  color: #4095e5;
  margin-bottom: 100px;
}
.part4 > .stat {
  display: flex;
  gap: 30px;
  margin-bottom: 60px;
}
.part4 > .stat > p {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  box-shadow: 0px 0px 20px rgba(69, 158, 255, 0.4);
}
.number {
  font-size: 40px;
  color: #459eff;
}
.contact {
  background-color: #4095e5;
  color: white;
  padding: 10px 30px 10px 30px;
  border-radius: 30px;
  font-size: small;
  cursor: pointer;
  margin-bottom: 80px;
}
.footer {
  color: gray;
  font-size: small;
  margin-top: 10px;
}
</style>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const carouselHeight = ref('0px')
const updateCarouselHeight = () => {
  // carousel 的默认高度是固定的，这边手动更新
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  carouselHeight.value = width * 0.7 /* carousel宽度的比例 */ * 0.6 + 'px'
}

onMounted(async () => {
  updateCarouselHeight()
  window.addEventListener('resize', updateCarouselHeight, false)
})

const downloadAndroid = () => {
  window.location.href =
    'https://engroc.oss-cn-fuzhou.aliyuncs.com/new-sprout/8458f780-d023-4e7c-a6a7-9632a25395ed.APK'
}

interface Intro {
  img: string
  title: string
  content: string
}

const intros = ref<Intro[]>([
  {
    img: new URL('../assets/official/game.png', import.meta.url).href,
    title: '游戏化任务',
    content: '创新的游戏化设计\n提升用户体验'
  },
  {
    img: new URL('../assets/official/AI.png', import.meta.url).href,
    title: 'AI识别',
    content: '支持人脸识别、姿态识别、物品识别等AI识别功能'
  },
  {
    img: new URL('../assets/official/earn.png', import.meta.url).href,
    title: '多元盈利',
    content: '多元化盈利模式\n具有商业可持续性'
  },
  {
    img: new URL('../assets/official/fullsvc.png', import.meta.url).href,
    title: '全面服务',
    content:
      '支持查询学校信息、报修设备、在活动评论区交流、查询个人成绩排名、参考选课意见等全面校园服务'
  },
  {
    img: new URL('../assets/official/vsbdata.png', import.meta.url).href,
    title: '可视化数据',
    content: '管理端提供日活、广告、学生注册地区、学生学院等信息的可视化查询功能'
  },
  {
    img: new URL('../assets/official/managable.png', import.meta.url).href,
    title: '支持管理',
    content: '管理员可以通过管理员账号在PC端、手机端管理平台信息'
  }
])
</script>
