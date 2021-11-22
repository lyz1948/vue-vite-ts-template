import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

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
  Close,
  Minus,
  ToLeft,
  ToRight,
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
  Close,
  ToLeft,
  ToRight,
  Minus,
]

export default (app: ReturnType<typeof createApp>) => {
  app.component('SvgIcon', SvgIcon)
  components.forEach(component => {
    app.component(component.name, component)
  })
}
