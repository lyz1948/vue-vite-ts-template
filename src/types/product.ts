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