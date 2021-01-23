import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/common.css'

Vue.component('HelloWorld', (resolve, reject) => {
  // eslint-disable-next-line
  require(['./components/HelloWorld.vue'], (res) => {
    resolve(res)
  })
})

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
