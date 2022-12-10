import { PicType, PicTypeSearch, Pic, PicSearch } from '@/types/source'
import request from '@/utils/request'
import httpUrl from './httpUrl'

// 图片类型列表
export const picTypeListRequest = async (params: PicTypeSearch) => {
  return await request.get(httpUrl.picTypeList, { params })
}
// 图片类型添加或更新
export const picTypeSetRequest = (pic: PicType) => {
  return request.post<PicType>(httpUrl.picTypeSet, pic)
}
// 图片类型删除
export const picTypeDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.picTypeDel, { id })
}

// 图片列表 不分页
export const picListAllRequest = async (typeId: number) => {
  return await request.get<number>(httpUrl.picListAll, { params: { typeId } })
}

// 图片列表
export const picListRequest = async (params: PicSearch) => {
  return await request.get(httpUrl.picList, { params })
}

// 图片添加或更新
export const picSetRequest = (pic: Pic) => {
  return request.post<Pic>(httpUrl.picSet, pic)
}

// 图片删除
export const picDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.picDel, { id })
}

// 获取文件路径
export const ossPicUrlRequest = async (data: string[]) => {
  return await request.post(httpUrl.ossPicUrl, data)
}

// 删除文件
export const ossPicDelRequest = async (data: string[]) => {
  return await request.post(httpUrl.ossPicDel, data)
}
