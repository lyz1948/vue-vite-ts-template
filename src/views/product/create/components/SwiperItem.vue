<script setup lang="ts">
import { computed } from 'vue'
// import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { useStore } from '@/store'
import ModTitle from '@/components/Title/index.vue'
// import useDefault from '@/hooks/useDefault'
// import DialogMaterial from '@/components/business/DialogMaterial.vue'
// import Upload from '@/components/Uploader/index.vue'
import UploadItem from './UploadItem.vue'

const store = useStore()
// const { getSwiperPicTypeId } = useDefault()

type Picid = {
  picId: number
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

// const bannerPics = ref([])
// const dialogRef = ref(null)
// const imageList = ref([])

const getProductItem = computed(() => store.state.product.productItem)

const handleChange = (pics: Picid[]) => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, { bannerPics: pics })
}

const handleDelete = (val) => {
  const current: Array<any> = getProductItem.value['bannerPics']
  const pics = current.filter(path => path !== val)
  store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, { bannerPics: pics })
}

// const handleSelect = ({ pics, picIds }) => {
//   console.log('pics:', pics)
//   handleChange(picIds)
//   imageList.value.push(pics)
// }

// const handleUpload = data => {
//   const { url } = data
//   if (url !== '') {
//     store
//       .dispatch(SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD, {
//         path: url,
//         picTypeId: getSwiperPicTypeId(),
//       })
//       .then(data => {
//         bannerPics.value.push({
//           picId: data.id,
//         })

//         imageList.value.push({
//           url,
//         })

//         handleChange(bannerPics.value)
//       })
//   }
// }

// const handleChoose = () => {
//   dialogRef.value.show()
// }
</script>

<template>
  <div>
    <ModTitle :title="props.title" />
    <UploadItem @on:change="handleChange" @on:delete="handleDelete" />
    <!-- <div class="content">
      <div class="container flex">
        <Upload class="mr10" @on:success="handleUpload">
          <BtnBase>
            上传图片
          </BtnBase>
        </Upload>
        <BtnBase @click="handleChoose">
          选择图库
        </BtnBase>
      </div>
      <div class="img-list">
        <template v-for="(item, index) in getImageList" :key="index">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="fill"
          />
        </template>
      </div>
    </div>
    <DialogMaterial ref="dialogRef" @on:choose="handleSelect" /> -->
  </div>
</template>
