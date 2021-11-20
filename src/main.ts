import { createApp, Directive } from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store'
import baseComponent from './components'
import iconPark from './plugins/iconPark'
import i18n from './plugins/i18n'
import * as directives from './directives'
import ElementPlus from 'element-plus'
import './permission'
import 'normalize.css'
import 'element-plus/dist/index.css'
import './styles/element-variables.scss'

const app = createApp(App)

// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).use(ElementPlus).use(baseComponent).use(iconPark).use(i18n).mount('#app')
