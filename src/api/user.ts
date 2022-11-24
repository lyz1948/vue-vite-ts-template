import request from '@/utils/request' // axios 封装
import qs from 'qs'
import httpUrl from './httpUrl' // 接口 url
import { LoginClient } from '@/types'
import { parseQuerys } from '@/utils'

// 用户登录
export const loginRequest = async (params: LoginClient) => {
  return await request.loginPost<string>(httpUrl.login, qs.stringify(params), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 用户登出
export const logoutRequest = async () => {
  return await request.get(httpUrl.logout)
}

// 用户信息
export const userInfoRequest = async (userId: number | string) => {
  return await request.post(`${httpUrl.userinfo}?userId=${userId}`)
}

// 图形校验码
export const verifyCodeRequest = async ({ mobilePhone, type }) => {
  return await request.get(httpUrl.code, { params: { mobilePhone, type } })
}

// 短信验证码
export const smsCodeRequest = (params) => {
  const url = parseQuerys(httpUrl.sms, params)
  return request.post(url)
}

// 短信登陆
export const loginSMSRequest = (data) => {
  return request.post(httpUrl.login, { ...data })
}