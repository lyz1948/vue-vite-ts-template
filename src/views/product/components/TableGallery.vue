<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ProductImage as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { PageDefault } from '@/config'

const store = useStore()
const emit = defineEmits(['on:edit'])

const state = reactive({
  tableData: [],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  return store.state.source.picList
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_DEL, row.id)
}

const handleUpdate = (row: any) => {
  emit('on:edit', row)
}
</script>

<template>
  <TableBase
    :data="tableData"
    :columns="columns"
    :total-count="state.total"
    @update:page="handlePage"
  >
    <template #isEnable="scope">
      <TagBase :name="scope.row.isEnable" />
    </template>

    <template #role="scope">
      <el-tag type="info">
        {{ scope.row.role === 'admin' ? '管理员' : '游客' }}
      </el-tag>
    </template>

    <template #action="scope">
      <BtnLinkPermission type="success" auth="edit" @click="handleUpdate(scope.row)">
        编辑
      </BtnLinkPermission>
      <BtnLinkPermission type="danger" auth="delete" @click="handleDelete(scope.row)">
        删除
      </BtnLinkPermission>
    </template>
  </TableBase>
</template>

<style scoped></style>
