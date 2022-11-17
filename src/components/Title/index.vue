<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="mod-head">
    <div class="title">
      {{ props.title }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.mod-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $base-border-color;
  height: 60px;
  line-height: 60px;
  background: #fff;
  padding: 0 20px;

  .title {
    margin: 20px 0;
  }
}
</style>
