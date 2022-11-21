<script setup lang="ts" >
import { TouristList as columns } from '@/config/saleTable'
import { ref } from 'vue';

const total = ref(0)
const tableData = ref([])

</script>


<template>
  <TableBase
    :data="tableData"
    :columns="columns"
    :total-count="total"
  >
    <template #isEnable="scope">
      <TagBase :name="scope.row.isEnable" />
    </template>

    <template>
      <BtnBase type="success">
        编辑
      </BtnBase>
      <BtnBase type="danger">
        删除
      </BtnBase>
    </template>
  </TableBase>
</template>

<style scoped></style>