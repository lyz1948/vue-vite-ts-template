import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Product, ProductSearch, Stock, ProductTagRel, ProductTagRelieve } from '@/types/product'
import { StockSearch } from '../types/product'
import { Pic } from '@/types/source'

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

// 产品更新
export const productUpdateRequest = async (product: Product) => {
  return await request.post<Product>(httpUrl.productUpdate, product)
}

// 产品tag添加
export const productTagAddRequest = async (tag: Product) => {
  return await request.post<Product>(httpUrl.productTagAdd, tag)
}

// 产品轮播图添加
export const productPicAddRequest = async (pic: Pic) => {
  return await request.post<Product>(httpUrl.productPicAdd, pic)
}

// 产品删除
export const productDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.productDel, { id })
}

// 产品库存列表
export const productStockListRequest = async (params: StockSearch) => {
  return await request.get<StockSearch>(httpUrl.producStocktList, { params })
}

// 产品库存设置
export const productStockSetRequest = async (stock: Stock) => {
  return await request.post<Stock>(httpUrl.producStocktSet, stock)
}

// 产品关联标签
export const productRelTagSetRequest = async (data: ProductTagRel) => {
  return await request.post<ProductTagRel>(httpUrl.producTagOrTypeSet, data)
}

// 产品关联标签 解除
export const productRelTagDelRequest = async (data: ProductTagRelieve) => {
  return await request.post<ProductTagRelieve>(httpUrl.producTagOrTypeDel, data)
}
