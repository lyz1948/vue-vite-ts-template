<script setup lang="ts">
import { ref, computed } from 'vue'
// import { ElMessage } from 'element-plus'

import type { UploadProps } from 'element-plus'
// interface Props {
//   url: string
// }
// const props = defineProps<Props>()
import { uploadUrl } from '@/config/upload'
import useElement from '@/hooks/useElement'
import { useStore } from '@/store'

const props = defineProps({
  action: {
    type: String,
    default: uploadUrl,
  },
  url: {
    type: String,
    default: '',
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

const imageUrl = ref(props.url)
const { error } = useElement()
const emit = defineEmits(['on:success'])
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

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  emit('on:success', response.data)
}

</script>

<template>
  <el-upload
    class="avatar-uploader"
    :headers="getToken"
    :accept="acceptType"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <el-icon v-else class="avatar-uploader-icon">
      <icon-plus />
    </el-icon>
  </el-upload>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
