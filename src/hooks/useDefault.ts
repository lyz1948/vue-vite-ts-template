import { computed } from 'vue'
import { PicTypeEnum } from '../enums/picTypeEnum'
import { useStore } from '@/store'

export default function () {
  const store = useStore()

  const picTypeList = computed(() => {
    return store.state.source.picTypeList || []
  })

  const getSwiperPicTypeId = () => {
    const findItem = picTypeList.value.find(it => it.code == PicTypeEnum.SWIPER)
    return findItem?.id
  }

  const getBannerPicTypeId = () => {
    const findItem = picTypeList.value.find(it => it.code == PicTypeEnum.BANNER)
    return findItem?.id
  }

  return {
    getSwiperPicTypeId,
    getBannerPicTypeId,
  }
}
