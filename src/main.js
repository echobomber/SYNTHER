import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

// mitt 全域註冊
import bus from './bus'

const app = createApp(App)
app.use(store).use(router)
app.use(VueAxios, axios)
app.config.globalProperties.$bus = bus
app.mount('#app')

// createApp(App).use(store).use(router).mount('#app')
