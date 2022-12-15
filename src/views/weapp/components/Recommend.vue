<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { ProductList as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PageDefault } from '@/config'
import ModTitle from '@/components/Title/index.vue'
import Search from './Search.vue'

const store = useStore()
const emit = defineEmits(['on:edit'])

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

const fetchData = params => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  store.dispatch(UserActionTypes.ACTION_USER_DELETE, row.id)
}

const handleUpdate = (row: any) => {
  emit('on:edit', row)
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
  <div class="weapp-recommend">
    <ModTitle title="热门推荐设置" />
    <Search />
    <TableBase
      :data="getPageList"
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
        <BtnPermission type="success" auth="edit" @click="handleUpdate(scope.row)">
          编辑
        </BtnPermission>
        <BtnPermission type="danger" auth="delete" @click="handleDelete(scope.row)">
          删除
        </BtnPermission>
      </template>
    </TableBase>
  </div>
</template>

<style scoped></style>
