import request from '@/utils/request'
import httpUrl from './httpUrl'
import { Tag, TagSearch } from '@/types/tag'

// 标签列表
export const tagListRequest = async (params: TagSearch) => {
  return await request.get(httpUrl.tagList, { params })
}
// 标签添加或更新
export const tagSetRequest = async (tag: Tag) => {
  return await request.post<Tag>(httpUrl.tagSet, tag)
}
// 标签删除
export const tagDelRequest = async (id: number) => {
  return await request.post<number>(httpUrl.tagDel, { id })
}
