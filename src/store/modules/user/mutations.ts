import { IUserState } from './state'
import { MutationTree } from 'vuex'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = IUserState> = {
  [UserMutationTypes.SET_USER_NAME](state: S, username: string): void
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_AVATAR](state: S, avatar: string): void
  [UserMutationTypes.SET_INTRODUCE](state: S, introduce: string): void
  [UserMutationTypes.SET_EMAIL](state: S, email: string): void
  [UserMutationTypes.SET_ROLES](state: S, roles: string[]): void
  [UserMutationTypes.SET_USER_INFO](state: S, userinfo: any): void
}

export const mutations: MutationTree<IUserState> & Mutations = {
  [UserMutationTypes.SET_USER_NAME](state: IUserState, username: string) {
    state.username = username
  },
  [UserMutationTypes.SET_TOKEN](state: IUserState, token: string) {
    state.token = token
  },
  [UserMutationTypes.SET_AVATAR](state: IUserState, avatar: string) {
    state.avatar = avatar
  },
  [UserMutationTypes.SET_INTRODUCE](state: IUserState, introduce: string) {
    state.introduce = introduce
  },
  [UserMutationTypes.SET_EMAIL](state: IUserState, email: string) {
    state.email = email
  },
  [UserMutationTypes.SET_ROLES](state: IUserState, roles: string[]) {
    state.roles = roles
  },
  [UserMutationTypes.SET_USER_INFO](state: IUserState, userinfo: any) {
    state.userinfo = userinfo
  },
}
