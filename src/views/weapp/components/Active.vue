<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'

const store = useStore()
const haggle = ref(0)
const merge = ref(0)

const mallConfig = computed(() => {
  return store.state.app.mallConfig
})

const handleSave = () => {
  store.dispatch(AppActionTypes.ACTION_MALL_ACTIVE_SET, {
    mallHaggleTime: haggle.value || 0,
    mallInGroupTime: merge.value || 0,
  })
}

watch(() => mallConfig.value, data => {
  console.log('data:', data)
  if (!data) return
  haggle.value = data.mallHaggleTime
  merge.value = data.mallInGroupTime
})
</script>

<template>
  <div class="mod-wrap">
    <div class="mod-title">
      活动时效设置
    </div>

    <div class="mod-body">
      <div class="mt20">
        <strong>拼团有效时长设置</strong>
        <div class="field-row">
          <span>拼团发起有效时长为：</span>
          <InputNumBase v-model="merge" /> 小时
        </div>
      </div>
      <div class="mt20">
        <strong>砍价有效时长设置</strong>
        <div class="field-row">
          <span>砍价发起有效时长为：</span>
          <InputNumBase v-model="haggle" /> 小时
        </div>
      </div>
    </div>

    <div class="mt20">
      <BtnBase type="success" @click="handleSave">
        确定
      </BtnBase>
    </div>
  </div>
</template>

<style>

</style>