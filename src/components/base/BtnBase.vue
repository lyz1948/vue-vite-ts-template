
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnBase',
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { ElButton } from 'element-plus'

const defaultState = {
  search: {
    icon: 'el-icon-search',
    text: 'search',
    type: 'primary',
  },
  create: {
    icon: 'el-icon-plus',
    text: 'create',
    type: 'success',
  },
  save: {
    icon: 'el-icon-check',
    text: 'save',
    type: 'success',
  },
  close: {
    icon: 'el-icon-close',
    text: 'close',
    type: 'danger',
  },
  delete: {
    icon: 'el-icon-delete',
    text: 'delete',
    type: 'danger',
    plain: true,
  },
  reset: {
    icon: 'el-icon-switch-button',
    text: 'reset',
    type: 'primary',
  },
  export: {
    icon: 'el-icon-notbook',
    text: 'export',
    type: 'success',
  },
  back: {
    icon: '',
    text: 'back',
    type: 'primary',
  },
}

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'search',
  },
})
const { t } = useI18n()

const getName = computed(() => {
  return props.name || defaultState[props.type].text
})

const getPlain = computed(() => {
  return defaultState[props.type].plain
})

const getType = computed(() => {
  return defaultState[props.type].type
})

const getIcon = computed(() => {
  return defaultState[props.type].icon
})
</script>

<template>
  <el-button :type="getType" :icon="getIcon" :plain="getPlain">
    {{ t('btn.' + getName) }}
  </el-button>
</template>
