<script setup lang="ts">
import { reactive, toRefs } from 'vue'

import {searchState} from '../params'

const emit = defineEmits(['on:search'])

const state = reactive({
  params: searchState() 
})

const { params } = toRefs(state)

const handleSearch = () => {
  
  emit('on:search', state.params)
}

const handleReset = () => {
  state.params = searchState()
  handleSearch()
}

</script>

<template>
  <FormBase :inline="true">
    <FormItemBase label="订单状态">
      <SelectBase
        v-model="params.name"
        type="sale"
      />
    </FormItemBase>
    <FormItemBase label="客户">
      <SelectBase
        v-model="params.name"
        type="sale"
      />
    </FormItemBase>
    <FormItemBase label="部门">
      <SelectBase
        v-model="params.name"
        type="sale"
      />
    </FormItemBase>
    <FormItemBase label="业务员">
      <SelectBase
        v-model="params.name"
        type="sale"
      />
    </FormItemBase>
    <FormItemBase label="订单来源">
      <SelectBase
        v-model="params.name"
        type="orderSource"
      />
    </FormItemBase>
    <FormItemBase label="线路产品">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="产品天数">
      <InputNumBase
        v-model="params.days"
      />
    </FormItemBase>
    <FormItemBase label="发团日期">
      <DateBase
        v-model="params.create"
      />
    </FormItemBase>
    <FormItemBase label="供应商">
      <InputNumBase
        v-model="params.create"
      />
    </FormItemBase>
    <FormItemBase label="出发城市">
      <InputBase
        v-model="params.city"
      />
    </FormItemBase>
      
    <FormItemBase>
      <BtnBase type="success" @click="handleSearch">
        搜索
      </BtnBase>
      <BtnBase type="danger" @click="handleReset">
        重置
      </BtnBase>
    </FormItemBase>
  </FormBase>
</template>

<style scoped></style>
