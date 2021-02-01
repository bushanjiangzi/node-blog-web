import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/common.css'

const LoadingComp = {
  template: '<div>loading</div>'
}
const ErrorComp = {
  template: '<div>error</div>'
}
const AsyncComp = () => ({
  component: import('./components/HelloWorld.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: 200,
  timeout: 10000
})
Vue.component('HelloWorld', AsyncComp)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
