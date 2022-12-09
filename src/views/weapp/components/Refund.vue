<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'

const store = useStore()
const state = reactive({
  after: {
    advanceDay: 0,
    rate: '',
  },
  before: [],
  notArea: {
    advanceDay: -1,
    rate: '100',
  },
  list: []
})

const { after, notArea, before } = toRefs(state)

const getData = computed(() => {
  return store.state.app.mallRefund
})

const add = () => {
  state.before.push({ advanceDay: state.fee, day: 1 })
}

const minus = (index: number) => {
  state.before.splice(index, 1)
}

const handleSave = () => {
  store.dispatch(AppActionTypes.ACTION_MALL_REFUND_SET, [
    after.value,
    notArea.value,
    ...before.value,
  ])
}

const filterData = (data, fn) => {
  return data.filter(fn)
}

watch(() => getData.value, data => {
  if (!data) return
  state.after = filterData(data, it => it.advanceDay == 0)[0]
  state.notArea = filterData(data, it => it.advanceDay < 0)[0]
  state.before = filterData(data, (it) => it.advanceDay > 0)
})

</script>

<template>
  <div class="mod-wrap">
    <div class="mod-title">
      退改签规则
    </div>

    <div class="mod-body">
      <div class="field-row">
        <span>行程开始之后，按旅游费用</span>
        <InputNumBase v-model="after.rate" />
        <span class="mr5"> %退款</span>
        <el-button plain @click="add">
          <icon-plus title="plus" fill="#999" size="16" />
        </el-button>
      </div>
      <div v-for="(item, index) in before" :key="index" class="field-row">
        <span>行程开始前</span>
        <InputNumBase v-model="item.advanceDay" />日内， 按旅游费用 <InputNumBase v-model="item.rate" />
        <span class="mr5"> %退款</span>
        <el-button plain @click="minus(index)">
          <icon-minus title="minus" fill="#999" size="16" />
        </el-button>
      </div>

      <div class="field-row">
        <span>不在设置日期范围内，按旅游费用</span>
        <InputNumBase v-model="notArea.rate" />
        <span class="mr5"> %退款</span>
      </div>
    </div>

    <div class="mt20">
      <BtnBase type="success" @click="handleSave">
        确定
      </BtnBase>
    </div>
  </div>
</template>

<style></style>
