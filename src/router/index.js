import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/Login'
import Container from '@/view/container/ContainerNew2'
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
          path: 'dashboard',
          name: '首页',
          component: Dashboard,
          icon: 'iconfont icon-user',
          children: [
            { path: 'dashboard1', name: '首页1', component: Dashboard },
            { path: 'dashboard2',
              name: '首页2',
              component: Dashboard,
              children: [
                { path: 'dashboard21', name: '首页21', component: Dashboard },
                { path: 'dashboard22', name: '首页22', component: Dashboard }
              ] }
          ]
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
