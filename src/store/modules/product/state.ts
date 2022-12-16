export interface ProductState {
  productData: any,
  productItem: any
  productStockList: Array<any>
  productStockItem: any
  productTagList: Array<any>
  productCateList: Array<any>
  productResourceAll: Array<any>
}

export const state: ProductState = {
  productData: null,
  productItem: {},
  productStockList: [],
  productStockItem: {},
  productTagList: null,
  productCateList: [],
  productResourceAll: null,
}
