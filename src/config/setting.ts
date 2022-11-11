export enum MenuModeEnum {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export const modeOpts = [
  {
    value: 'vertical',
    label: '左右布局',
  },
  {
    value: 'horizontal',
    label: '上下布局',
  },
]

export const themeColorOpts = [
  '#43a9be',
  '#f85f47',
  '#fb748b',
  '#6273d9',
  '#409EFF',
  '#f5222d',
]

export const settingConfig = {
  title: 'Vue3 Vite Admin',
  // 模式 horizontal / vertical
  menuMode: 'vertical',
  language: 'zh-cn',
  theme: '#409EFF',
  size: 'medium',
  // 主题配置
  setting: false,
  // 是否固定头部
  fixedHead: true,
  // 是否显示全屏
  fullScreen: true,
  // 是否显示刷新
  refresh: true,
  // 是否显示通知
  notice: true,
  // 是否显示面包导航
  visibleBreadcrumb: true,
  // 是否显示logo
  visibleLogo: true,
  // 是否显示菜单
  visibleSidebar: true,
  // 是否显示标签
  visibleTab: true,
  // 是否展开菜单
  collapse: false,
}
