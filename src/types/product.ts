import { Page } from './index';
import { PriceEnum } from '../enums/priceEnum'

export interface Product  {
  [keys: string]: any
}

export interface ProductSearch extends Page {
  id: number
  name: string
  code: string
  isEnable: boolean
  isHot: boolean
  isRecommend: boolean
  travelLineId: string
}

export interface Stock {
  [keys: string]: any
}

export interface StockSearch {
  priceType: keyof PriceEnum,
  productId: number
}

type TagRel = {
  tid: number
  type: string
  productId?: string
}

// 关联tag
export interface ProductTagRel {
  paras: TagRel,
  type: string
}

// 解除tag
export interface ProductTagRelieve {
  ids: string[],
  productId?: string
}