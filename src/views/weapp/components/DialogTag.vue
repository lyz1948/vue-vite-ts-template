<script setup lang="ts">
import { ref } from "vue"

const title = '关联产品'
const visibleDialog = ref(false)
const checkList = ref([])
const checkListData = ref([
  { label: '国内游', value: '1' },
  { label: '国内国外游', value: '2' },
  { label: '国内游', value: '1' },
  { label: '国内国外游423', value: '2' },
  { label: '国内游432惹我', value: '1' },
  { label: '国内国外游', value: '2' },
  { label: '国内游认为群若群', value: '1' },
  { label: '国内国外游', value: '2' },
])

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
}

const handleConfirm = () => {
  visibleDialog.value = false
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
    @update:confirm="handleConfirm"
  >
    <el-checkbox-group v-model="checkList">
      <template v-for="(item, index) in checkListData" :key="index">
        <el-checkbox :label="item.label" />
      </template>
    </el-checkbox-group>
  </DialogBase>
</template>

<style lang="scss">
.el-checkbox {
  width: 120px;
}
</style>