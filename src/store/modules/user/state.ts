import { getToken } from '@/utils/cookies'

interface IUserinfo {
  [keys: string]: string | number
}

export interface UserState {
  token: string
  roles: string[]
  userinfo: IUserinfo
  userList: Array<any>
}

export const state: UserState = {
  token: getToken() || '',
  roles: ['admin'],
  userinfo: {},
  userList: []
}
