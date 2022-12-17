<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import UploadAvatar from '@/components/Uploader/UploadAvatar.vue'
import ModTitle from '@/components/Title/index.vue'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import useDefault from '@/hooks/useDefault'
import useElement from '@/hooks/useElement'

const store = useStore()
const { getBannerPicTypeId } = useDefault()
const { success } = useElement()

const bannerList = ref([
  { path: '', name: '', skipPath: '', orderNumber: 1 },
  { path: '', name: '', skipPath: '', orderNumber: 2 },
  { path: '', name: '', skipPath: '', orderNumber: 3 },
  { path: '', name: '', skipPath: '', orderNumber: 4 },
])

// 图片分类下的图片
const picTypeImagesData = computed(() => {
  return store.state.source.picByTypeList
})

const bannerTypeImages = computed(() => {
  return picTypeImagesData.value[getBannerPicTypeId()]
})

const fetchSwiperPic = () => {
  const typeId = getBannerPicTypeId()
  return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE, typeId)
}

const handleSuccess = (index, data: any) => {
  const { url } = data
  if (url !== '') {
    bannerList.value[index].path = url
  }
}

const handleSave = () => {
  const picTypeId = getBannerPicTypeId()
  const data = bannerList.value
    .filter(it => it.path !== '')
    .map(it => {
      const { name, path, orderNumber, skipPath } = it
      const item = {
        path,
        skipPath,
        picTypeId,
        orderNumber,
        picTypeName: name,
        skipStatus: true,
        skipType: '',
      }
      return item
    })
  const pList = data.map(item => {
    return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD, item)
  })

  Promise.all(pList).then(() => {
    success({ message: '保存成功' })
  })
}

watch(
  () => bannerTypeImages.value,
  data => {
    console.log(data)
    if (!data) {
      fetchSwiperPic()
    } else {

      data.map((it, idx) => {
        const cur = bannerList.value[idx]
        bannerList.value[idx] = { ...cur, ...it }
      })
        console.log('bannerList.value:', bannerList.value)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="banner-upload">
    <ModTitle title="Banner图设置" />
    <div class="container">
      <div class="content">
        <template v-for="(item, index) in bannerList" :key="index">
          <div class="banner-upload--container">
            <div class="banner-upload--image">
              <UploadAvatar :url="item.path" @on:success="handleSuccess(index, $event)" />
            </div>

            <div class="banner-upload--content">
              <FormBase>
                <FormItemBase prop="name" label="图片名称">
                  <InputBase v-model="item.name" />
                </FormItemBase>
                <FormItemBase prop="sort" label="图片排序">
                  <InputBase v-model="item.orderNumber" />
                </FormItemBase>
                <FormItemBase prop="sort" label="跳转链接">
                  <InputBase v-model="item.skipPath" />
                </FormItemBase>
              </FormBase>
            </div>
          </div>
        </template>
      </div>

      <div class="">
        <BtnBase type="success" @click="handleSave">
          保存
        </BtnBase>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-upload {
  &--container {
    display: flex;
    margin-bottom: 24px;
    align-items: top;
  }
  &--image {
  }
  &--content {
    flex: 1;
    padding-left: 20px;
  }
}
</style>
