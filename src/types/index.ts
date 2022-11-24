import { AxiosRequestConfig } from 'axios'

/**用户登录 */
export interface Login {
  username: string
  password: string
}

/** 客户端类型 */
export interface LoginClient {
  username: string
  password: string
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
export interface Api {
  [keys: string]: string
}

export interface Get {
  <T>(url: string, config?: AxiosRequestConfig):
    | Promise<T>
    | Promise<CustomSuccessData<T>>
}

export interface Post {
  <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig
  ): Promise<CustomSuccessData<T>>
}

export interface Page {
  pageNum?: number
  pageSize?: number
}

export interface Meta {
  icon: string
  title: string
  name?: string
  hidden?: boolean
  affix?: boolean
  noCache?: boolean
}
export interface Router {
  path: string
  fullPath: string
  redirect?: string
  name?: string
  meta?: Meta
  component: any
  children: Router[]
}

export interface TagView {
  name: string
  meta: Meta
  path: string
}

export interface SelectItem {
  label: string
  value: string
  [keys: string]: any
}

export interface RoleAuthMenuAct {
  id: number
  label: string
  checked: boolean
}

export interface RoleAuthMenuAct {
  id: number
  label: string
  checked: boolean
}

export interface RoleAuthMenu {
  id: number
  label: string
  checked: boolean // 菜单权限是否选择
  radios: SelectItem[]
  authArea: string
  isNeedAuthArea: boolean // 权限范围是否显示在设置中
  orderNumber: number
  actions: RoleAuthMenuAct[]
}

export interface RoleAuth {
  id: number
  name: string
  isRole: boolean
  orderNumber: number
  menus: RoleAuthMenu[]
  subMenus: any[]
}