import { PicTypeEnum, PicTypeLabelEnum } from '../enums/picTypeEnum'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'

export default function () {
  // 初始化产品分类
  const initPicType = () => {
    const store = useStore()
    const typeList = Object.values(PicTypeEnum)

    const formList = typeList.map(val => {
      return { code: val, name: PicTypeLabelEnum[val] }
    })

    formList.forEach(async it => {
      await store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_SET, it)
    })
  }

  return {
    initPicType,
  }
}
