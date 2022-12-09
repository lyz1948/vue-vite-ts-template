<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'

import Search from './components/Search.vue'
import TableProduct from './components/TableProduct.vue'
import DialogEdit from './components/DialogEdit.vue'

const store = useStore()
const dialogRef = ref(null)

const state = reactive({
  tableData: [],
  total: 0,
})

const tableData = computed(() => {
  return store.state.user.userList
})

const fetchData = params => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const editItem = item => {
  dialogRef.value?.edit(item)
}

onBeforeMount(() => {
  fetchData()
})

watch(
  () => tableData.value,
  data => {
    if (!data || !data.length) return
    state.tableData = data
    state.total = data.length
  }
)
</script>

<template>
  <Search @on:search="fetchData" />
  <TableProduct @on:edit="editItem" />

  <DialogEdit ref="dialogRef" />
</template>

<style scoped></style>
