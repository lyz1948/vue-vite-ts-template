<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { ProductList as columns } from '@/config/productTable'
import Search from './components/Search.vue'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import useElement from '@/hooks/useElement'

const store = useStore()
const { success } = useElement()
const state = reactive({
  tableData: [],
})

const productData = computed(() => {
  return store.state.product.productData
})

const fetchData = (params: ProductSearch) => {
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_LIST, params)
}

const handleUpdate = (row: unknown) => {
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_UPDATE, row).then(() => {
    success({ message: '更新成功' })
  })
}

watch(
  () => productData.value,
  data => {
    if (!data) {
      fetchData()
      return
    }

    state.tableData = data.list
  },
  { immediate: true }
)
</script>

<template>
  <div class="category-tag">
    <div class="container">
      <div class="content">
        <Search @on:search="fetchData" />
        <TableBase :data="state.tableData" :columns="columns">
          <template #code="{ row }">
            <el-tag v-if="row.code" type="info">
              {{ row.code }}
            </el-tag>
          </template>

          <template #isEnable="{ row }">
            <el-tag :type="row.isEnable ? 'success' : 'info'">
              {{ row.isEnable ? '启用' : '禁用' }}
            </el-tag>
          </template>

          <template #action="{ row }">
            <el-checkbox v-model="row.isRecommend" label="推荐" @change="handleUpdate(row)" />
            <el-checkbox v-model="row.isHot" label="热卖" @change="handleUpdate(row)" />
          </template>
        </TableBase>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
