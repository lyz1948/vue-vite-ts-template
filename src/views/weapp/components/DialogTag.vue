<script setup lang="ts">
import { TagOrType } from '@/enums'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { computed, ref } from 'vue'

const title = '关联产品'
const store = useStore()
const visibleDialog = ref(false)
const checkList = ref([])
const productId = ref('')

const tagData = computed(() => {
  return store.state.product.productTagList
})

const show = ({ id, tags }) => {
  visibleDialog.value = true
  productId.value = id

  if (tags && tags.length) {
    checkList.value = tags.map(it => it.id)
  }
}

const hide = () => {
  visibleDialog.value = false
  checkList.value = []
}

const handleConfirm = () => {
  console.log(checkList.value)

  const tagList = checkList.value.map(id => {
    return { productId: productId.value, tid: id, type: TagOrType.TAG }
  })
  const data = {
    paras: tagList,
    type: TagOrType.TAG,
  }
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_RELATIVE_TAG, data).then(() => {
    hide()
  })
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    width="500px"
    @on:visible="visibleDialog = $event"
    @on:confirm="handleConfirm"
    @on:cancel="hide"
  >
    <el-checkbox-group v-model="checkList">
      <template v-for="(item, index) in tagData" :key="index">
        <el-checkbox :label="item.id">
          {{ item.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </DialogBase>
</template>

<style lang="scss">
.el-checkbox {
  width: 120px;
}
</style>
