<script setup lang="ts" name="BtnBase">

</script>

<template>
  <el-button
    v-bind="$attrs"
  >
    <slot />
  </el-button>
</template>
