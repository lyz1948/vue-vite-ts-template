<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { searchState } from '../params'

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

</script>

<template>
  <div class="container">
    <FormBase :inline="true">
      <FormItemBase label="图片类型">
        <InputBase
          v-model="params.name"
        />
      </FormItemBase>

      <FormItemBase>
        <BtnBase type="success" @click="handleSearch">
          搜索
        </BtnBase>
        <BtnBase type="primary" @click="handleAdd">
          新增
        </BtnBase>
      </FormItemBase>
    </FormBase>
  </div>
</template>

<style scoped></style>
