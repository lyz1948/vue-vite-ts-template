export interface Product {
  name: string
  type: string
  color?: string
  icon?: string
  id?: number
  orderNumber?: 0
  remarks?: string
}

export type ProductSearch = {
  name?: string
  type?: string
}