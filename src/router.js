import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import NotFound from './views/NotFound'
import Register from './views/Register'
import Login from './views/Login'
import Callback from './views/Callback'
import Dashboard from './views/Dashboard'
import checkAuthRoute from './lib/check-auth-route'
import store from './store'
import CharaNew from './views/CharaNew'
import CharaEdit from './views/CharaEdit'
import CharaView from './views/CharaView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index,
      beforeEnter (to, from, next) {
        if (_getUser()) {
          next('/home')
          return
        }

        next()
      }
    },
    {
      path: '/home',
      component: Dashboard,
      beforeEnter: checkAuthRoute(_getUser)
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
      path: '/chara/new',
      component: CharaNew
    },
    {
      path: '/chara/:key',
      component: CharaView
    },
    {
      path: '/chara/:key/edit',
      component: CharaEdit
    },
    {
      path: '/_callback',
      component: Callback
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

function _getUser () {
  return store.state.user || null
}
