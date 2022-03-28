import Vue from 'vue'

//导入router.js
import VueRouter from 'vue-router'
import Login from '../component/Login'
import Index from '../component/Index'
//Vue组件使用Vue-router组件*******************
Vue.use(VueRouter)

//路由数组
var routes=[
  {
    path:"/",
    redirect:"/login"
  },
  {
    path: "/index",
    name:"index",
    component:Index
  },
  {
    path: "/login",
    name:"login",
    component: Login
  }
]

//路由管理器
var router = new VueRouter({
  routes
})

export default router
