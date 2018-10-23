import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

import Vue from 'vue';

NProgress.configure({ showSpinner: false })// NProgress Configuration

//设置权限白名单
const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  if (Vue.prototype.$openPerssion) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles && store.getters.roles.length > 0) { // 判断当前用户是否已拉取完user_info信息
          const roles = store.getters.roles // note: roles must be a array! such as: ['editor','develop']
          await store.dispatch('GenerateRoutes', { roles });
          await router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next() 
        } else {
          next('/login'); 
      }
    }
  } else {
    /* 权限打开，开启注解*/
    // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    // }
    await store.dispatch('turnRouters');
    next();
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
