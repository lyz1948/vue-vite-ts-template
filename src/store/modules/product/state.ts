export interface ProductState {
  productData: any,
  productItem: any
  productTagList: Array<any>
  productCateList: Array<any>
  productResourceAll: Array<any>
}

export const state: ProductState = {
  productData: null,
  productItem: {},
  productTagList: null,
  productCateList: [],
  productResourceAll: null,
}
