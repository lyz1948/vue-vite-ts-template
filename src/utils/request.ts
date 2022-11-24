import service from './axiosConfigs'
import { Get, Post } from '@/types' // 接口泛型
import { CustomSuccessData } from '../types/index';

const postFn = async (url, params, config) => {
  const response = await service.post(url, params, { ...config })
  return response
}

const get: Get = async (url, config) => {
  const response = await service.get(url, { ...config })
  return response.data.data
}

const post: Post = async (url, params, config): Promise<CustomSuccessData<any>> => {
  const res = await postFn(url, params, config)
  return res.data.data
}

const loginPost: Post = async (url, params, config) => {
  const res = await postFn(url, params, config)
  return res.data
}

// 使用 request 统一调用
const request = {
  get,
  post,
  loginPost,
}

export default request
