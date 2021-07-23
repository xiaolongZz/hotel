import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        hidden: true,
        component: () => import('@/views/home/welcome'),
        meta: { title: '欢迎界面', icon: 'dashboard' }
      },

      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: { title: '首页', icon: 'dashboard' }
      }]
  },
  {
    path: '/orderlist',
    component: Layout,
    redirect: '/orderlist/ordermanagement',
    name: 'OrderList',
    meta: { title: '订单列表', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ordermanagement',
        name: 'Ordermanagement',
        component: () => import('@/views/orderList/orderManagement'),
        meta: { title: '订单管理', icon: 'table' }
      },
      {
        path: 'evaluationmanagement',
        name: 'Evaluationmanagement',
        component: () => import('@/views/orderList/evaluationmanagement'),
        meta: { title: '评价管理', icon: 'tree' },
      },
      {
        path:'detail',
        name:'EvaluateDetail',
        component: () => import('@/views/orderList/evaluateDetail'),
        meta: { title: '评价详情', icon: 'tree' },
        hidden:true
      }
    ]
  },

  {
    path: '/room',
    component: Layout,
    redirect: '/room/roomlist',
    name: 'Room',
    meta: { title: '客房管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'roomlist',
        name: 'Roomlist',
        component: () => import('@/views/room/roomList'),
        meta: { title: '客房列表', icon: 'table' }
      },
      {
        path: 'roomAdministration',
        name: 'RoomAdministration',
        component: () => import('@/views/room/roomAdministration'),
        meta: { title: '分类管理', icon: 'tree' }
      }
    ]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [


  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
