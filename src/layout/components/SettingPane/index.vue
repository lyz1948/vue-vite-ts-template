<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { MenuModeEnum, modeOpts } from '@/config/setting'
// import ThemeColor from './ThemeColor.vue'

defineProps({
  direction: {
    type: String,
    default: 'rtl',
  },
})

const store = useStore()
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

const changeMenuMode = (value: any) => {
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

// const changeTheme = (val: string) => {
//   store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
//     type: 'theme',
//     val,
//   })
// }

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
      title="设置"
      size="500px"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="setting-item">
        <span class="label">布局</span>
        <el-select v-model="modeVal" @change="changeMenuMode">
          <el-option
            v-for="item in modeOptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <SelectBase v-model="modeVal" type="layout" @on:select="changeMenuMode" /> -->
      </div>
      <!-- <div class="setting-item">
        <span class="label">皮肤</span>
        <ThemeColor @on:change="changeTheme" />
      </div> -->
      <div class="setting-item">
        <span class="label">Logo</span>
        <el-switch v-model="state.visibleLogo" @change="visibleLogo" />
      </div>
      <div class="setting-item">
        <span class="label">固定头部</span>
        <el-switch v-model="state.fixedHead" @change="changFixHead" />
      </div>
      <div class="setting-item">
        <span class="label">是否显示标签栏</span>
        <el-switch v-model="state.visibleTab" @change="changeTagView" />
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.setting {
  z-index: $base-z-index-max;
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    .label {
      display: inline-block;
      font-size: 13px;
      width: 100px;
      color: #72767b;
      text-align: center;
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
