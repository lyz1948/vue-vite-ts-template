<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import SearchGallery from './components/SearchGallery.vue'
import TableGallery from './components/TableGallery.vue'
import DialogGallery from './components/DialogGallery.vue'

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
  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_LIST, params)
}

const editItem = (item) => {
  dialogRef.value?.edit(item)
}

const showDialog = () => {
  dialogRef.value?.show()
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
    <SearchGallery @on:search="fetchData" @on:create="showDialog" />
    <TableGallery @on:edit="editItem" @on:reload="fetchData" />
    <DialogGallery ref="dialogRef" @on:reload="fetchData" />
  </div>
</template>

<style scoped></style>
