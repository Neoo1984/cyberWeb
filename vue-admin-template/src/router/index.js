import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import SubLayout from '@/views/sub/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    menu:'1',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/main/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', state: '1' }
    }]
  },
  {
    path: '/store-management',
    component: Layout,
    redirect: '/store-management',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/store-management/index'),
        name: 'Stores',
        meta: { title: '商户管理', icon: 'stores', affix: true, state: '1' }
      }
    ]
  },
  {
    path: '/factory',
    component: Layout,
    redirect: '/factory',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/factory/index'),
        name: 'Factory',
        meta: { title: '厂商管理', icon: 'factory', affix: true, state: '1' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/product/index'),
        name: 'Product',
        meta: { title: '产品管理', icon: 'product', affix: true }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/device/index'),
        name: 'Device',
        meta: { title: '设备管理', icon: 'device', affix: true, state: '1' }
      }
    ]
  },
  {
    path: '/package',
    component: Layout,
    redirect: '/package',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/package/index'),
        name: 'Package',
        meta: { title: '升级包管理', icon: 'package', affix: true, state: '1' }
      }
    ]
  },
  {
    path: '/ota',
    component: Layout,
    redirect: '/ota',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/ota/index'),
        name: 'Ota',
        meta: { title: 'ota任务管理', icon: 'ota', affix: true, state: '1' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [
      {
        path: 'index',
        component: () => import('@/views/main/user/index'),
        name: 'User',
        meta: { title: '用户管理', icon: 'user', affix: true, state: '1' }
      }
    ]
  },

  {
    path: '/detail',
    component: () => import('@/views/sub/detail/index'),
    hidden: true

  },

  {
    path: '/info',
    component: SubLayout,
    redirect: '/info',
    children: [{
      path: 'index',
      name: 'Info',
      component: () => import('@/views/sub/info/index'),
      meta: { title: '设备基本信息', state: '2' }
    }]
  },
  {
    path: '/command',
    redirect: '/command',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/command/index'),
        name: 'Command',
        meta: { title: '设备指令', state: '2' }
      }
    ]
  },
  {
    path: '/maintenance',
    redirect: '/maintenance',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/maintenance/index'),
        name: 'Maintenance',
        meta: { title: '设备维护', state: '2' }
      }
    ]
  },
  {
    path: '/battery',
    redirect: '/battery',
    component: SubLayout,
    meta: { title: '电池包数据', state: '2' },
    children: [
      {
        path: 'batteryInfo',
        component: () => import('@/views/sub/battery/index'),
        name: 'Battery',
        meta: { title: '电池包数据', state: '2' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/sub/battery/item/index'),
            name: 'Item',
            meta: { title: '我是item',state:'2' }
          }
        ]
      }
    ]
  },
  {
    path: '/doTest',
    redirect: '/doTest',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/doTest/index'),
        name: 'DoTest',
        meta: { title: 'Do测试', state: '2' }
      }
    ]
  },
  {
    path: '/diTest',
    redirect: '/diTest',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/diTest/index'),
        name: 'DiTest',
        meta: { title: 'Di测试', state: '2' }
      }
    ]
  },

  {
    path: '/autoControl',
    redirect: '/autoControl',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/autoControl/index'),
        name: 'AutoControl',
        meta: { title: '自动控制', state: '2' }
      }
    ]
  },
  {
    path: '/setting',
    redirect: '/setting',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/setting/index'),
        name: 'Setting',
        meta: { title: '换电柜设置', state: '2' }
      }
    ]
  },
  {
    path: '/warning',
    redirect: '/warning',
    component: SubLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sub/warning/index'),
        name: 'Warning',
        meta: { title: '换电柜告警', state: '2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
