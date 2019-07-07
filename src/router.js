import Vue from 'vue'
import Router from 'vue-router'
import PageCallback from './components/PageCallback'
import PageNotFound from './components/PageNotFound'
import PageTermsOfServices from './components/PageTermsOfServices'
import PagePrivacyPolicy from './components/PagePrivacyPolicy'
import PageIndex from './components/PageIndex'
import PageChara from './components/PageChara'
import PageForbidden from './components/PageForbidden'
import MainCharaView from './components/MainCharaView'
import MainCharaEdit from './components/MainCharaEdit'
import MainCharaEditProfile from './components/MainCharaEditProfile'
import MainCharaEditImages from './components/MainCharaEditImages'

Vue.use(Router)

// TODO Pindahkan route navigation guards ke views
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /*
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
    */
    {
      path: '/chara/:charaId',
      component: PageChara,
      props: route => {
        return {
          charaId: parseInt(route.params.charaId, 10)
        }
      },
      children: [
        {
          path: '',
          component: MainCharaView
        },
        {
          path: 'edit',
          component: MainCharaEdit,
          children: [
            {
              path: '',
              redirect: 'profile'
            },
            {
              path: 'profile',
              component: MainCharaEditProfile
            },
            {
              path: 'images',
              component: MainCharaEditImages
            }
          ]
        }
      ]
    },
    {
      path: '/',
      component: PageIndex
    },
    {
      path: '/tos',
      component: PageTermsOfServices
    },
    {
      path: '/privacy',
      component: PagePrivacyPolicy
    },
    {
      path: '/_callback',
      component: PageCallback
    },
    {
      path: '/403',
      component: PageForbidden
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
