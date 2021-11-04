import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store'
import iconPark from './plugins/iconPark'
import './permission'
import 'normalize.css'

const app = createApp(App)
// iconPark(app)

app.use(store).use(router).use(iconPark).mount('#app')
