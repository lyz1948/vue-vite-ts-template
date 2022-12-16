<script setup lang="ts">
import { computed } from 'vue';
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { useStore } from '@/store'
import ModTitle from '@/components/Title/index.vue'
import UploadItem from './UploadItem.vue'

const store = useStore()

type Picid = {
  picId: number
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const getProductItem = computed(() => store.state.product.productItem)

const images = computed(() => {
  if (!getProductItem.value) return
  return getProductItem.value['bannerPics']
})

const handleChange = (pics: Picid[]) => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, { bannerPics: pics })
}

const handleDelete = val => {
  console.log('val:', val)
  const current: Array<any> = getProductItem.value['bannerPics']
  const pics = current.filter(path => path !== val)
  store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, { bannerPics: pics })
}
</script>

<template>
  <div>
    <ModTitle :title="props.title" />
    <UploadItem :list="images" @on:change="handleChange" @on:delete="handleDelete" />
  </div>
</template>
