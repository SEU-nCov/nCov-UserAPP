import App from './App'

import BASE_URL from 'utils/api.js'
Vue.prototype.$BASE_URL = BASE_URL

import user from 'utils/user.js'
Vue.prototype.$user = user

import dest from 'utils/dest.js'
Vue.prototype.$dest = dest

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif