export interface ProductState {
  productList: Array<any>
  productItem: any
  productTagList: Array<any>
  productCateList: Array<any>
}

export const state: ProductState = {
  productList: [],
  productItem: null,
  productTagList: [],
  productCateList: [],
}
