<script setup lang="ts" name="DialogBase">
const emit = defineEmits(['on:visible', 'on:confirm', 'on:cancel'])
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
  emit('on:visible', false)
  emit('on:cancel')
}

const handleConfirm = () => {
  emit('on:confirm', props.visible)
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
