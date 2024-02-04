import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

import { createArtivue, themes } from 'artivue'
import App from './App.vue'

import './styles/main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const plugin = createArtivue({ theme: themes.midnight })
app.use(router)
app.use(plugin)
app.mount('#app')
