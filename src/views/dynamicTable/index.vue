<script setup lang="ts">
import { computed, onBeforeMount, watch, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { RoleColumn } from '@/config/table'
import FormDialog from './FormDialog.vue'

const TABLE_TITLE = '添加员工'
const store = useStore()
const router = useRouter()
const dialogRef = ref(null)
const searchVal = ref('')
const state = reactive({
  tableData: [],
  total: 0,
})
const searchParam = reactive({
  realName: '',
  userName: '',
  department: '', // 部门
  subDepartment: '', // 子部门
  grandsonDepartment: '', // 二级部门
})

const fetchData = (params: object = {}) => {}

const deleteRow = (id: number) => {
  console.log(id)
}

const handlePage = page => {
  console.log('pageNum, pageSize:', page)
}

const changeVal = val => {
  searchVal.value = val
}

const handleCreate = () => {
  dialogRef.value.show()
}

const handleUpdate = (row: any) => {
  dialogRef.value.edit(row)
}

const handleAuth = (row: any) => {
  console.log('row.id:', row.id)
}

const handleDelete = (row: any) => {
  const { id } = row
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <div>
    <FormDialog ref="dialogRef" />
    <TableBase
      :data="state.tableData"
      :columns="RoleColumn"
      :totalCount="state.total"
      @update:page="handlePage"
    >
      <template #title>
        <h3>{{ TABLE_TITLE }}</h3>
      </template>

      <template #headerHandler>
        <FormBase :inline="true">
          <FormItemBase label="姓名">
            <InputBase
              :value="searchVal"
              tip="搜索：角色名称"
              @change="changeVal"
            />
          </FormItemBase>
          <FormItemBase label="账号">
            <InputBase
              :value="searchVal"
              tip="搜索：账号"
              @change="changeVal"
            />
          </FormItemBase>
        </FormBase>
        <BtnBase type="search" />
        <BtnPermission @click="handleCreate" />
      </template>

      <template #isEnable="scope">
        <TagBase :name="scope.row.isEnable" />
      </template>

      <template #action="scope">
        <BtnLinkPermission auth="edit" @on:click="handleUpdate(scope.row)" />
        <BtnLinkPermission auth="delete" @on:click="handleDelete(scope.row)" />
      </template>
    </TableBase>
  </div>
</template>

<style scoped></style>
