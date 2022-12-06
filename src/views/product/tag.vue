<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'

import SearchTag from './components/SearchTag.vue'
import TableTag from './components/TableTag.vue'
import DialogTag from './components/DialogTag.vue'

const store = useStore()
const dialogRef = ref(null)

const state = reactive({
  tableData: [],
  total: 0,
})

const tableData = computed(() => {
  return store.state.user.userList
})

const fetchData = (params) => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
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

watch(() => tableData.value, (data) => {
  if (!data || !data.length) return
  state.tableData = data
  state.total = data.length
})
</script>

<template>
  <div>
    <DialogTag ref="dialogRef" />
    <SearchTag @on:search="fetchData" @on:create="showDialog" />
    <TableTag @on:edit="editItem" />
  </div>
</template>

<style scoped></style>
