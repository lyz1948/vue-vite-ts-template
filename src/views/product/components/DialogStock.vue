<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { SalePrice as columns } from '@/config/saleTable'

const title = '设置库存'
const visibleDialog = ref(false)

const generateWeek = () => {
  return Array.from({ length: 7 })
    .fill(0)
    .map((v, i) => '星期' + (i + 1))
}

const state = reactive({
  loading: false,
  isUpdate: false,
  checkAll: false,
  isIndeterminate: true,
  date: '',
  form: {
    count: 7,
    max: 100,
    date: '',
    time: '',
    cleanDay: '',
    cleanTime: '',
    enable: true,
  },
  tableData: [{ type: '成人价' }],
  checkList: [],
  checkBoxList: generateWeek(),
})

const { checkAll, isIndeterminate, tableData, date, form, checkList, checkBoxList } = toRefs(state)

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
}

const handleCheckAllChange = (val: boolean) => {
  state.checkedCities = val ? state.checkBoxList : []
  state.isIndeterminate = false
}
const handleChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === state.checkBoxList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < state.checkBoxList.length
}

const handleConfirm = () => {
  //
  hide()
}

defineExpose({
  show,
  hide,
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
        <DateBase v-model="date" />
      </div>

      <div class="field-row">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
          每天
        </el-checkbox>

        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in checkBoxList"
            :key="item"
            :label="item"
            @click="handleChange"
          />
        </el-checkbox-group>
      </div>

      <div class="flex container">
        <strong>每日计划人数：</strong>
        <el-input-number v-model="form.count" controls-position="right" />
        <span class="mr5" />
        <el-checkbox>可超售</el-checkbox>
      </div>

      <TableBase :columns="columns" :data="tableData" :show-footer="false">
        <template #adult="{ row }">
          <InputBase v-model="row.adule" />
        </template>
        <template #children="{ row }">
          <InputBase v-model="row.children" />
        </template>
        <template #room="{ row }">
          <InputBase v-model="row.room" />
        </template>
      </TableBase>

      <div class="mt20">
        <div class="field-row">
          <strong class="mr5">报名截止时间：提前</strong>
          <el-input-number v-model="form.day" controls-position="right" />
          <span class="mr5" />
          <span class="mr5">天，并且于 </span>
          <el-time-picker v-model="form.time" placeholder="时间选择" />
          <span>点停止报名</span>
        </div>
        <div class="field-row">
          <strong class="mr5">自动清位时间：提前</strong>
          <el-input-number v-model="form.cleanDay" controls-position="right" />
          <span class="mr5" />
          <span class="mr5">天，并且于 </span>
          <el-time-picker v-model="form.cleanTime" placeholder="时间选择" />
          <span>点清位时间</span>
        </div>
        <div class="field-row">
          <strong class="mr5">销售状态</strong>
          <el-switch v-model="form.enable" />
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
