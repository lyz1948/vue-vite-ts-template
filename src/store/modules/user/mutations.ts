import { UserState } from './state'
import { MutationTree } from 'vuex'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_ROLES](state: S, roles: string[]): void
  [UserMutationTypes.SET_USER_INFO](state: S, userinfo: any): void
  [UserMutationTypes.SET_USER_LIST](state: S, data: any): void
  [UserMutationTypes.SET_USER_DELETE](state: S, id: number): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
  },
  [UserMutationTypes.SET_ROLES](state: UserState, roles: string[]) {
    state.roles = roles
  },
  [UserMutationTypes.SET_USER_INFO](state: UserState, userinfo: any) {
    state.userinfo = userinfo
  },
  [UserMutationTypes.SET_USER_LIST](state: UserState, data: any) {
    state.userList = data
  },
  [UserMutationTypes.SET_USER_DELETE](state: UserState, id: number) {
    console.log('id:', id)
    state.userList = state.userList.filter(it => it.id !== id)
  },
}
