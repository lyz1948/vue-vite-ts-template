import { MutationTree } from 'vuex'
import { ISettingState } from './state'
import { SettingMutationTypes } from './mutation-types'
import { settingConfig } from '@/config/setting'
import { setLanguage } from '@/utils/cookies'

type themeKeys = typeof settingConfig
export type Mutations<S = ISettingState> = {
  [SettingMutationTypes.LANGUAGE_SET](
    state: S,
    lang: string
  ): void
  [SettingMutationTypes.UPDATE_SETTING](
    state: S,
    opts: { type: string; val: any }
  ): void
}

export const mutations: MutationTree<ISettingState> & Mutations = {
  [SettingMutationTypes.LANGUAGE_SET](
    state: ISettingState,
    lang: string
  ) {
    state.language = lang
    setLanguage(lang)
  },
  [SettingMutationTypes.UPDATE_SETTING](
    state: ISettingState,
    opts: { type: keyof themeKeys; val: any }
  ) {
    const { type, val } = opts
    state[type] = val
  },
}
