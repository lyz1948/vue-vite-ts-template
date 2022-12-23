export interface Order {
  id?: number
  adultCount: number
  contactMobilePhone: string
  contactName: string
  productId: string
  startTripDate: string
  endTripDate: string
  [propName: string]: any
}

export type OrderSearch = {
  [propName: string]: string
}

export type OrderOtherPay = {
  title: string
  id?: number
  count?: number
  orderId?: number
  price?: number
  remarks?: string
  salesmanId?: number
  salesmanName?: string
  totalPay?: number
}

export interface OrderLog {
  orderId: number
  logType?: string
  subItemId?: number
}