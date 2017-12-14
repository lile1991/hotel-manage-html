import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/', redirect: '/room/manage', hidden: true},
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/room',
    component: Layout,
    icon: 'tubiao',
    name: '前台',
    // noDropdown: true,
    children: [
      { path: 'manage', name: '客房管理', component: _import('room/Manage') },
      { path: 'checkIn', name: '入住登记', component: _import('room/CheckIn') }
    ]
  },
  {
    path: '/checkRecord',
    component: Layout,
    icon: 'tubiao',
    name: '入住管理',
    noDropdown: true,
    children: [
      { path: 'manage', name: '入住管理', component: _import('checkRecord/Manage') },
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '顾客管理',
    icon: 'zujian',
    children: [
      { path: 'index', name: '', icon: 'zonghe', component: _import('page/form') },
      { path: 'index', name: '取消预约', icon: 'zonghe', component: _import('page/form') },
      { path: 'index', name: '预约管理', icon: 'zonghe', component: _import('page/form') }
    ]
  },

  /*{
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  },*/

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
