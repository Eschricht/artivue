import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createArtivue } from 'artivue'
import { midnight } from 'artivue/themes'
import App from './App.vue'

import './styles/main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const artivue = createArtivue({ theme: midnight })
app.use(router)
app.use(artivue)
app.mount('#app')
