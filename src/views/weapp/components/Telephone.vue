
<script setup lang="ts">
import { reactive } from "vue";


const state = reactive({
  list: [
    { type: 1, phone: '' }
  ],
})

const add = () => {
  state.list.push({ type: '2', phone: '' })
}

const minus = (index: number) => {
  state.list.splice(index, 1)
}
</script>

<template>
  <div class="mod-wrap telephone">
    <div class="mod-title">
      电话设置
    </div>

    <div class="mod-body">
      <div v-for="(item, index) in state.list" :key="index" class="field-row">
        <span>电话号码：</span>
        <SelectBase v-model="item.type" type="telType" />
        <InputBase v-model="item.phone" />

        <el-button plain @click="minus(index)">
          <icon-minus title="minus" fill="#999" size="16" />
        </el-button>
        <el-button plain @click="add">
          <icon-plus title="plus" fill="#999" size="16" />
        </el-button>
      </div>
    </div>

    <div class="mod-foot mt20">
      <strong>电话格式：</strong>
      <p>
        座机电话格式：区号+号码+分机号；（无分机号不用加分机号）
      </p>
      <p>
        手机号码格式：11位手机号码；
      </p>
      <p>
        400十位号码格式：400+7位号码
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.telephone {
  .input-base {
    flex: 0 0 200px;
  }
}
</style>