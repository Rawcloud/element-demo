import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/Login'
import Container from '@/view/container/ContainerNew'
import Dashboard from '@/view/dashboard/index'
import Article from '@/view/article/index'
import Content from '@/view/article/content'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Container',
      component: Container,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard', name: '首页', component: Dashboard, icon: 'iconfont icon-user'
        },
        {
          path: 'article', name: '文章', component: Article, icon: 'iconfont icon-yaoshi-'
        }
      ]
    },
    {
      path: '/content/:id',
      component: Content
    }
  ]
})
