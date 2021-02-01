import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/web/login.vue' // 登录页
const Home = () => import('@/views/blog/index.vue') // 主页
const NewBlog = () => import('@/views/blog/newBlog.vue') // 新建
const Detail = () => import('@/views/blog/detail.vue') // 新建
const Test = () => import('@/views/test.vue') // 新建

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/index',
      name: '主页',
      component: Home
    },
    {
      path: '/new',
      name: '主页',
      component: NewBlog
    },
    {
      path: '/detail',
      name: '主页',
      component: Detail
    },
    {
      path: '/test',
      name: '主页',
      component: Test
    }
  ]
})
