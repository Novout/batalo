import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import ptBR from './lang/pt-BR'
import enUS from './lang/en-US'

const i18n = createI18n({
  locale: 'enUS',
  fallbackLocale: 'enUS',
  messages: {
    ptBR,
    enUS,
  },
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(i18n).mount('#app')
