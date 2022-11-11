<script setup lang="ts">
import screenfull from 'screenfull'
import useElement from '@/utils/useElement'
import { useI18n } from 'vue-i18n'

defineProps({
  icon: {
    type: String,
    default: 'icon-full-screen-one',
  },
  color: {
    type: String,
    default: '#666',
  },
})

const { t } = useI18n()
const { warning } = useElement()
const handleScreenFull = () => {
  if (!screenfull.isEnabled) {
    warning('糟糕，无法全屏！')
    return false
  } else {
    screenfull.toggle()
  }
}
</script>

<template>
  <div class="screen-full" @click="handleScreenFull">
    <el-link>
      <component
        :is="icon"
        :title="t('settings.fullscreen')"
        theme="outline"
        size="16"
        :stroke-width="4"
      />
    </el-link>
  </div>
</template>
