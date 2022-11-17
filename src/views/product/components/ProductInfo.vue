<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { formNewState, rules } from '../params'
import ModTitle from '@/components/Title/index.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  }
})

const state = reactive({
  form: formNewState(),
})

const { form } = toRefs(state)

</script>

<template>
  <div class="base-info">
    <ModTitle :title="props.title" />
    <FormBase :form="form" :rules="rules" inline>
      <FormItemBase prop="productName" label="线路产品">
        <InputBase v-model="form.productName" />
      </FormItemBase>

      <FormItemBase prop="days" label="行程天数">
        <InputNumBase v-model="form.days" />
      </FormItemBase>

      <FormItemBase prop="" label="产品分类">
        <InputNumBase v-model="form.days" />
      </FormItemBase>

      <FormItemBase prop="" label="产品来源">
        <InputNumBase v-model="form.days" />
      </FormItemBase>

      <FormItemBase prop="" label="产品标签">
        <InputNumBase v-model="form.days" />
      </FormItemBase>

      <FormItemBase prop="" label="出发地">
        <InputNumBase v-model="form.days" />
      </FormItemBase>

      <FormItemBase prop="" label="目的地">
        <InputNumBase v-model="form.days" />
      </FormItemBase>
    </FormBase>
  </div>
</template>

<style lang="scss">
.base-info {
  // margin-top: -20px;
}
</style>