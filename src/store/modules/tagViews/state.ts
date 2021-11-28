import { ITagView } from '@/types'
import { RouteLocationNormalized } from 'vue-router'
export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface ITagViewsState {
  visitedViews: ITagView[]
  cacheViews: (string | undefined)[]
  routerView: boolean
}

export const state: ITagViewsState = {
  visitedViews: [],
  cacheViews: [],
  routerView: true, // 是否显示路由
}
