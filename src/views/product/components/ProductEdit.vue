<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
// import { Editor } from '@tinymce/tinymce-vue'
import TinymceEditor from '@tinymce/tinymce-vue'
import ModTitle from '@/components/Title/index.vue'

const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const state = reactive({
  tinymceContent: '',
})

const initOptions = ref({
  selector: `#${props.id}`,
  height: 500,
  // plugins: [
  //   'advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount',
  // ],
  toolbar: [
    'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample help',
    'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullpage fullscreen',
  ],
  language: 'zh_CN',
  // eslint-disable-next-line @typescript-eslint/camelcase
  end_container_on_empty_block: true,
  // eslint-disable-next-line @typescript-eslint/camelcase
  powerpaste_word_import: 'clean',
  // eslint-disable-next-line @typescript-eslint/camelcase
  code_dialog_height: 450,
  // eslint-disable-next-line @typescript-eslint/camelcase
  code_dialog_width: 1000,
  // eslint-disable-next-line @typescript-eslint/camelcase
  advlist_bullet_styles: 'square',
  // eslint-disable-next-line @typescript-eslint/camelcase
  advlist_number_styles: 'default',
  // eslint-disable-next-line @typescript-eslint/camelcase
  imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
  // eslint-disable-next-line @typescript-eslint/camelcase
  default_link_target: '_blank',
  // eslint-disable-next-line @typescript-eslint/camelcase
  link_title: false,
  // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
  // eslint-disable-next-line @typescript-eslint/camelcase
  nonbreaking_force_tab: true,
  // eslint-disable-next-line @typescript-eslint/camelcase
  convert_urls: false,
})

const { tinymceContent } = toRefs(state)
</script>

<template>
  <div class="product-editor">
    <ModTitle :title="props.title" />

    <div class="content">
      <div class="container">
        <!-- 编辑详情 -->
        <TinymceEditor :id="defaultId()" v-model:value="tinymceContent" :init="initOptions" />
        <!-- 行程安排 -->
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
