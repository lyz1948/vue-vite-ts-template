import { createLogger, createStore } from 'vuex'

import { store as app, AppStore, AppState } from '@/store/modules/app'

import { store as user, UserStore, UserState } from '@/store/modules/user'

import { store as tagViews, TagViewsStore, TagViewsState } from '@/store/modules/tagViews'

import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'

import { store as setting, SettingStore, SettingState } from '@/store/modules/setting'

import { store as product, ProductStore, ProductState } from '@/store/modules/product'

import { store as dictionary, DictionaryStore, DictionaryState } from '@/store/modules/system/dictionary'

import { store as source,SourceStore,SourceState } from '@/store/modules/system/source'

import {
  store as staff,
  StaffStore,
  StaffState,
} from '@/store/modules/system/staff'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger()] : []

export interface RootState {
  app: AppState
  user: UserState
  permission: PermissionState
  tagViews: TagViewsState
  setting: SettingState
  staff: StaffState
  source: SourceState
  product: ProductState
  dictionary: DictionaryState
}

export type Store = 
  AppStore<Pick<RootState, 'app'>> &
  UserStore<Pick<RootState, 'user'>> &
  PermissionStore<Pick<RootState, 'permission'>> &
  TagViewsStore<Pick<RootState, 'tagViews'>> &
  SettingStore<Pick<RootState, 'setting'>> &
  StaffStore<Pick<RootState, 'staff'>> &
  SourceStore<Pick<RootState, 'source'>> &
  ProductStore<Pick<RootState, 'product'>> &
  DictionaryStore<Pick<RootState, 'dictionary'>>

const store = createStore({
  plugins,
  modules: {
    app,
    user,
    permission,
    tagViews,
    setting,
    product,
    staff,
    source,
    dictionary,
  },
})

export function useStore(): Store {
  return store as Store
}

export default store
