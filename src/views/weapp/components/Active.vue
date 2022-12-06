<script setup lang="ts">
import { ref } from 'vue'

const haggle = ref(0)
const merge = ref(0)

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
  </div>
</template>

<style>

</style>