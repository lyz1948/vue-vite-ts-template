import { AxiosResponse, AxiosRequestConfig } from 'axios'

/**用户登录 */
export interface ILogin {
  username: string
  password: string
}

/** 客户端类型 */
export interface ILoginClient {
  username: string
  password: string
  grantType: string
  clientId: string
  clientSecret: string
}

// 网络请求响应格式，T 是具体的接口返回类型数据
export interface CustomSuccessData<T> {
  code: number
  msg?: string
  message?: string
  data: T
  [keys: string]: any
}

/** api接口 */
export interface IApi {
  [keys: string]: string
}

export interface IGet {
  <T>(url: string, config?: AxiosRequestConfig):
    | Promise<T>
    | Promise<CustomSuccessData<T>>
}

export interface IPost {
  <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig
  ): Promise<CustomSuccessData<T>>
}
