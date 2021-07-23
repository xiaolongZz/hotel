import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 1、顶部加载条配置
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 2、白名单设置：无需登录验证
const whiteList = ['/login','/home','orderlist','/orderlist/ordermanagement','/orderlist/evaluationmanagement','/welcome','/room','/room/roomlist','/room/roomAdministration','/orderlist/detail'] // no redirect whitelist

// 3、路由拦截
router.beforeEach(async(to, from, next) => {
  // 3.1、开启顶部加载条
  NProgress.start()

  // 3.2、设置页面标题
  document.title = getPageTitle(to.meta.title)

   // 3.4、检测当前是否登录：未登录直接跳转登录界面
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
        next()
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    next();
     // 3.3、白名单检测：白名单页面直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
