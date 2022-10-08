import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './app.vue'
import Core from './views/core/index.vue';
import Debnug from './views/debug/index.vue';
import Design from './views/design/index.vue';


import './style.css'

const routes = [
  { path: '/core', component: Core },
  { path: '/debug', component: Debnug },
  { path: '/design', component: Design },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

createApp(App).use(router).mount('#app')
