import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Order, OrderSearch, OrderOtherPay } from '@/types/order'
import { OrderLog } from '../types/order';

// 订单列表
export const orderListRequest = async (params: OrderSearch) => {
  return await request.get(httpUrl.orderList, { params })
}
// 订单更新
export const orderSetRequest = async (order: Order) => {
  return await request.post<Order>(httpUrl.orderSet, order)
}
// 订单详情
export const orderDetailRequest = async (id: number) => {
  return await request.post<number>(httpUrl.orderDetail, { id })
}
// 订单日志
export const orderLogRequest = async (params: OrderLog) => {
  return await request.post<number>(httpUrl.orderLogs, params)
}

// 其他支出列表
export const otherListRequest = async (orderId: number) => {
  return await request.get(httpUrl.orderOtherPayList, { params: orderId })
}
// 其他支出更新
export const otherSetRequest = async (otherPay: OrderOtherPay) => {
  return await request.post<OrderOtherPay>(httpUrl.orderOtherPaySet, otherPay)
}
// 其他支出详情
export const otherDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.orderOtherPayDel, { id })
}