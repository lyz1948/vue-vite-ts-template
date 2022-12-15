import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Product, ProductSearch } from '@/types/product'

// // 地接资源产品列表
// export const productResourceRequest = async (params: any) => {
//   return await request.get(httpUrl.resourceProduct, { params })
// }

// 地接资源产品列表 不分页
export const productResourceAllRequest = async () => {
  return await request.get(httpUrl.resourceProductAll)
}

// 产品列表
export const productListRequest = async (params: ProductSearch) => {
  return await request.get(httpUrl.productList, { params })
}

// 产品详情
export const productDetailRequest = async (id: number) => {
  return await request.get<number>(httpUrl.productDetail, { params: { id } })
}

// 产品添加或更新
export const productSetRequest = async (tag: Product) => {
  return await request.post<Product>(httpUrl.productSet, tag)
}

// 产品删除
export const productDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.productDel, { id })
}
