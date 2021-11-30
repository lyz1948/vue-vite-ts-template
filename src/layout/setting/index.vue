<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { ISelectItem } from '@/types'
import { MenuModeEnum, modeOpts } from '@/config/setting'
import { useI18n } from 'vue-i18n'
import ThemeColor from './ThemeColor.vue'

defineProps({
  direction: {
    type: String,
    default: 'rtl',
  },
})

const store = useStore()
const { t } = useI18n()
const modeOptList = ref(modeOpts)

const state = reactive({
  setting: store.state.setting.setting,
  fixedHead: store.state.setting.fixedHead,
  visibleTab: store.state.setting.visibleTab,
  visibleLogo: store.state.setting.visibleLogo,
})
const visible = ref(false)
const modeVal = ref(store.state.setting.menuMode)

const settingStatus = computed(() => {
  return store.state.setting.setting
})

const handleClose = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'setting',
    val: false,
  })
}

const changFixHead = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'fixedHead',
    val,
  })
}

const changeTagView = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'visibleTab',
    val,
  })
}

const changeMenuMode = ({ value }: ISelectItem) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'menuMode',
    val: value,
  })
  if (value === MenuModeEnum.HORIZONTAL) {
    store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
      type: 'visibleSidebar',
      val: true,
    })
  }
}

const changeTheme = (val: string) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'theme',
    val,
  })
}

const visibleLogo = (val: string) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'visibleLogo',
    val,
  })
}

watch(
  () => settingStatus.value,
  val => {
    visible.value = val
  },
  { immediate: true }
)
</script>

<template>
  <div class="setting">
    <el-drawer
      v-model="visible"
      :title="t('settings.title')"
      size="500px"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="setting-item">
        <span class="label">{{ t('settings.layout') }}</span>
        <SelectBase v-model:value="modeVal" :list="modeOptList" @on:select="changeMenuMode" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.theme') }}</span>
        <ThemeColor @on:change="changeTheme" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.logo') }}</span>
        <el-switch v-model="state.visibleLogo" @change="visibleLogo" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.fixedHead') }}</span>
        <el-switch v-model="state.fixedHead" @change="changFixHead" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.tab') }}</span>
        <el-switch v-model="state.visibleTab" @change="changeTagView" />
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.setting {
  &-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .label {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
      text-align: right;
    }
  }
  &-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>
