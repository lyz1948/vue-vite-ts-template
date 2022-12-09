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
    <FormItemBase label="产品分类">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="上架状态">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="创建时间">
      <DateBase
        v-model="params.create"
      />
    </FormItemBase>
    <FormItemBase label="出发城市">
      <InputBase
        v-model="params.city"
      />
    </FormItemBase>
    <FormItemBase label="到达城市">
      <InputBase
        v-model="params.target"
      />
    </FormItemBase>
    <FormItemBase label="创建人">
      <InputBase
        v-model="params.creater"
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
