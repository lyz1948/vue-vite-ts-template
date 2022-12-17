<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { CategoryTagRelative as columns } from '@/config/weappTable'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import Search from './components/Search.vue'
import DialogTag from './components/DialogTag.vue'

const store = useStore()

const dialogRef = ref(null)
const state = reactive({
  tableData: [],
})

const productData = computed(() => {
  return store.state.product.productData
})

const fetchData = (params: ProductSearch) => {
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_LIST, params)
}

const showDialog = (row: unknown) => {
  dialogRef.value?.show(row)
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
      <Search @on:search="fetchData" />
      <TableBase :data="state.tableData" :columns="columns">
        <template #code="{ row }">
          <el-tag v-if="row.code" type="info">
            {{ row.code }}
          </el-tag>
        </template>

        <template #relative="{ row }">
          <el-tag
            v-for="item in row.tags"
            :key="item.id"
            type="warning"
            class="ml5"
          >
            {{ item.name }}
          </el-tag>
        </template>

        <template #isEnable="{ row }">
          <el-tag :type="row.isEnable ? 'success' : 'info'">
            {{ row.isEnable ? '上架' : '下架' }}
          </el-tag>
        </template>

        <template #action="{ row }">
          <BtnBase type="primary" link @click="showDialog(row)">
            关联
          </BtnBase>
        </template>
      </TableBase>
    </div>
    <DialogTag ref="dialogRef" />
  </div>
</template>

<style lang="scss"></style>
