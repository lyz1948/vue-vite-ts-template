<script setup lang="ts">
import { computed, ref } from 'vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'
import useDefault from '@/hooks/useDefault'
import DialogMaterial from '@/components/business/DialogMaterial.vue'
import Upload from '@/components/Uploader/index.vue'

const emit = defineEmits(['on:change', 'on:delete'])
const store = useStore()
const { getSwiperPicTypeId } = useDefault()

type Picid = {
  picId: number
}

const dialogRef = ref(null)
const bannerPics = ref([])
const imageList = ref([])

const getImageList = computed(() => imageList.value)

const handleChange = (pics: Picid[]) => {
  emit('on:change', pics)
}

const handleSelect = ({ pics, picIds, list }) => {
  handleChange(picIds)
  bannerPics.value = [...bannerPics.value, ...picIds]
  imageList.value = list
  // imageList.value = [...imageList.value, ...pics]
}

const deleteItem = (index) => {
  emit('on:delete', imageList.value[index].picId)
  imageList.value.splice(index, 1)
}

const handleUpload = data => {
  const { url } = data
  if (url !== '') {
    store
      .dispatch(SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD, {
        path: url,
        picTypeId: getSwiperPicTypeId(),
      })
      .then(data => {
        bannerPics.value.push({
          picId: data.id,
        })

        imageList.value.push({
          url,
        })

        handleChange(bannerPics.value)
      })
  }
}

const handleChoose = () => {
  dialogRef.value.show()
}
</script>

<template>
  <div class="uploader-item content">
    <div class="container flex">
      <Upload class="ml10" @on:success="handleUpload">
        <BtnBase>
          上传图片
        </BtnBase>
      </Upload>
      <BtnBase class="ml10" @click="handleChoose">
        选择图库
      </BtnBase>
    </div>
    <div class="img-list">
      <template v-for="(item, index) in getImageList" :key="index">
        <div class="img-box">
          <el-image
            :src="item.url"
            fit="cover"
          />
          <div class="icon-box" @click="deleteItem(index)">
            <icon-delete fill="#fff" size="30" />
          </div>
        </div>
      </template>
    </div>
    <DialogMaterial ref="dialogRef" @on:choose="handleSelect" />
  </div>
</template>

<style lang="scss">
.uploader-item {
  .img-list {
    @include flexcenter(flex-start);
  }
  .img-box {
    position: relative;
    margin: 0 10px 10px 0;
    width: 240px;
    height: 180px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      .icon-box {
        opacity: 1;
      }
    }

    .el-image {
      width: 100%;
      height: 100%;
    }

    .icon-box {
      @include flexcenter();
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: rgba(0, 0, 0, .5);
      opacity: 0;
    }
  }
}
</style>