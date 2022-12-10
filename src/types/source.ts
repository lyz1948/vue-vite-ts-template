import { Page } from './index';
export interface PicType {
  code: string,
  name: string
  id?: number
}

export interface PicTypeSearch {
  name?: string
}
export interface Pic {
  path: string,
  picTypeId: string
  [keys: string]: string
}

export interface PicSearch extends Page {
  typeId?: string
}
