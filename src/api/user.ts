import request from '@/plugins/request' // axios 封装
import qs from 'qs'
import httpUrl from './httpUrl' // 接口 url
import { ILoginClient } from '@/types'

// 获取 banner
const getBanner = async () => {
  return await request.get<Array<unknown>>(httpUrl.banner)
}

// 用户登录
export const loginRequest = async (params: ILoginClient) => {
  return await request.post<string>(httpUrl.login, qs.stringify(params))
}

export const userInfoRequest = async (userId: number | string) => {
  return await request.post<string>(httpUrl.user, qs.stringify(userId))
}

const handleError = (err: unknown) => {
  // console.log("请求错误", err);
  throw err
}
