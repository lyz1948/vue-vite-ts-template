<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DialogBase',
})
</script>

<script setup lang="ts">
const emit = defineEmits(['update:visible', 'update:confirm'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  btnCancelText: {
    type: String,
    default: '取消',
  },
  btnConfirmText: {
    type: String,
    default: '确认',
  },
})

const handleClose = () => {
  emit('update:visible', false)
}

const handleConfirm = () => {
  emit('update:confirm', props.visible)
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
    v-bind="$attrs"
  >
    <slot />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ props.btnCancelText }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          props.btnConfirmText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
