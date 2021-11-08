export interface ISettingState {
  visibleSetting: boolean
  fixHead: boolean
  fixTagView: boolean
  menuMode: string
  menuCollapse: boolean
  routerView: boolean
}

export const state: ISettingState = {
  visibleSetting: false,
  fixHead: false,
  fixTagView: false,
  menuMode: 'horizontal', // vertical
  menuCollapse: false,
  routerView: true, // 是否显示路由
}
