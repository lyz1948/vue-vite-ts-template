<script setup lang="ts">
import { reactive, toRefs, computed, watch } from 'vue'
// import { Editor } from '@tinymce/tinymce-vue'
import Tinymce from '@/components/Tinymce/index.vue'

// import TinymceEditor from '@tinymce/tinymce-vue'
import ModTitle from '@/components/Title/index.vue'
import { useStore } from '@/store'
// import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { getProductKeyVal } from '../help'

// const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

const store = useStore()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const state = reactive({
  feature: getProductKeyVal('feature'),
})

const productItem = computed(() => store.state.product.productItem)

// const initOptions = ref({
//   selector: `#${props.id}`,
//   height: 500,
//   // plugins: [
//   //   'advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount',
//   // ],
//   toolbar: [
//     'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample help',
//     'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullpage fullscreen',
//   ],
//   language: 'zh_CN',
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   end_container_on_empty_block: true,
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   powerpaste_word_import: 'clean',
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   code_dialog_height: 450,
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   code_dialog_width: 1000,
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   advlist_bullet_styles: 'square',
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   advlist_number_styles: 'default',
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   default_link_target: '_blank',
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   link_title: false,
//   // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   nonbreaking_force_tab: true,
//   // eslint-disable-next-line @typescript-eslint/camelcase
//   convert_urls: false,
// })


// const handleChange = ({ level }) => {
//   const { content } = level
//   store.commit(ProductMutationTypes.PRODUCT_ITEM, { feature: content })
// }

const { feature } = toRefs(state)

watch(
  () => productItem.value,
  data => {
    setTimeout(() => {
      if (data && data['feature']) {
        state.feature = data['feature']
      }
    }, 1000)
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div class="product-editor">
    <ModTitle :title="props.title" />

    <div class="content">
      <div class="container">
        <Tinymce :content="feature" />
        <!-- <TinymceEditor
          :id="defaultId()"
          v-model:value="feature"
          :init="initOptions"
          @change="handleChange"
        /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
