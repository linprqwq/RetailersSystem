import Vue from 'vue'

//导入router.js
import VueRouter from 'vue-router'
import Login from '../component/Login'
import Index from '../component/Index'
import SystemList from "../component/SystemList";
import EmpView from "../component/sysindex/sysguanli/employee/EmpView";
import EmpLogin from "../component/EmpLogin";
import CommodityDisplay from "../component/Commodity/CommodityDisplay";
import Register from "../component/Register";
import ShoppingFalst from '../component/Cart/ShoppingFalst'
import tabs from "../component/supplier/tabs";
import shopping2 from "../component/Cart/shopping2";
import OrderTijiao from "../component/Cart/OrderTijiao";
//Vue组件使用Vue-router组件*******************
Vue.use(VueRouter)

//路由数组
var routes=[
  {
    path:"/syslist",
    component:SystemList
  },
  {
    path:"/emplogin",
    component:EmpLogin
  },
  {
    path:"/login",
    component:Login,
    // meta:{
    //   requireAuth:true //判断是否需要登录
    // }
  },
  {
    path: "/",
    name:"index",
    component:Index,
  },
  // {
  //   path: "/login",
  //   name:"login",
  //   component: Login
  // },
  {
    path: "/register",
    component:Register,
  },

  {
    path: "/CommodityDisplay",
    name: "CommodityDisplay",
    component: CommodityDisplay
  },
  {
    path: "/ShoppingFalst",
    name:"ShoppingFalst",
    component: ShoppingFalst
  },
  {
    path: "/tabs",
    name:"tabs",
    component: tabs
  },
  {
    path: "/shopping2",
    name: "shopping2",
    component: shopping2
  },
  {
    path: "/ordertijiao",
    name: "ordertijiao",
    component: OrderTijiao
  }

]

//路由管理器
var router = new VueRouter({
  routes
})

export default router
