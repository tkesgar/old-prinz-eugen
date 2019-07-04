import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import TermsOfServices from './views/TermsOfServices'
import PrivacyPolicy from './views/PrivacyPolicy'
import NotFound from './views/NotFound'
import Callback from './views/Callback'
import Home from './views/Home'
import EditChara from './views/EditChara'

Vue.use(Router)

// TODO Pindahkan route navigation guards ke views
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/chara/:charaId/edit',
      component: EditChara
    },
    {
      path: '/tos',
      component: TermsOfServices
    },
    {
      path: '/privacy',
      component: PrivacyPolicy
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
