export interface Tag {
  name: string
  type: string
  color?: string
  icon?: string
  id?: number
  orderNumber?: 0
  remarks?: string
}

export type TagSearch = {
  name?: string
  type?: string
}
