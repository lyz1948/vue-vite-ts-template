export interface ProductState {
  productList: Array<any>
  productItem: any
  productTagList: Array<any>
  productTagItem: any
}

export const state: ProductState = {
  productList: [],
  productItem: null,
  productTagList: [],
  productTagItem: null,
}
