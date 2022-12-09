import { Pic, PicSearch } from '@/types/source'
import request from '@/utils/request'
import httpUrl from './httpUrl'

// 图片列表
export const picListRequest = async (params: PicSearch) => {
  return await request.get(httpUrl.picTypeList, { params })
}
// 图片添加或更新
export const picSetRequest = (pic: Pic) => {
  return request.post<Pic>(httpUrl.picTypeSet, pic)
}
// 图片删除
export const picDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.picTypeDel, { id })
}
