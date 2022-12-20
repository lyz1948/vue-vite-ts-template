import { computed } from 'vue'
import { useStore } from '@/store'
import { formState } from './params'

const getProductItem = computed(() => {
  const store = useStore()
  return store.state.product.productItem
})

// 获取编辑产品对应的值
export const pickProductData = (keys: string[]) => {
  return keys.reduce((acc, key) => {
    acc = { ...acc, [key]: getProductItem.value[key] ?? '' }
    return acc
  }, {})
}

// 产品信息
export const getProductInfo = () => {
  const formInfo: any = pickProductData(Object.keys(formState())) || formState()

  return { ...formInfo, resName: formInfo.resPId + '' }
}

// 产品标签
export const getProductArrVal = (key: string) => {
  const arr = getProductItem.value[key] || []
  return arr
  // return arr && arr.length && arr.map(it => (it.name))
}

export const getProductKeyVal = (key: string) => {
  if (!key || !getProductItem.value) return ''
  return getProductItem.value[key]
}