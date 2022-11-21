<script setup lang="ts">
import { ref } from 'vue'
import UploadAvatar from '@/components/Uploader/UploadAvatar.vue'
import ModTitle from '@/components/Title/index.vue'

const bannerList = ref([
  { url: '', name: '', orderNumber: 1 },
  { url: '', name: '', orderNumber: 2 },
  { url: '', name: '', orderNumber: 3 },
  { url: '', name: '', orderNumber: 4 },
])
</script>

<template>
  <div class="banner-upload">
    <ModTitle title="Banner图设置" />
    <div class="container">
      <div class="content">
        <template v-for="(item, index) in bannerList" :key="index">
          <div class="banner-upload--container">
            <div class="banner-upload--image">
              <UploadAvatar :url="item.url" />
            </div>

            <div class="banner-upload--content">
              <FormBase>
                <FormItemBase prop="name" label="图片名称">
                  <InputBase v-model="item.name" />
                </FormItemBase>
                <FormItemBase prop="sort" label="图片排序">
                  <InputBase v-model="item.orderNumber" />
                </FormItemBase>
              </FormBase>
            </div>
          </div>
        </template>
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
