<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'

import Search from './components/Search.vue'
import TableProduct from './components/TableProduct.vue'
import DialogEdit from './components/DialogEdit.vue'
import { ProductSearch } from '@/types/product'

const store = useStore()
const dialogRef = ref(null)

const fetchData = (params: ProductSearch) => {
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_LIST, params)
}

const editItem = item => {
  dialogRef.value?.edit(item)
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <Search @on:search="fetchData" />
  <TableProduct @on:edit="editItem" @on:reload="fetchData" />

  <DialogEdit ref="dialogRef" />
</template>

<style scope></style>
