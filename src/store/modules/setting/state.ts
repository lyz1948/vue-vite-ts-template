export interface ISettingState {
  visibleSetting: boolean
  fixHead: boolean
  fixTagView: boolean
  menuMode: string
  menuCollapse: boolean
  routerView: boolean
  theme: string
}

export const state: ISettingState = {
  visibleSetting: false, // 设置面板
  fixHead: false, // 固定header
  fixTagView: false, // 固定tagview
  menuMode: 'vertical', // 菜单模式 vertical, horizontal
  menuCollapse: false, // 当页面为左右布局时，菜单折叠状态
  routerView: true, // 是否显示路由
  theme: '#409eff' // 皮肤颜色
}
