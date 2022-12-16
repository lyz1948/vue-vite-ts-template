<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'
import useDefault from '@/hooks/useDefault'
import DialogMaterial from '@/components/business/DialogMaterial.vue'
import Upload from '@/components/Uploader/index.vue'
import { ossPicUrlRequest } from '@/api/source'

const emit = defineEmits(['on:change', 'on:delete'])
const store = useStore()
const { getSwiperPicTypeId } = useDefault()

const props = defineProps({
  list: {
    type: Array,
    default: () => ([])
  }
})

type Picid = {
  picId: number
}

const dialogRef = ref(null)
const bannerPics = ref([])
const imageList = ref([])

// const productItem = computed(() => store.state.product.productItem)
const getImageList = computed(() => imageList.value)

const handleChange = (pics: Picid[]) => {
  emit('on:change', pics)
}

const handleSelect = ({ picIds, list }) => {
  handleChange(picIds)
  bannerPics.value = [...bannerPics.value, ...picIds]
  imageList.value = list
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


const getPicUrl = (paths) => {
  if (!paths || !paths.length) return []
  return ossPicUrlRequest(paths).then(data => {
    return data
  })
}
watch(() => props.list, imgList => {
  if (imgList && imgList.length) {
    const paths = imgList.map(it => it.path)
    getPicUrl(paths).then((data) => {
      imageList.value = data.map((url, index) => ({ uid: index, url }))
    })
  }
}, { immediate: true })
</script>

<template>
  <div class="uploader-item content">
    <div class="container flex">
      <Upload class="ml10" :img-list="getImageList" @on:success="handleUpload">
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