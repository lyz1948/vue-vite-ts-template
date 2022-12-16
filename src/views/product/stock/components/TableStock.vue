<script setup lang="ts">
import { computed, onBeforeMount, reactive, watch, nextTick } from 'vue'
import { ProductStock as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PageDefault } from '@/config'
import { PriceLabelEnum } from '@/enums/priceEnum'
import { getMonthCount, getFirstDayWeek } from '@/utils/datetime'
import { WeekLabelEnum } from '@/enums/dateEnum'

const generateDate = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const firstDay = getFirstDayWeek(year, month)

  return Array.from({ length: getMonthCount() }).map((_, i) => {
    const week = Object.values(WeekLabelEnum)[(i + (firstDay - 1)) % 7]
    const index = (i + 1).toString().padStart(2, '0')
    const date = `${year}-${month}-${index}`
    return { date, week, index }
  })
}

const store = useStore()
const emit = defineEmits(['on:edit'])

const state = reactive({
  tableData: generateDate(),
  dateObj: {},
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const productStockList = computed(() => {
  return store.state.product.productStockList
})

const getType = computed(() => {
  return type => PriceLabelEnum[type]
})


const fetchData = params => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const handleUpdate = (row: any) => {
  emit('on:edit', row)
}

const formatPlanDate = data => {
  if (!data.planDateList || !data.planDateList.length) return
  state.dateObj = data.planDateList.reduce((acc, cur) => {
    return { ...acc, [cur]: data }
  }, state.dateObj)
}

onBeforeMount(() => {
  fetchData()
})

watch(
  () => productStockList.value,
  data => {
    state.tableData = generateDate()
    if (!data || !data.length) return

    data.forEach(it => {
      it.planDateList !== '' && formatPlanDate(it)
    })

    state.tableData = state.tableData.map(it => {
      if (state.dateObj[it.date]) {
        return { ...it, ...state.dateObj[it.date], hasStock: true }
      }
      return it
    })
  }
)
</script>

<template>
  <TableBase :data="state.tableData" :columns="columns" :show-footer="false">
    <template #date="{ row }">
      <div>{{ row.index }} | {{ row.week }}</div>
      <!-- <div>{{ row.startDate }}</div>
      <div>{{ row.endDate }}</div> -->
    </template>

    <template #adult="{ row }">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.adultPrice }}
      </div>
    </template>

    <template #child="{ row }">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.childPrice }}
      </div>
    </template>

    <template #room="{ row }">
      <div v-for="item in row.prices" :key="item.id">
        {{ getType(item.type) }} {{ item.roomDifference }}
      </div>
    </template>

    <template #enterEnd="{ row }">
      <span v-if="row.hasStock">
        提前 {{ row.signUpAdvanceDays }} 天 {{ row.signUpAdvanceHours }}
      </span>
    </template>

    <template #clearDate="{ row }">
      <span v-if="row.hasStock">
        提前 {{ row.clearDays }} 天 {{ row.clearHours }}
      </span>
    </template>

    <template #isExceed="{ row }">
      <span v-if="row.hasStock" :class="row.isExceed ? 'green' : 'red'">{{ row.isExceed ? '可超售' : '不可超售' }}</span>
    </template>

    <template #saleStatus="{ row }">
      <span v-if="row.hasStock" :class="row.saleStatus ? 'green' : 'red'">{{ row.saleStatus ? '在售' : '已停售' }}</span>
    </template>

    <template #action="{ row }">
      <BtnPermission
        v-if="row.hasStock"
        type="success"
        auth="edit"
        @click="handleUpdate(scope.row)"
      >
        编辑
      </BtnPermission>
      <!-- <BtnPermission type="danger" auth="delete" @click="handleDelete(scope.row)">
        删除
      </BtnPermission> -->
    </template>
  </TableBase>
</template>

<style scoped></style>
