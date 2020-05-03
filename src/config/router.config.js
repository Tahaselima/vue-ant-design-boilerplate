// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'Anasayfa' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard',
        component: RouteView,
        meta: { title: 'Hakkımızda', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'Dashboard', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: 'analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            meta: { title: 'Web Sitesi', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/workplace',
            name: 'Workplace',
            meta: { title: 'LinkedIn Hesabı', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: 'test-work',
            name: 'TestWork',
            meta: { title: 'Youtube Kanalı', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // time
      {
        path: '/timelaps',
        redirect: '/#',
        component: PageView,
        meta: { title: 'Zaman Girişi', icon: 'form' }
      },

      // list
      {
        path: '/permission',
        redirect: '/#',
        component: PageView,
        meta: { title: 'İzinlerim', icon: 'table' }
      },

      // inf
      {
        path: '/information',
        component: PageView,
        redirect: '/#',
        meta: { title: 'Bilgi Bankası', icon: 'profile' }
      },

      // arge
      {
        path: '/ar-ge',
        component: PageView,
        redirect: '/#',
        meta: { title: 'ArGe Portalı', icon: 'check-circle-o' }
      },

      // message
      {
        path: '/message',
        component: PageView,
        redirect: '/#',
        meta: { title: 'Mesajlar', icon: 'mail' }
      },

      // help
      {
        path: '/help',
        component: PageView,
        redirect: '/#',
        meta: { title: 'Yardım', icon: 'warning' }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  }

]
