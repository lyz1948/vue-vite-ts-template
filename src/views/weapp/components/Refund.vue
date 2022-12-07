
<script setup lang="ts">
import { computed, reactive } from "vue";

const state = reactive({
  fee: 0,
  list: [],
})

const getList = computed(() => state.list)

const add = () => {
  state.list.push({ fee: state.fee, day: 1 })
}

const minus = (index: number) => {
  state.list.splice(index, 1)
}

</script>

<template>
  <div class="mod-wrap">
    <div class="mod-title">
      退改签规则
    </div>

    <div class="mod-body">
      <div class="field-row">
        <span>行程开始之后，按旅游费用</span>
        <InputNumBase v-model="state.fee" />
        <span class="mr5"> %退款</span>
        <el-button plain @click="add">
          <icon-plus title="plus" fill="#999" size="16" />
        </el-button>
      </div>
      <div v-for="(item, index) in getList" :key="index" class="field-row">
        <span>行程开始前</span>
        <InputNumBase v-model="item.day" />日内， 按旅游费用 <InputNumBase v-model="item.fee" />
        <span class="mr5"> %退款</span>
        <el-button plain @click="minus(index)">
          <icon-minus title="minus" fill="#999" size="16" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<style>

</style>