<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnLinkBase',
})
</script>

<script setup lang="ts">

</script>

<template>
  <el-link v-bind="$attrs">
    <slot />
  </el-link>
</template>
