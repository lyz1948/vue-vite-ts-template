export const modeOpts = [
  {
    value: 'vertical',
    label: 'Vertical',
  },
  {
    value: 'horizontal',
    label: 'Horizontal',
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

const themeOptions = {
  theme1: { menuBgColor: '#ffffff', primary: '#7e9cff' },
  theme2: { menuBgColor: '#293246', primary: '#7e9cff' },
  theme3: { menuBgColor: '#ffffff', primary: '#08a17e' },
  theme4: { menuBgColor: '#293246', primary: '#08a17e' },
  theme5: { menuBgColor: '#ffffff', primary: '#f45555' },
  theme6: { menuBgColor: '#293246', primary: '#f45555' },
}
export const themeConfig = {
  // 模式 horizontal / vertical
  menuMode: 'vertical',
  // 主题 默认配置theme1
  // 注意⚠️ ：修改默认主题时，记得同步修改 element-variables.scss
  // 文件中的 $base-color-primary 默认值，否则不生效！！！
  theme: '#7a72ff',
  // 主题配置
  themeOptions,
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
  visibleLogo: false,
  // 是否显示标签
  visibleTab: true,
  // 是否展开菜单
  collapse: false,
}
