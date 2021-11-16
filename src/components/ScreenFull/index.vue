<script setup lang="ts">
import { computed } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { SettingActionTypes } from '@/store/modules/setting/action-types'

const props = defineProps({
  icon: {
    type: String,
    default: 'full-screen-one',
  },
  color: {
    type: String,
    default: '#666',
  },
})

const handleScreenFull = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('糟糕，无法全屏！')
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
        title="fullscreen"
        theme="outline"
        size="16"
        :strokeWidth="4"
        :is="icon"
      />
    </el-link>
  </div>
</template>
