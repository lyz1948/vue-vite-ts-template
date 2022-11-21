<script setup lang="ts">
import { computed, ref } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import ImageList from '@/components/business/ImageList.vue'
import DialogMaterial from '@/components/business/DialogMaterial.vue'

const menuList = [
  { name: '全部', value: 'all' },
  { name: '产品素材', value: 'product' },
  { name: '轮播素材', value: 'swiper' },
]

const imageList = ref([
  { src: '/src/assets/cover.jpeg', name: 'abc.jpeg', check: false },
  { src: '/src/assets/cover.jpeg', name: '123.jpeg', check: false },
])

const dialogRef = ref(null)
const isBatch = ref(false)
const hasBatch = computed(() => isBatch.value)

const getBatchType = computed(() => hasBatch.value ? 'success' : 'danger')
const getBatchText = computed(() => hasBatch.value ? '取消操作' : '批量操作')

const handleUpload = () => {
  dialogRef.value.show()
}
</script>

<template>
  <div class="material">
    <DialogMaterial ref="dialogRef" />
    <ModTitle title="素材管理">
      <div class="tag-wrap">
        <BtnBase type="primary" @click="handleUpload">
          上传素材
        </BtnBase>
        <BtnBase :type="getBatchType" @click="isBatch = !isBatch">
          {{ getBatchText }}
        </BtnBase>
      </div>
    </ModTitle>
    <div class="content">
      <div class="container">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item, index) in menuList" :key="index" :label="item.name">
            <ImageList :list="imageList" :is-batch="hasBatch" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tag-wrap {
  display: flex;
  justify-content: flex-end;
  .tag-item {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
