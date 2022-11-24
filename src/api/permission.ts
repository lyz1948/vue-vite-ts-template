import request from '@/utils/request' // axios 封装
import httpUrl from './httpUrl' // 接口 url

// 角色权限列表
export const permissionListRequest = async (roleId: number) => {
  return await request.post<number>(httpUrl.permissionList, { roleId })
}

// 角色拥有的权限
export const permissionOnlyHaveRequest = async (roleId: number) => {
  return await request.post<number>(httpUrl.permissionOnlyHave, { roleId })
}

// 角色权限更新
export const permissionUpdate = async (opts: any) => {
  return await request.post(httpUrl.permissionUpdate, opts)
}
