<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import { SalePrice as columns } from '@/config/saleTable'
import { formState } from '../params'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { PriceEnum, PriceLabelEnum } from '@/enums/priceEnum'
// import { parseTime } from '@/utils/datetime'
import { DateEnum, WeekEnum, WeekLabelEnum } from '@/enums/dateEnum'

const emit = defineEmits(['on:reload'])
const store = useStore()
const title = '设置库存'
const visibleDialog = ref(false)

const generateWeek = () => {
  return Object.values(WeekEnum)
}

const generatePrice = () => {
  return Object.values(PriceEnum).slice(0, -1).map(val => ({ type: val }))
}

const state = reactive({
  loading: false,
  isUpdate: false,
  checkAll: false,
  isIndeterminate: true,
  productId: '',
  date: ['', ''],
  form: formState(),
  tableData: generatePrice(),
  checkList: [],
  checkBoxList: generateWeek(),
})

const { checkAll, isIndeterminate, tableData, date, form, checkList, checkBoxList } = toRefs(state)

const getTypeLabel = computed(() => {
  return (type) => PriceLabelEnum[type]
})

const processData = (data) => {
  const { prices, startDate, endDate } = data
  state.form = { ...data }
  state.tableData = prices

  state.checkAll = data.type === DateEnum.DAY
  state.isIndeterminate = !state.checkAll
  state.date = [startDate, endDate]
  state.checkList = data.weekPlanList
}

const show = (productId) => {
  state.form.productId = productId
  visibleDialog.value = true
}

const edit = (item: unknown) => {
  state.isUpdate = true

  processData(item)

  show()
}

const hide = () => {
  visibleDialog.value = false
}

const changeDate = (val: Arran<Date | string>) => {
  const [ start, end ] = val
  state.startDate = start
  state.endDate = end
}

const changeTime = (type, val) => {
  state.form[type] = val
}

const handleCheckAllChange = (val: boolean) => {
  state.checkList = val ? state.checkBoxList : []
  state.isIndeterminate = false
}
const handleChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === state.checkBoxList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < state.checkBoxList.length
}

const beforeCommit = () => {
  // 每天
  if (state.checkAll) {
    state.form.type = DateEnum.DAY
    state.form.weekPlanList = [DateEnum.DAY]
  } else {
    state.form.type = DateEnum.WEEK
    state.form.weekPlanList = state.checkList
  }
}

const handleConfirm = () => {
  beforeCommit()
  const [ startDate, endDate ] = state.date
  
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_STOCK_SET, [{ ...state.form, prices: state.tableData, startDate, endDate }]).then(() => {
    hide()
    emit('on:reload')
  })
}

defineExpose({
  show,
  hide,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    @on:visible="visibleDialog = $event"
    @on:confirm="handleConfirm"
  >
    <!-- <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="按天" name="day">
        User
      </el-tab-pane>
      <el-tab-pane label="按周" name="week">
        Config
      </el-tab-pane>
    </el-tabs> -->
    <div>
      <div class="field-row">
        <strong class="mr5">时间范围</strong>
        <DateBase v-model="date" @change="changeDate" />
      </div>

      <div class="field-row">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
          每天
        </el-checkbox>

        <el-checkbox-group v-model="checkList" @change="handleChange">
          <el-checkbox
            v-for="item in checkBoxList"
            :key="item"
            :label="item"
          >
            {{ WeekLabelEnum[item] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="flex container">
        <strong>每日计划人数：</strong>
        <el-input-number v-model="form.planCount" controls-position="right" />
        <span class="mr5" />
        <el-checkbox>可超售</el-checkbox>
      </div>

      <TableBase :columns="columns" :data="tableData" :show-footer="false">
        <template #type="{ row }">
          {{ getTypeLabel(row.type) }}
        </template>
        <template #adult="{ row }">
          <InputBase v-model="row.adultPrice" />
        </template>
        <template #children="{ row }">
          <InputBase v-model="row.childPrice" />
        </template>
        <template #room="{ row }">
          <InputBase v-model="row.roomDifference" />
        </template>
      </TableBase>

      <div class="mt20">
        <div class="field-row">
          <strong class="mr5">报名截止时间：提前</strong>
          <el-input-number v-model="form.signUpAdvanceDays" :min="1" controls-position="right" />
          <span class="mr5" />
          <span class="mr5">天，并且于 </span>
          <el-time-select
            v-model="form.signUpAdvanceHours"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="时间选择"
            @change="changeTime('signUpAdvanceHours', $event)"
          />
          <!-- <el-time-picker
            v-model="form.signUpAdvanceHours"
            placeholder="时间选择"
            @visible-change="changeTime('signUpAdvanceHours', $event)"
          /> -->
          <span>点停止报名</span>
        </div>
        <div class="field-row">
          <strong class="mr5">自动清位时间：提前</strong>
          <el-input-number v-model="form.clearDays" :min="0" controls-position="right" />
          <span class="mr5" />
          <span class="mr5">天，并且于 </span>
          <el-time-select
            v-model="form.clearHours"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="时间选择"
            @change="changeTime('clearHours', $event)"
          />
          <!-- <el-time-picker
            v-model="form.clearHours"
            placeholder="时间选择"
            @visible-change="changeTime('clearHours', $event)"
          /> -->
          <span>点清位时间</span>
        </div>
        <div class="field-row">
          <strong class="mr5">销售状态</strong>
          <el-switch v-model="form.saleStatus" />
        </div>
      </div>
    </div>
  </DialogBase>
</template>

<style lang="scss">
.field-row {
  margin-bottom: 10px;
  .input-base {
    flex: 0 0 120px !important;
  }
}
</style>
