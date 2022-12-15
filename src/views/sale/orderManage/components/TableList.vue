<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { SaleOrderManage as columns } from '@/config/saleTable'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PageDefault } from '@/config'
import { useRouter } from 'vue-router'

const TABLE_TITLE = '订单管理'
const store = useStore()
const emit = defineEmits(['on:edit'])
const router = useRouter()

const state = reactive({
  tableData: [{

  }],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  // return store.state.user.userList
  return state.tableData
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
  // emit('on:edit', row)
  router.push('')
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
  <TableBase
    :data="getPageList"
    :columns="columns"
    :total-count="state.total"
    @update:page="handlePage"
  >
    <template #info="{ row }">
      <el-tag type="info">
        订单编号 {{ row.orderNumber }}
        {{ row.orderDate }}
      </el-tag>
    </template>

    <template #detail="{ row }">
      <div>标题{{ row }}</div>
      <div>
        <span>2022-12-11 ~ 2022-12-11</span>
        <span>成都 出发</span>
        <span>4天</span>
      </div>
      <div>
        <el-tag type="info">
          小程序
        </el-tag>
      </div>
      <div>
        <div>
          <span>微信支付</span>
          <span class="price red">￥1800</span>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              支付超时
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>
                  Action 4
                </el-dropdown-item>
                <el-dropdown-item divided>
                  Action 5
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>

    <template #delivery="{ row }">
      <el-button-group>
        <el-button type="primary">
          记账{{ row }}
        </el-button>
        <el-button type="primary">
          交客
        </el-button>
      </el-button-group>
    </template>

    <template #action="{ row }">
      <BtnPermission type="success" auth="edit" @click="handleUpdate(row)">
        编辑
      </BtnPermission>
      <BtnPermission type="danger" auth="delete" @click="handleDelete(row)">
        删除
      </BtnPermission>
    </template>
  </TableBase>
</template>

<style scoped></style>
