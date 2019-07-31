import Vue from 'vue'
import Router from 'vue-router'

const PageCallback = () => import(/* webpackChunkName: "pages-main" */ './components/PageCallback')
const PageForbidden = () => import(/* webpackChunkName: "pages-main" */ './components/PageForbidden')
const PageGo = () => import(/* webpackChunkName: "pages-main" */ './components/PageGo')
const PageIndex = () => import(/* webpackChunkName: "pages-main" */ './components/PageIndex')
const PageLogin = () => import(/* webpackChunkName: "pages-main" */ './components/PageLogin')
const PageNotFound = () => import(/* webpackChunkName: "pages-main" */ './components/PageNotFound')
const PagePrivacyPolicy = () => import(/* webpackChunkName: "pages-main" */ './components/PagePrivacyPolicy')
const PageRequireAuth = () => import(/* webpackChunkName: "pages-main" */ './components/PageRequireAuth')
const PageTermsAndConditions = () => import(/* webpackChunkName: "pages-main" */ './components/PageTermsAndConditions')

const PageChara = () => import(/* webpackChunkName: "pages-chara" */ './components/PageChara')
const MainCharaEdit = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaEdit')
const MainCharaEditBio = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaEditBio')
const MainCharaEditDelete = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaEditDelete')
const MainCharaEditImages = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaEditImages')
const MainCharaEditProfile = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaEditProfile')
const MainCharaView = () => import(/* webpackChunkName: "pages-chara" */ './components/MainCharaView')

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
      component: PageCallback,
      props: route => {
        return {
          action: route.query.action
        }
      }
    },
    {
      path: '/login',
      component: PageLogin
    },
    {
      path: '/go',
      component: PageGo,
      props: route => {
        return {
          url: route.query.url
        }
      }
    },
    {
      path: '/401',
      component: PageRequireAuth,
      props: route => {
        return {
          next: route.query.next || null
        }
      }
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
