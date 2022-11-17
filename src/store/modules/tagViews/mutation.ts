import { TagViewsState } from './state'
import { TagsMutationTypes } from './mutation-types'
import { MutationTree } from 'vuex'
import { ITagView } from '@/types/index'

export type Mutations<S = TagViewsState> = {
  [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.ADD_VISITED_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_VISITED_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_LEFT_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_RIGHT_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: S, view: ITagView): void
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: S): void
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: S): void
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: S, view: ITagView): void
  [TagsMutationTypes.MENU_REFRESH](state: S): void
}

export const mutations: MutationTree<TagViewsState> & Mutations = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: TagViewsState, view: ITagView) {
    if (state.visitedViews.some((it: ITagView) => it.path == view.path)) return
    state.visitedViews.push(Object.assign({}, view, { title: view.meta?.title || 'anonymous' }))
  },

  [TagsMutationTypes.ADD_CACHED_VIEW](state: TagViewsState, view: ITagView) {
    if (view.name === null) return
    if (state.cacheViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) { 
      state.cacheViews.push(view.name?.toString())
    }
  },

  [TagsMutationTypes.DEL_VISITED_VIEW](state: TagViewsState, view: ITagView) {
    const fIndex = state.visitedViews.findIndex((it: ITagView) => it.path == view.path)
    state.visitedViews.splice(fIndex, 1)
  },

  [TagsMutationTypes.DEL_LEFT_VIEW](state: TagViewsState, view: ITagView) {
    const viewList = state.visitedViews
    const index = viewList.indexOf(view)

    state.visitedViews = viewList.filter(it => {
      return it.meta?.affix || index <= viewList.indexOf(it)
    })

    state.cacheViews.slice(0, index)
  },

  [TagsMutationTypes.DEL_RIGHT_VIEW](state: TagViewsState, view: ITagView) {
    const viewList = state.visitedViews
    const index = viewList.indexOf(view)

    state.visitedViews = viewList.filter(it => {
      return it.meta?.affix || index >= viewList.indexOf(it)
    })
    state.cacheViews.slice(index, -1)
  },

  [TagsMutationTypes.DEL_CACHED_VIEW](state: TagViewsState, view: ITagView) {
    if (view.name === null) return
    const index = state.cacheViews.indexOf((view as any).name)
    index > -1 && state.cacheViews.splice(index, 1)
  },

  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: TagViewsState, view: ITagView) {
    state.visitedViews = state.visitedViews.filter((it: ITagView) => {
      return it.meta?.affix || it.path == view.path
    })
  },

  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: TagViewsState, view: ITagView) {
    state.cacheViews = state.cacheViews.filter((v: any) => v !== view.name?.toString())
  },

  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: TagViewsState) {
    const affixTags = state.visitedViews.filter((it: ITagView) => it.meta?.affix)
    state.visitedViews = affixTags
  },

  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: TagViewsState) {
    state.cacheViews = []
  },

  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: TagViewsState, view: ITagView) {
    const fIndex = state.visitedViews.findIndex((it: ITagView) => it.path === view.path)
    state.visitedViews.splice(fIndex, 1, view)
  },

  [TagsMutationTypes.MENU_REFRESH](state: TagViewsState) {
    state.routerView = false
    setTimeout(() => {
      state.routerView = true
    }, 20)
  },
}
