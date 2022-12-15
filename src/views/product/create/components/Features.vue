<script setup>
import ModTitle from '@/components/Title/index.vue'
import { useStore } from '@/store'
import { ref } from 'vue'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'

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

const feature = ref('')

const handleChange = () => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, { feature })
}
</script>
<template>
  <div class="textarea-container">
    <ModTitle :title="props.title" />
    <div class="content">
      <div class="container">
        <InputBase
          v-model="feature"
          type="textarea"
          :rows="rows"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>
