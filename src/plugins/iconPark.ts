import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
// import TravelIcons from '@/components/Icon/icons.json'

// const TravelIconArr = []
// for (const item of TravelIcons) {
//   TravelIconArr.push(item.name.slice(0, 1).toUpperCase() + item.name.slice(1))
// }

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
  Translate,
  Table,
  Bug,
  Shield,
  Plus,
  FolderBlock,
  OrderedList,
  FormOne,
  Delete,
  CheckOne,
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
  Translate,
  Table,
  Bug,
  Shield,
  FolderBlock,
  Plus,
  OrderedList,
  FormOne,
  Delete,
  CheckOne,
]

export default (app: ReturnType<typeof createApp>) => {
  app.component('SvgIcon', SvgIcon)

  components.forEach(component => {
    app.component(component.name, component)
  })
}
