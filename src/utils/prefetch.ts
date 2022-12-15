// 需要提前加载的数据
import { useStore } from '@/store'
import { DictionaryActionTypes } from '@/store/modules/system/dictionary/action-types'
import { StaffActionTypes } from '@/store/modules/system/staff/action-types'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'

const store = useStore()

export const fetchComponentData = () => {
  // 地接字典
  store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_ALL_FETCH, undefined)
  // 地接员工
  store.dispatch(StaffActionTypes.ACTION_STAFF_SELECT_FETCH, undefined)
  // 地接的产品资源
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_RESOURCE_ALL, undefined)
  // 产品标签
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_TAG_LIST, undefined)
  // 产品类别
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_LIST, undefined)
  // 图片分类列表
  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST, undefined)
}
