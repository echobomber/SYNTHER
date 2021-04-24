import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// Veevalidate
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// vue3-loading-overlay (注意，官網的 import 方式有寫錯)
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// mitt 全域註冊
import bus from './bus'

// vee-validate 驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系

const app = createApp(App)
app.use(store).use(router)
app.use(VueAxios, axios)
app.config.globalProperties.$bus = bus
// 註冊 vee-validate 三個全域元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
// loading
app.component('Loading', Loading)
app.mount('#app')

// 路由守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((res) => {
      console.log(res.data)
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
