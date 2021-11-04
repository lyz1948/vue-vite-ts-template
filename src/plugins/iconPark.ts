import { createApp } from 'vue'
// iconpark
import {
  User,
  Lock,
  Alipay,
  Wechat,
  Github,
  Down,
  Logout,
  MenuFold,
  MenuUnfold,
  Setting,
  Remind,
  FullScreenOne,
  Refresh,
  Home,
  Dashboard,
  Mail,
} from '@icon-park/vue-next'
import '@icon-park/vue-next/styles/index.css'
// el-icon
// 所需的组件
export const components = [
  User,
  Lock,
  Alipay,
  Wechat,
  Github,
  Down,
  Logout,
  MenuFold,
  MenuUnfold,
  Setting,
  Remind,
  FullScreenOne,
  Refresh,
  Home,
  Dashboard,
  Mail,
]

import SvgIcon from '@/components/SvgIcon/index.vue'
// 注册
export default (app: ReturnType<typeof createApp>) => {
  app.component('svg-icon', SvgIcon)
  components.forEach(component => {
    if (~component.name.indexOf('icon-')) {
      app.component(component.name.replace('icon-', ''), component)
    }
  })
}
