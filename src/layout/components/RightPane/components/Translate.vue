<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'

defineProps({
  color: {
    type: String,
    required: true,
  },
})

const store = useStore()
const languages = reactive([
  {
    name: '简体中文',
    value: 'zh-cn',
  },
  {
    name: 'English',
    value: 'en',
  },
])

const handleCommand = async (command: any) => {
  await store.dispatch(SettingActionTypes.ACTION_LANGUAGE_SET, command)
  nextTick().then(() => {
    window.location.reload()
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-link type="primary" class="name">
      <icon-translate
        class="translate"
        title="语言切换"
        theme="outline"
        size="16"
        :stroke-width="4"
        :fill="color"
      />
    </el-link>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="lang in languages" :key="lang.name" :command="lang.value">
          {{ lang.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
