// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
// 引用API文件
import api from './api/index.js'
import utils from './utils/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false
Vue.use(Element)
router.beforeEach((to, from, next) => {
  // ${to and from are Route Object,next() must be called to resolve the hook}
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = sessionStorage.getItem('user')
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
