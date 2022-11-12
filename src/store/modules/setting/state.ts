import { settingConfig } from '@/config/setting'

const {
  menuMode,
  theme,
  menuColor,
  menuActiveColor,
  language,
  size,
  collapse,
  fixedHead,
  visibleTab,
  visibleLogo,
  visibleSidebar,
  visibleBreadcrumb,
} = settingConfig

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface ISettingState {
  setting: boolean
  fixedHead: boolean
  visibleTab: boolean
  visibleLogo: boolean
  visibleBreadcrumb: boolean
  menuMode: string
  menuCollapse: boolean
  theme: string
  menuColor: string
  menuActiveColor: string
  device: DeviceType
  visibleSidebar: boolean
  language: string
  size: string
}

export const state: ISettingState = {
  setting: false, // 设置面板
  fixedHead, // 固定header
  visibleTab, // 显示tagview
  visibleLogo: visibleLogo, // 显示Logo
  visibleBreadcrumb, // 显示面包屑
  menuMode, // 菜单模式 vertical, horizontal
  menuCollapse: collapse, // 当页面为左右布局时，菜单折叠状态
  visibleSidebar,

  theme, // 皮肤颜色
  menuColor,
  menuActiveColor,
  device: DeviceType.Desktop,
  language,
  size,
}
