import Vue from 'vue'
import Login from "./component/Login";
import SystemList from "./component/SystemList";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommodityDisplay from "./component/Commodity/CommodityDisplay";
import ShoppingFalst from './component/Cart/ShoppingFalst'
import Router from './config/routerconfig'
import shopping from "./component/Cart/shopping2";
import PersonalCenter from "./component/PersonalCenter/PersonalCenter";
import OrderTijiao from "./component/Cart/OrderTijiao";
import App from "./App";
import Zlwh from "./component/shzlwh/Zlwh";
import Allorder from "./component/Shorder/Allorder";
Vue.use(ElementUI)
//axios
import  Axios from 'axios'

//设置axios默认访问路径
Axios.defaults.baseURL = "http://127.0.0.1:9090/RetailersBackSystem"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(Allorder),
  router:Router,
})
