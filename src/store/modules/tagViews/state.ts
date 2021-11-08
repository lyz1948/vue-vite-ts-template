import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface ITagViewsState {
  visitedViews: TagView[]
  cacheViews: (string | undefined)[]
}

export const state: ITagViewsState = {
  visitedViews: [],
  cacheViews: [],
}
