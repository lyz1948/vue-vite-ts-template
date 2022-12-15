<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { searchState } from '../params'
import SelectStaff from '@/components/Select/SelectStaff.vue'
import SelectProductSource from '@/components/Select/SelectProductSource.vue';

const emit = defineEmits(['on:search', 'on:create'])
const router = useRouter()
const state = reactive({
  params: searchState() 
})

const { params } = toRefs(state)

const handleSearch = () => {
  
  emit('on:search', state.params)
}

const handleAdd = () => {
  router.push('/product/create')
}

const handleReset = () => {
  state.params = searchState()
  handleSearch()
}

</script>

<template>
  <FormBase :inline="true">
    <FormItemBase label="产品名称">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="产品编号">
      <InputBase
        v-model="params.code"
      />
    </FormItemBase>
    <FormItemBase label="产品线路">
      <SelectProductSource
        v-model="params.travelLineId"
      />
    </FormItemBase>
    <FormItemBase label="是否热卖">
      <SelectBase
        v-model="params.isHot"
      />
    </FormItemBase>
    <FormItemBase label="是否推荐">
      <SelectBase
        v-model="params.isRecommend"
      />
    </FormItemBase>
    <FormItemBase label="是否启用">
      <SelectBase
        v-model="params.isEnable"
      />
    </FormItemBase>
    <!-- <FormItemBase label="产品分类">
      <InputBase
        v-model="params.name"
      />
    </FormItemBase>
    <FormItemBase label="上架状态">
      <SelectBase
        v-model="params.name"
        type="wxSaleStatus"
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
      <SelectStaff
        v-model="params.creater"
      />
    </FormItemBase> -->

    <FormItemBase>
      <BtnBase type="success" @click="handleSearch">
        搜索
      </BtnBase>
      <BtnBase type="primary" @click="handleAdd">
        新增
      </BtnBase>
      <BtnBase type="danger" @click="handleReset">
        重置
      </BtnBase>
    </FormItemBase>
  </FormBase>
</template>

<style scoped></style>
