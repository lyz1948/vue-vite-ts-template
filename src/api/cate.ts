import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Cate, CateSearch } from '@/types/cate'

// 类目列表
export const cateListRequest = async (params: CateSearch) => {
  return await request.get(httpUrl.cateList, { params })
}
// 类目添加或更新
export const cateSetRequest = async (cate: Cate) => {
  return await request.post<Cate>(httpUrl.cateSet, cate)
}
// 类目删除
export const cateDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.cateDel, { id })
}
