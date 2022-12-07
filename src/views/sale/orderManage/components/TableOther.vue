<script setup lang="ts">
import { reactive } from 'vue'
import { OtherFee as columns } from '@/config/orderTable'

const state = reactive({
  tableData: [{}],
  total: 0,
})

</script>

<template>
  <TableBase
    :data="tableData"
    :columns="columns"
  />
</template>

<style scoped></style>
