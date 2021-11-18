import { createApp } from 'vue'
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
  AllApplication,
} from '@icon-park/vue-next'
import '@icon-park/vue-next/styles/index.css'

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
  AllApplication,
]

import SvgIcon from '@/components/SvgIcon/index.vue'
export default (app: ReturnType<typeof createApp>) => {
  app.component('svg-icon', SvgIcon)
  components.forEach((component) => {
    if (~component.name.indexOf('icon-')) {
      app.component(component.name.replace('icon-', ''), component)
    }
  })
}
