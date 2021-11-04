import { ITagsViewState, TagView } from './state'
import { TagsMutationTypes } from './mutation-types'
import { MutationTree } from 'vuex'

export type Mutations<S = ITagsViewState> = {
  [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.ADD_VISITED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_VISITED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: S, view: TagView): void
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: S, view: TagView): void
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: S): void
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: S): void
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: S, view: TagView): void
}

export const mutations: MutationTree<ITagsViewState> & Mutations = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: ITagsViewState, view: TagView) {
    if (state.visitedViews.some(it => it.path == view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, { title: view.meta?.title || 'anonymous' })
    )
  },

  [TagsMutationTypes.ADD_CACHED_VIEW](state: ITagsViewState, view: TagView) {
    if (view.name === null) return
    if (state.cacheViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) {
      state.cacheViews.push(view.name?.toString())
    }
  },

  [TagsMutationTypes.DEL_VISITED_VIEW](state: ITagsViewState, view: TagView) {
    const fIndex = state.visitedViews.findIndex(it => it.path == view.path)
    state.visitedViews.splice(fIndex, 1)
  },

  [TagsMutationTypes.DEL_CACHED_VIEW](state: ITagsViewState, view: TagView) {
    if (view.name === null) return
    const index = state.cacheViews.indexOf(view.name?.toString())
    index > -1 && state.cacheViews.splice(index, 1)
  },

  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](
    state: ITagsViewState,
    view: TagView
  ) {
    state.visitedViews = state.visitedViews.filter(it => {
      return it.meta?.affix || it.path == view.path
    })
  },

  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](
    state: ITagsViewState,
    view: TagView
  ) {
    state.cacheViews = state.cacheViews.filter(v => v !== view.name?.toString())
  },

  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: ITagsViewState) {
    const affixTags = state.visitedViews.filter(it => it.meta?.affix)
    state.visitedViews = affixTags
  },

  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: ITagsViewState) {
    state.cacheViews = []
  },

  [TagsMutationTypes.UPDATE_VISITED_VIEW](
    state: ITagsViewState,
    view: TagView
  ) {
    const fIndex = state.visitedViews.findIndex(it => it.path === view.path)
    state.visitedViews.splice(fIndex, 1, view)
  },
}
