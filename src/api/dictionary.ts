import request from '@/utils/request' // axios 封装
import httpUrl from './httpUrl' // 接口 url
import { DictionaryItem, DictionaryTypeAndSub } from '@/types/system'

// 字典创建
export const dicCreateRequest = async (dic: DictionaryItem) => {
  return await request.post<DictionaryItem>(httpUrl.dicCreate, dic)
}

// 字典删除
export const dicDeleteRequest = async (id: string | number) => {
  return await request.post<string | number>(
    httpUrl.dicDelte + '?dictionaryId=' + id
  )
}

// 字典搜索
export const dicSearchRequest = async (code: number) => {
  return await request.post<number>(httpUrl.dicSearchForCode, {
    dicTypeCode: code,
  })
}

// 根据id查询字典
export const dicListRequest = async (id: string) => {
  return await request.post(httpUrl.dicList, { dictionaryTypeId: id })
}

// 字典列表所有
export const dicAllRequest = async () => {
  return await request.get<Array<DictionaryTypeAndSub>>(httpUrl.dicListAll)
}

// 字典创建类型
export const dicTypeCreateRequest = async (dic: DictionaryItem) => {
  return await request.post<DictionaryItem>(httpUrl.dicTypeCreate, dic)
}

// 字典类型列表
export const dicTypeListRequest = async () => {
  return await request.post(httpUrl.dicTypeList)
}
