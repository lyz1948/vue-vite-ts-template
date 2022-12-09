import request from '@/utils/request' // axios 封装
import httpUrl from '../httpUrl' // 接口 url
import { Staff } from '@/types/system'
import { StaffSearch } from '../../types/system'

// 角色创建
export const staffCreateRequest = async (staff: Staff) => {
  return await request.post<Staff>(httpUrl.staffCreate, staff)
}

// 角色更新
export const staffUpdateRequest = async (staff: Staff) => {
  return await request.post<Staff>(httpUrl.staffUpdate, staff)
}

// 角色删除
export const staffDeleteRequest = async (userId: number) => {
  return await request.post<number>(httpUrl.staffDelete, { userId })
}

// 角色列表
export const staffListRequest = async (params: StaffSearch) => {
  return await request.post(httpUrl.staffList, params)
}

// 角色列表
export const staffSelectListRequest = async () => {
  return await request.post(httpUrl.staffSelectList)
}
