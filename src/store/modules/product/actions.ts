/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { RootState } from '@/store'

import { ProductActionTypes } from './action-types'
import { ProductState } from './state'
import { ProductMutationTypes } from './mutation-types'

import { productListRequest, productSetRequest, productDelRequest, productDetailRequest, productUpdateRequest } from '@/api/product'
import { productResourceAllRequest } from '@/api/product'
import { productPicAddRequest, productTagAddRequest } from '@/api/product'
import { productRelTagSetRequest, productRelTagDelRequest } from '@/api/product'
import { productStockListRequest, productStockSetRequest } from '@/api/product'
import { tagListRequest, tagSetRequest, tagDelRequest } from '@/api/tag'
import { cateListRequest, cateSetRequest, cateDelRequest } from '@/api/cate'

import { Product, ProductSearch, Stock, StockSearch, ProductTagRel, ProductTagRelieve } from '@/types/product'
import { Tag, TagSearch } from '@/types/tag'
import { Cate, CateSearch } from '@/types/cate'
import { formatSelect } from '@/utils/format';
import { TagOrType } from '@/enums/index';
import { Pic } from '@/types/source';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

export interface IUserActions {
  [ProductActionTypes.ACTION_PRODUCT_RESOURCE_ALL]({ commit }: AugmentedActionContext): void

  [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }: AugmentedActionContext, params: ProductSearch): void
  [ProductActionTypes.ACTION_PRODUCT_SET]({ commit }: AugmentedActionContext, item: Product): void
  [ProductActionTypes.ACTION_PRODUCT_DEL]({ commit }: AugmentedActionContext, id: number): void
  [ProductActionTypes.ACTION_PRODUCT_DETAIL]({ commit }: AugmentedActionContext, id: number): void
  [ProductActionTypes.ACTION_PRODUCT_UPDATE]({ commit }: AugmentedActionContext, params: ProductSearch): void

  [ProductActionTypes.ACTION_PRODUCT_PIC_ADD]({ commit }: AugmentedActionContext, item: Pic): void
  [ProductActionTypes.ACTION_PRODUCT_TAG_OR_TYPE_ADD]({ commit }: AugmentedActionContext, item: Tag): void

  [ProductActionTypes.ACTION_PRODUCT_STOCK_LIST]({ commit }: AugmentedActionContext, params: StockSearch): void
  [ProductActionTypes.ACTION_PRODUCT_STOCK_SET]({ commit }: AugmentedActionContext, stock, Stock): void

  [ProductActionTypes.ACTION_PRODUCT_TAG_LIST]({ commit }: AugmentedActionContext, params: TagSearch): void
  [ProductActionTypes.ACTION_PRODUCT_TAG_SET]({ commit }: AugmentedActionContext, item: Tag): void
  [ProductActionTypes.ACTION_PRODUCT_TAG_DEL]({ commit }: AugmentedActionContext, id: number): void

  [ProductActionTypes.ACTION_PRODUCT_CATE_LIST]({ commit }: AugmentedActionContext, params: CateSearch): void
  [ProductActionTypes.ACTION_PRODUCT_CATE_SET]({ commit }: AugmentedActionContext, item: Cate): void
  [ProductActionTypes.ACTION_PRODUCT_CATE_DEL]({ commit }: AugmentedActionContext, id: number): void

  [ProductActionTypes.ACTION_PRODUCT_RELATIVE_TAG]({ commit }: AugmentedActionContext, params: ProductTagRel): void
  [ProductActionTypes.ACTION_PRODUCT_RELIEVE_TAG]({ commit }: AugmentedActionContext, params: ProductTagRelieve): void
}

export const actions: ActionTree<ProductState, RootState> & IUserActions = {

  async [ProductActionTypes.ACTION_PRODUCT_RESOURCE_ALL]({ commit }) {
    return productResourceAllRequest().then(data => {
      commit(ProductMutationTypes.PRODUCT_RESOURCE_ALL, formatSelect(data))
    })
  },

  async [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }, params: ProductSearch) {
    return productListRequest(params).then(data => {
      commit(ProductMutationTypes.PRODUCT_DATA, data)
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_SET]({ commit }, item: Product) {
    return productSetRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_DEL]({ state, commit }, id: number) {
    return productDelRequest(id)
  },
  async [ProductActionTypes.ACTION_PRODUCT_DETAIL]({ commit }, id: number) {
    return productDetailRequest(id).then(data => {
      commit(ProductMutationTypes.PRODUCT_ITEM, data)
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_UPDATE]({ commit }, item: Product) {
    return productUpdateRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_PIC_ADD]({ commit }, item: Pic) {
    return productPicAddRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_TAG_OR_TYPE_ADD]({ commit }, item: Tag) {
    return productTagAddRequest(item)
  },

  // 库存相关
  async [ProductActionTypes.ACTION_PRODUCT_STOCK_LIST]({ commit }, params: StockSearch) {
    return productStockListRequest(params).then(data => {
      commit(ProductMutationTypes.PRODUCT_STOCK_LIST, data)
    })
  },
  
  async [ProductActionTypes.ACTION_PRODUCT_STOCK_SET]({ commit }, stock: Stock) {
    return productStockSetRequest(stock).then(data => {
      commit(ProductMutationTypes.PRODUCT_STOCK_ITEM, data)
    })
  },

  // 标签相关
  async [ProductActionTypes.ACTION_PRODUCT_TAG_LIST]({ commit }, params: TagSearch) {
    return tagListRequest({ ...params, type: TagOrType.TAG }).then(data => {
      commit(ProductMutationTypes.PRODUCT_TAG_LIST, formatSelect(data))
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_TAG_SET]({ commit }, item: Tag) {
    return tagSetRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_TAG_DEL]({ commit }, id: number) {
    return tagDelRequest(id)
  },

  // 分类相关
  async [ProductActionTypes.ACTION_PRODUCT_CATE_LIST]({ commit }, params: CateSearch) {
    return cateListRequest({ ...params, type: TagOrType.TYPE }).then(data => {
      commit(ProductMutationTypes.PRODUCT_CATE_LIST, formatSelect(data))
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_CATE_SET]({ commit }, item: Cate) {
    return cateSetRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_CATE_DEL]({ state, commit }, id: number) {
    return cateDelRequest(id)
  },

  // 产品关联标签
  async [ProductActionTypes.ACTION_PRODUCT_RELATIVE_TAG]({ commit }, params: ProductTagRel) {
    return productRelTagSetRequest(params).then(data => {
      commit(ProductMutationTypes.PRODUCT_CATE_LIST, formatSelect(data))
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_RELIEVE_TAG]({ commit }, params: ProductTagRelieve) {
    return productRelTagDelRequest(params)
  },
}
