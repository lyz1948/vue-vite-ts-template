<script setup lang="ts">
import { reactive, toRefs } from 'vue'

import { searchWithdrawState as searchState } from '../params'

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
    <FormItemBase label="提现人姓名">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="提现人电话">
      <InputBase
        v-model="params.phone"
      />
    </FormItemBase>

    <FormItemBase label="申请时间">
      <DateBase
        v-model="params.create"
      />
    </FormItemBase>

    <FormItemBase label="处理状态">
      <SelectBase
        v-model="params.handleStatus"
        type="handle"
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
