<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { RoleColumn } from '@/config/table'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PageDefault } from '@/config'
import DialogEdit from './components/DialogEdit.vue'
import Search from './components/Search.vue'

const TABLE_TITLE = '添加员工'
const store = useStore()
const dialogRef = ref(null)
const searchVal = ref('')

const state = reactive({
  tableData: [],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  return store.state.user.userList
})

const getPageList = computed(() => {
  return state.tableData.slice((state.pageNum - 1) * state.pageSize, state.pageNum * state.pageSize)
})

const fetchData = (params) => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
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

const handleDelete = (row: any) => {
  store.dispatch(UserActionTypes.ACTION_USER_DELETE, row.id)
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
    <DialogEdit ref="dialogRef" />
    <Search @on:search="fetchData" />

    <TableBase
      :data="getPageList"
      :columns="RoleColumn"
      :total-count="state.total"
      @update:page="handlePage"
    >
      <template #title>
        <h3>{{ TABLE_TITLE }}</h3>
      </template>

      <template #search>
        <FormBase :inline="true">
          <FormItemBase label="姓名">
            <InputBase
              :value="searchVal"
              tip="搜索：角色名称"
              @change="changeVal"
            />
          </FormItemBase>
          <FormItemBase>
            <BtnBase type="primary" size="default">
              搜索
            </BtnBase>
            <BtnPermission type="success" @click="handleCreate">
              创建
            </BtnPermission>
          </FormItemBase>
        </FormBase>
      </template>

      <template #isEnable="scope">
        <TagBase :name="scope.row.isEnable" />
      </template>

      <template #role="scope">
        <el-tag type="info">
          {{ scope.row.role === 'admin' ? '管理员' : '游客' }}
        </el-tag>
      </template>

      <template #action="scope">
        <BtnLinkPermission type="success" auth="edit" @on:click="handleUpdate(scope.row)">
          编辑
        </BtnLinkPermission>
        <BtnLinkPermission type="danger" auth="delete" @on:click="handleDelete(scope.row)">
          删除
        </BtnLinkPermission>
      </template>
    </TableBase>
  </div>
</template>

<style scoped></style>
