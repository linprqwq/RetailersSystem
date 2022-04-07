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
import PersonalCenter from "../component/PersonalCenter/PersonalCenter";
import myshoppingkk from "../component/Cart/myshoppingkk";
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
  //你没登录
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
  //购物车
  {
    path: "/shopping2",
    name: "shopping2",
    component: shopping2
  },
  //订单提交
  {
    path: "/ordertijiao",
    name: "ordertijiao",
    component: OrderTijiao
  },
  {
    path: "/personalCenter",
    name: "personalCenter",
    component: PersonalCenter
  },
  //购物车空空
  {
    path: "/myshoppingkk",
    name: "myshoppingkk",
    component: myshoppingkk
  }

]

//路由管理器
var router = new VueRouter({
  routes
})

export default router
