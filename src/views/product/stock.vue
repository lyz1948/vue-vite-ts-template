<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'

import TableStock from './components/TableStock.vue'
import DialogStock from './components/DialogStock.vue'

const store = useStore()
const dialogRef = ref(null)

const state = reactive({
  tableData: [],
  total: 0,
  curPriceMode: 0,
})

const { curPriceMode } = toRefs(state)

const tableData = computed(() => {
  return store.state.user.userList
})

const fetchData = (params) => {
  store.dispatch(UserActionTypes.ACTION_USER_LIST, params)
}

const editItem = (item) => {
  dialogRef.value?.edit(item)
}

const showDialog = (item) => {
  dialogRef.value?.show(item)
}

const toggle = index => {
  state.curPriceMode = index
}

onBeforeMount(() => {
  fetchData()
})

watch(() => tableData.value, (data) => {
  if (!data || !data.length) return
  state.tableData = data
  state.total = data.length
})
</script>

<template>
  <div>
    <div class="product-info flex">
      <el-tag type="info">
        42141242242142
      </el-tag>
      <div class="title ml5">
        <h4>黄龙+九寨沟3天2晚纯玩精品</h4>
      </div>
    </div>
    <div class="search">
      <FormBase inline>
        <FormItemBase label="日期">
          <DateBase :shortcuts="false" type="month" />
        </FormItemBase>
        <FormItemBase>
          <BtnBase type="success" @click="showDialog">
            设置库存
          </BtnBase>
        </FormItemBase>
      </FormBase>
    </div>
    <div class="">
      <el-button-group>
        <el-button type="primary" :disabled="curPriceMode == 0" @click="toggle(0)">
          直客价
        </el-button>
        <el-button type="primary" :disabled="curPriceMode == 1" @click="toggle(1)">
          同行价
        </el-button>
      </el-button-group>
    </div>

    <TableStock @on:edit="editItem" />
    <DialogStock ref="dialogRef" />
  </div>
</template>

<style scoped></style>
