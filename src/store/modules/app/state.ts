import { ActiveValid, Refund, PhoneItem } from './interface'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType
  sidebar: {
    open: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
  mallRefund: Refund[] | []
  mallActive: ActiveValid | null
  mallPhoneList: PhoneItem[] | []
  mallConfig: any
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    open: true,
    withoutAnimation: true,
  },
  language: 'zh',
  size: 'medium',
  mallRefund: [],
  mallActive: null,
  mallPhoneList: [],
  mallConfig: null,
}
