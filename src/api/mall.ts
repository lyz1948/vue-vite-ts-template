import request from '@/utils/request'
import httpUrl from './httpUrl'
import { ActiveValid, Refund, PhoneItem, MessageTpl } from '../store/modules/app/interface';

// 商城配置信息
export const configRequest = async () => {
  return await request.get(httpUrl.mallConfig)
}

// 商城客服电话 列表
export const phoneListRequest = async () => {
  return await request.get(httpUrl.mallPhoneList)
}

// 商城客服电话 设置
export const phoneSetRequest = async (data: PhoneItem[]) => {
  return await request.post<PhoneItem[]>(httpUrl.mallPhoneSet, data)
}

// 商城客服电话 删除
export const phoneDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.mallPhoneDel, { id })
}

// 短信模板获取
export const smsGetRequest = async () => {
  return await request.get(httpUrl.mallSMSGet)
}

// 短信模板设置
export const smsSetRequest = async (data: MessageTpl) => {
  return await request.post<MessageTpl>(httpUrl.mallSMSSet, data)
}

// 退款流程设置
export const refundProcessRequest = async (data: Refund[]) => {
  return await request.post<Refund>(httpUrl.mallRefundSet, data)
}

// 活动时效
export const activeRequest = async (data: ActiveValid) => {
  return await request.post<ActiveValid>(httpUrl.mallActive, data)
}

// 绑定小程序app id
export const weappBindRequest = async (data: ActiveValid) => {
  return await request.post<ActiveValid>(httpUrl.mallAppSet, data)
}
