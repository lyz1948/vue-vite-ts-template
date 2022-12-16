<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { uploadUrl } from '@/config/upload'
import { useStore } from '@/store'
import useElement from '@/hooks/useElement'

const props = defineProps({
  action: {
    type: String,
    default: uploadUrl,
  },
  limit: {
    type: Number,
    default: 9,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  acceptType: {
    type: String,
    default: 'image/png, image/jpeg',
  },
  imgList: {
    type: Array,
    default: () => ([]),
  }
})

const emit = defineEmits(['on:success'])
const { warning, error } = useElement()
const fileList = ref<UploadUserFile[]>([])

const getToken = computed(() => {
  const store = useStore()
  return { Authorization: 'bearer ' + store.state.user.token }
})

const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
  if (props.acceptType.indexOf(rawFile.type) < 0) {
    error({ message: `不支持的类型，仅支持${props.acceptType}` })
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    error({ message: `文件大小超出，单张图片最大5M` })
    return false
  }
  return true
}

const handleExceed: UploadProps['onExceed'] = files => {
  if (files.length > props.limit) {
    warning({ message: `超出上传限制，单次上传最多${props.limit}张` })
  }
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log('response,uploadFile:', response, uploadFile)
  emit('on:success', response.data)
}

const handleError: UploadProps['onError'] = error => {
  console.log(error)
  if (error) {
    warning({ message: `上传错误，请重试` })
  }
}

watch(() => props.imgList, list => {
  if (!list || !list.length) return
  fileList.value = list
})
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    :headers="getToken"
    :accept="acceptType"
    :action="action"
    :limit="limit"
    :multiple="multiple"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :on-error="handleError"
    :on-success="handleSuccess"
  >
    <slot />
  </el-upload>
</template>
