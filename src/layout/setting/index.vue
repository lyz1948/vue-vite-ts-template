<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { ISelectItem } from '@/types'
import { modeOpts } from '@/config/setting'
import ThemeColor from './ThemeColor.vue'
import { useI18n } from 'vue-i18n'

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
  fixHead: store.state.setting.fixHead,
  fixTagView: store.state.setting.fixTagView,
  visibleSetting: store.state.setting.visibleSetting,
})
const visible = ref(false)
const modeVal = ref(store.state.setting.menuMode)

const getFixHeadVal = computed(() => {
  return state.fixHead
})

const getFixTagVal = computed(() => {
  return state.fixTagView
})

const settingStatus = computed(() => {
  return store.state.setting.visibleSetting
})

const handleClose = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'setting',
    val: false,
  })
}

const changFixHead = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'fixHead',
    val,
  })
}

const changeTagView = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'fixTagView',
    val,
  })
}

const changeMenuMode = ({ value }: ISelectItem) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'menuMode',
    val: value,
  })
}

const changeTheme = (val: string) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'theme',
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
        <!-- <SelectMode /> -->
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.theme') }}</span>
        <ThemeColor @on:change="changeTheme" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.fixHead') }}</span>
        <el-switch v-model="getFixHeadVal" @change="changFixHead" />
      </div>
      <div class="setting-item">
        <span class="label">{{ t('settings.fixTabView') }}</span>
        <el-switch v-model="getFixTagVal" @change="changeTagView" />
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
