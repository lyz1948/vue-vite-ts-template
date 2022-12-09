import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Product, ProductSearch } from '@/types/product'

// 产品列表
export const productListRequest = async (params: ProductSearch) => {
  return await request.get(httpUrl.productList, { params })
}
// 产品添加或更新
export const productSetRequest = async (tag: Product) => {
  return await request.post<Product>(httpUrl.productSet, tag)
}
// 产品删除
export const productDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.productDel, { id })
}
