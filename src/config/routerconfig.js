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
import Allorder from "../component/Shorder/Allorder";
import Dshorder from "../component/Shorder/Dshorder";
import Dthorder from "../component/Shorder/Dthorder";
import Yrhorder from "../component/Shorder/Yrhorder";
import Zlwh from "../component/shzlwh/Zlwh";
import Shzy from "../component/Shbj/Shzy";
import Recharge from "../component/PersonalCenter/Recharge";
import commmodity from "../component/shop/commmodity";
import Supplier_registration from "../component/supplier/Supplier_registration";
//Vue组件使用Vue-router组件*******************
Vue.use(VueRouter)

//路由数组
var routes=[
  {
    path:"/syslist",
    component:SystemList,
    name:"syslist_route"
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
  },
  {
    path: "/qbdd",
    component:Allorder
  }
  ,
  {
    path: "/dsh",
    component:Dshorder
  }
  ,
  {
    path: "/dth",
    component:Dthorder
  }
  ,
  {
    path: "/yth",
    component:Yrhorder
  }
  ,
  {
    path: "/zlwh",
    component:Zlwh
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
  },
  //购物车空空
  {
    path: "/shzy",
    component: Shzy
  },
  //供应商
  {
    path: "/Supplier_registration",
    name: "Supplier_registration",
    component: myshoppingkk
  },
  //充值
  {
    path: "/Recharge",
    name: "Recharge",
    component: Recharge
  }

]

//路由管理器
var router = new VueRouter({
  routes
})

export default router
