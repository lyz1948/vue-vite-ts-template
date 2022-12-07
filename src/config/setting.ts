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
  '#003366',
  '#66CC66',
  '#99CC99',
  '#FF9999',
  '#CC99CC',
  '#CCFF00',
  '#333399',
  '#CC3399',
  '#666699',
  '#990066',
  '#000000',
]

export const settingConfig = {
  title: '旅游商城管理系统',
  // 模式 horizontal / vertical
  menuMode: 'vertical',
  language: 'zh-cn',
  theme: '#293246',
  menuColor: '#f1f1f1',
  menuActiveColor: '#7e9cff',
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
