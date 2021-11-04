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
  const { username, password, grantType, clientId, clientSecret } = params
  const newParams = {
    username,
    password,
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
  }
  return await request.post<string>(httpUrl.login, qs.stringify(newParams))
}

export const userInfoRequest = async (userId: number | string) => {
  return await request.post<string>(httpUrl.user, qs.stringify(userId))
}

const handleError = (err: unknown) => {
  // console.log("请求错误", err);
  throw err
}
