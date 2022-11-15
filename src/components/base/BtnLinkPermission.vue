<script setup lang="ts" name="BtnLinkPermission">
import { computed } from 'vue'

const emit = defineEmits(['on:click'])
const props = defineProps({
  auth: {
    type: String,
    default: 'edit',
  },
})

const authMaps = {
  detail: '详情',
  edit: '编辑',
  delete: '删除',
  update: '更新',
  save: '保存',
  auth: '授权',
}

const getAuthLabel = computed(() => {
  return authMaps[props.auth]
})

const isDelete = computed(() => {
  return props.auth === 'delete'
})

const handleClick = () => {
  emit('on:click')
}
</script>

<template>
  <span class="btn-link-box">
    <el-link
      v-if="isDelete"
      v-permission="auth"
      v-bind="$attrs"
      @click="handleClick"
    >
      {{ getAuthLabel }}
    </el-link>
    
    <el-link 
      v-else
      v-permission="auth"
      v-bind="$attrs"
      @click="handleClick"
    >
      {{ getAuthLabel }}
    </el-link>
  </span>
</template>

<style lang="scss" scoped>
.btn-link-box {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
