<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'

import SearchTag from './components/SearchTag.vue'
import TableTag from './components/TableTag.vue'
import DialogTag from './components/DialogTag.vue'

const store = useStore()
const dialogRef = ref(null)

const fetchData = (params = {}) => {
  return store.dispatch(ProductActionTypes.ACTION_PRODUCT_TAG_LIST, params)
}

const editItem = (item) => {
  dialogRef.value?.edit(item)
}

const showDialog = (item) => {
  dialogRef.value?.show(item)
}

onBeforeMount(() => {
  fetchData()
})

</script>

<template>
  <div>
    <SearchTag @on:search="fetchData" @on:create="showDialog" />
    <TableTag @on:edit="editItem" @on:reload="fetchData" />
    <DialogTag ref="dialogRef" @on:reload="fetchData" />
  </div>
</template>

<style scope></style>
