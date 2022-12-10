export interface Cate {
  name: string
  type: string
  color?: string
  icon?: string
  id?: number
  orderNumber?: 0
  remarks?: string
}

export type CateSearch = {
  name?: string
  type?: string
}