<script setup lang="ts">
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { ProductStock as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PageDefault } from '@/config'
import { PriceLabelEnum } from '@/enums/priceEnum'

const store = useStore()
const emit = defineEmits(['on:edit'])

const state = reactive({
  tableData: [],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  return store.state.product.productStockList
})

const getPageList = computed(() => {
  return state.tableData.slice((state.pageNum - 1) * state.pageSize, state.pageNum * state.pageSize)
})

const getType = computed(() => {
  return type => PriceLabelEnum[type]
})

const getEndDate = computed(() => {
  return row => {
    const diff = row.endDate - (86400000 * row.signUpAdvanceDays) || 1
    return diff
  }
})

const fetchData = params => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

// const handleDelete = (row: any) => {
//   store.dispatch(UserActionTypes.ACTION_USER_DELETE, row.id)
// }

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
  <TableBase
    :data="getPageList"
    :columns="columns"
    :total-count="state.total"
    @update:page="handlePage"
  >
    <template #date="{row}">
      {{ row.startDate }} ~ {{ row.endDate }}
    </template>

    <template #adult="{row}">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.adultPrice }}
      </div>
    </template>

    <template #child="{row}">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.childPrice }}
      </div>
    </template>

    <template #room="{row}">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.roomDifference }}
      </div>
    </template>

    <template #enterEnd="{row}">
      {{ getEndDate(row) }}
    </template>

    <template #clearDate="{row}">
      {{ row.clearDays }} {{ row.clearHour }}
    </template>

    <template #action="scope">
      <BtnPermission type="success" auth="edit" @click="handleUpdate(scope.row)">
        编辑
      </BtnPermission>
      <!-- <BtnPermission type="danger" auth="delete" @click="handleDelete(scope.row)">
        删除
      </BtnPermission> -->
    </template>
  </TableBase>
</template>

<style scoped></style>
