<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import SelectMode from './SelectMode.vue'
import ThemeColor from './ThemeColor.vue'
import { ISelectItem } from '@/types'

defineProps({
  direction: {
    type: String,
    default: 'rtl',
  },
})

const store = useStore()
const state = reactive({
  fixHeadVal: '',
  fixTagVal: '',
})
const visible = ref(false)

const getFixHeadVal = computed(() => {
  return store.state.setting.fixHead
})

const getFixTagVal = computed(() => {
  return store.state.setting.fixTagView
})

const settingStatus = computed(() => {
  return store.state.setting.visibleSetting
})

const handleClose = () => {
  store.dispatch(SettingActionTypes.ACTION_TOGGLE_SETTING, false)
}

const changFixHead = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_FIX_HEADER, val)
}

const changeTagView = (val: boolean) => {
  store.dispatch(SettingActionTypes.ACTION_FIX_TAGVIEW, val)
}

const changeMenuMode = (item: ISelectItem) => {
  console.log('item.value:', item.value)
  store.dispatch(SettingActionTypes.ACTION_MENU_MODE, item.value)
}

watch(
  () => settingStatus.value,
  (val) => {
    visible.value = val
  },
  { immediate: true }
)
</script>

<template>
  <div class="setting">
    <el-drawer
      v-model="visible"
      title="System Setting"
      size="500px"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="setting-item">
        <span class="label">Menu Mode</span>
        <SelectMode @on:select="changeMenuMode" />
      </div>
      <div class="setting-item">
        <span class="label">Site Theme</span>
        <ThemeColor />
      </div>
      <div class="setting-item">
        <span class="label">Fix Header</span>
        <el-switch v-model="getFixHeadVal" @change="changFixHead" />
      </div>
      <div class="setting-item">
        <span class="label">Fix TagView</span>
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
