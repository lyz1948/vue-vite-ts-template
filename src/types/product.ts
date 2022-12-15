import { Page } from './index';
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
