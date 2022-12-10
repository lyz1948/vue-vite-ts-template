<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'

import SearchCate from './components/SearchCate.vue'
import TableCate from './components/TableCate.vue'
import DialogCate from './components/DialogCate.vue'
import { TagOrType } from '@/enums'

const store = useStore()
const dialogRef = ref(null)

const fetchData = params => {
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_LIST, { ...params, type: TagOrType.TYPE })
}

const editItem = item => {
  dialogRef.value?.edit(item)
}

const showDialog = item => {
  dialogRef.value?.show(item)
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <div>
    <SearchCate @on:search="fetchData" @on:create="showDialog" />
    <TableCate @on:edit="editItem" @on:reload="fetchData" />
    <DialogCate ref="dialogRef" @on:reload="fetchData" />
  </div>
</template>

<style scoped></style>
