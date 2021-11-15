import { getToken } from '@/utils/cookies'

interface IUserinfo {
  [keys: string]: string | number
}

export interface IUserState {
  token: string
  username: string
  avatar: string
  introduce: string
  roles: string[]
  email: string
  userinfo: IUserinfo
}

export const state: IUserState = {
  token: getToken() || '',
  username: '',
  avatar: '',
  introduce: '',
  roles: ['admin'],
  email: '',
  userinfo: { id: '' },
}
