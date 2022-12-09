<script setup>
import ModTitle from '@/components/Title/index.vue';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div>
    <ModTitle :title="props.title" />
    <div class="content">
      <div class="img-list" />
      <div class="container">
        <BtnBase>上传图片</BtnBase>
        <BtnBase>选择图库</BtnBase>
      </div>
    </div>
  </div>
</template>