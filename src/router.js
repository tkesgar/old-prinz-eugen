import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import NotFound from './views/NotFound'
import Register from './views/Register'
import Login from './views/Login'
import Callback from './views/Callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/_callback',
      component: Callback
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
