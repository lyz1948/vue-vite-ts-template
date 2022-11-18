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
    <div class="mod-head-wrap">
      <div class="title">
        {{ props.title }}
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mod-head {
  background: #fff;
  padding: 0 20px;
  .mod-head-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 0 12px;
    border-bottom: 1px solid $base-border-color;
  }
  .title {
    color: $title-color;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
