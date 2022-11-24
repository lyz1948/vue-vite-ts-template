<script setup lang="ts" name="BtnLinkBase">

</script>

<template>
  <el-link v-bind="$attrs" class="link-base">
    <slot />
  </el-link>
</template>

<style>
.link-base +.link-base {
  margin-left: 10px;
}
</style>
