<script setup lang="ts">
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { useI18n } from 'vue-i18n'

defineProps({
  color: {
    type: String,
    required: true,
  },
})

const store = useStore()
const { t } = useI18n()

const showSetting = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'setting',
    val: true,
  })
}
</script>

<template>
  <el-link>
    <icon-setting
      class="setting"
      :title="t('settings.title')"
      theme="outline"
      size="16"
      :stroke-width="4"
      :fill="color"
      @click="showSetting"
    />
  </el-link>
</template>
