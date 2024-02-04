import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'normalize.css'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locales.mjs'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.mount('#app')
