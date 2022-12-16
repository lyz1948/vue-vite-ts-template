<script setup lang="ts">
import { reactive, toRefs } from 'vue'

import { searchState } from '../../params'

const emit = defineEmits(['on:search', 'on:create'])

const state = reactive({
  params: searchState() 
})

const { params } = toRefs(state)

const handleSearch = () => {
  
  emit('on:search', state.params)
}

const handleAdd = () => {
  emit('on:create')
}

const handleReset = () => {
  state.params = searchState()
  handleSearch()
}

</script>

<template>
  <FormBase :inline="true">
    <FormItemBase label="产品线路">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="产品编号">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>


    <FormItemBase>
      <BtnBase type="primary" @click="handleAdd">
        新增
      </BtnBase>
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
