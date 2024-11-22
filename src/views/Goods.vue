<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getProductsApi, getProductApi, addProductApi } from '@/api/api'
import { ElNotification, ElMessageBox } from 'element-plus'
import UploadImg from '@/components/UploadImg.vue'

const loading = ref(true)
const products = ref([])
const selectedProduct = reactive({
  id: 0,
  productName: '',
  productImg: '',
  productIntroduction: '',
  needPoints: 0,
  stocks: 0
})
const showDialog = ref(false)
const showAddDialog = ref(false)
const newProduct = reactive({
  productName: '',
  productImg: '',
  productIntroduction: '',
  needPoints: 0,
  stocks: 0
})
const setURL = (urls: string[]) => {
  newProduct.productImg = urls.join('<')
}

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await (await getProductsApi()).data
    if (response.success) {
      products.value = response.data
      ElNotification.success({ title: '成功', message: '获取商品列表成功' })
      setTimeout(() => {
        loading.value = false
      }, 1000)
    } else {
      ElNotification.error({ title: '错误', message: response.message || '获取商品列表失败' })
    }
  } catch (error) {
    ElNotification.error({ title: '错误', message: '网络错误，请稍后重试' })
  }
}

// 获取商品详情
const getDetailInfo = async (id: number) => {
  loading.value = true
  try {
    const response = await (await getProductApi(id.toString())).data
    if (response.success) {
      Object.assign(selectedProduct, response.data)
      showDialog.value = true
    } else {
      ElNotification.error({ title: '错误', message: response.message || '获取商品详情失败' })
    }
  } catch (error) {
    ElNotification.error({ title: '错误', message: '网络错误，请稍后重试' })
  } finally {
    loading.value = false
  }
}

// 添加新商品
const addProduct = async () => {
  try {
    const response = await (await addProductApi(newProduct)).data
    if (response.success) {
      ElNotification.success({ title: '成功', message: '商品添加成功' })
      showAddDialog.value = false
      fetchProducts() // 刷新商品列表
    } else {
      ElNotification.error({ title: '错误', message: response.message || '添加商品失败' })
    }
  } catch (error) {
    ElNotification.error({ title: '错误', message: '网络错误，请稍后重试' })
  }
}

// 初始化
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <div class="header">
      <h1>商品一览</h1>
      <el-button type="primary" @click="showAddDialog = true">添加商品</el-button>
    </div>

    <el-divider />

    <div class="grid">
      <div
        class="card"
        v-for="(item, index) in products"
        :key="index"
        @click="getDetailInfo(item.id)"
      >
        <img :src="item.productImg" alt="" class="card-image" />
        <div class="card-content">
          <div class="card-title">{{ item.productName }}</div>
          <div class="ellipsis card-description">{{ item.productIntroduction }}</div>
          <div class="card-points">所需积分: {{ item.needPoints }}</div>
          <div class="card-stocks">库存: {{ item.stocks }}</div>
        </div>
      </div>
    </div>

    <!-- 商品详情弹框 -->
    <el-dialog v-model="showDialog" title="商品详情">
      <img :src="selectedProduct.productImg" alt="" class="dialog-image" />
      <p><strong>商品名称：</strong>{{ selectedProduct.productName }}</p>
      <p><strong>商品介绍：</strong>{{ selectedProduct.productIntroduction }}</p>
      <p><strong>所需积分：</strong>{{ selectedProduct.needPoints }}</p>
      <p><strong>库存：</strong>{{ selectedProduct.stocks }}</p>
      <template v-slot:footer>
        <span>
          <el-button @click="showDialog = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加商品弹框 -->
    <el-dialog v-model="showAddDialog" title="添加商品">
      <el-form :model="newProduct">
        <el-form-item label="商品名称">
          <el-input v-model="newProduct.productName" />
        </el-form-item>

        <el-form-item label="商品图片">
          <UploadImg @urls="setURL"></UploadImg>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input v-model="newProduct.productIntroduction" type="textarea" />
        </el-form-item>
        <el-form-item label="所需积分">
          <el-input-number v-model="newProduct.needPoints" />
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input-number v-model="newProduct.stocks" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span>
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addProduct">添加</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: calc(100vh - 100px);
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
}
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
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
.card-points,
.card-stocks {
  font-size: 0.9em;
  margin-top: 4px;
}
.dialog-image {
  width: 100%;
  max-height: 300px;
  display: flex;
  margin-bottom: 16px;
  object-fit: contain;
}
.ellipsis {
  display: -webkit-box; /* 需要结合 -webkit-line-clamp 使用 */
  -webkit-line-clamp: 1; /* 限制显示的行数 */
  -webkit-box-orient: vertical; /* 必须结合 line-clamp */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
  white-space: normal; /* 防止单行时使用 nowrap */
}
</style>
