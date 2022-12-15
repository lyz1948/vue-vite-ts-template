<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import ModTitle from '@/components/Title/index.vue'
import { getProductKeyVal } from '../help'

const store = useStore()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 10,
  },
})

const feeInclude = ref(getProductKeyVal('feeInclude'))

const handleChange = () => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, { feeInclude })
}
</script>
<template>
  <div class="textarea-container">
    <ModTitle :title="props.title" />
    <div class="content">
      <div class="container">
        <InputBase
          v-model="feeInclude"
          type="textarea"
          :rows="rows"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>
