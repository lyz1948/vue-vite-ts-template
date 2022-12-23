<!-- eslint-disable @typescript-eslint/camelcase -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import TinymceEditor from '@tinymce/tinymce-vue'
import toolbar from './toolbar'
// import plugins from './plugins'
import { App } from '@/config'

const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

const emit = defineEmits(['on:change'])
const props = defineProps({
  content: {
    type: String,
    default: '',
  }
})

const state = reactive({
  content: ref(props.content),
})

const initOptions = ref({
  selector: `#${defaultId()}`,
  height: 500,
  toolbar,
  language: 'zh_CN',
  end_container_on_empty_block: true,
  powerpaste_word_import: 'clean',
  code_dialog_height: 450,
  code_dialog_width: 1000,
  advlist_bullet_styles: 'square',
  advlist_number_styles: 'default',
  imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
  default_link_target: '_blank',
  link_title: false,
  nonbreaking_force_tab: true,
  convert_urls: false,
})

const handleChange = (val: string) => {
  console.log('val:', val)
  emit('on:change', val)
}

</script>

<template>
  <TinymceEditor
    :id="defaultId()"
    v-model="state.content"
    :api-key="App.tinymceKey"
    :init="initOptions"
    @change="handleChange"
  />
</template>

<style lang="scss"></style>
