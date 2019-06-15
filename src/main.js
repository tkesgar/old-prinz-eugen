import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render (h) {
    return h(App)
  }
}).$mount('#app')
