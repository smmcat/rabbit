import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives'
import persist from 'pinia-plugin-persistedstate'

// 引入全局组件插件
import { componentPlugin } from '@/components'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
