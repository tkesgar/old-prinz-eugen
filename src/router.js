import Vue from 'vue'
import Router from 'vue-router'
import PageCallback from './components/PageCallback'
import PageNotFound from './components/PageNotFound'
import PageTermsAndConditions from './components/PageTermsAndConditions'
import PagePrivacyPolicy from './components/PagePrivacyPolicy'
import PageIndex from './components/PageIndex'
import PageChara from './components/PageChara'
import PageForbidden from './components/PageForbidden'
import PageLogin from './components/PageLogin'
import MainCharaView from './components/MainCharaView'
import MainCharaEdit from './components/MainCharaEdit'
import MainCharaEditProfile from './components/MainCharaEditProfile'
import MainCharaEditImages from './components/MainCharaEditImages'
import MainCharaEditBio from './components/MainCharaEditBio'
import MainCharaEditDelete from './components/MainCharaEditDelete'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
            },
            {
              path: 'bio',
              component: MainCharaEditBio
            },
            {
              path: 'delete',
              component: MainCharaEditDelete
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
      path: '/terms',
      component: PageTermsAndConditions
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
      path: '/login',
      component: PageLogin
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
