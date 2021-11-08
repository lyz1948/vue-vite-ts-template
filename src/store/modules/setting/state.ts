export interface ISettingState {
  visibleSetting: boolean
  fixHead: boolean
  fixTagView: boolean
  menuMode: string
  menuCollapse: boolean
}

export const state: ISettingState = {
  visibleSetting: false,
  fixHead: false,
  fixTagView: false,
  menuMode: 'vertical',
  menuCollapse: false,
}
