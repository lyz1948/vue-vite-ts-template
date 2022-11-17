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
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    open: true,
    withoutAnimation: true,
  },
  language: 'zh',
  size: 'medium',
}
