<script setup>
import ModTitle from '@/components/Title/index.vue';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 10,
  }
})
</script>

<template>
  <div class="textarea-container">
    <ModTitle :title="props.title" />
    <div class="content">
      <div class="container">
        <InputBase type="textarea" :rows="rows" />
      </div>
    </div>
  </div>
</template>
