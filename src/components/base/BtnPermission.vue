<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnPermission',
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { IPermission } from '@/types/auth'

const props = defineProps({
  auth: {
    type: String as IPermission,
    default: 'create',
  },
  type: {
    type: String,
    default: 'create',
  },
})

const getAuthLabel = computed(() => {
  return authMaps[props.auth]
})
</script>

<template>
  <BtnBase v-permission="auth" :type="type" />
</template>

<style lang="scss" scoped>
.btn-link-box {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
