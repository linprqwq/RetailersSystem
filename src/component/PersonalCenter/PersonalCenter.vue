<template>
  <div>
    <top></top>
    <div class="site-header">
      <div class="site-info">
        <div class="site-logo">
          <img src="image2/favicon.ico" alt="" width="56px" height="56px"/>
        </div>
        <div class="site-nav">
          <ul>
            <li><a href="">全部商品分类</a></li>
            <li><a href="">小米手机</a></li>
            <li><a href="">Redmi红米</a></li>
            <li><a href="">电视</a></li>
            <li><a href="">笔记本</a></li>
            <li><a href="">家电</a></li>
            <li><a href="">路由器</a></li>
            <li><a href="">智能硬件</a></li>
            <li><a href="">服务</a></li>
            <li><a href="">社区</a></li>
          </ul>
        </div>
        <div class="site-search ">
          <form action="">
            <input id="gname" type="text" name="gname" value="智能">
            <input id="gbtn" type="submit" value="搜索">
          </form>
        </div>

      </div>
    </div>
    <div class="mi-orderlist">
      <el-tabs :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane label="我的个人中心">
          <orderall></orderall>
        </el-tab-pane>
        <el-tab-pane label="我的自提点">地址组件</el-tab-pane>
        <el-tab-pane label="个人信息维护">个信息组件</el-tab-pane>
        <el-tab-pane label="充值">充值组件</el-tab-pane>
        <el-tab-pane label="商户">商户</el-tab-pane>
        <el-tab-pane label="供销商">
              <div v-if="gysState==1">
                <tabs></tabs>
              </div>
              <div v-else-if="gysState==0">
                <supplier_registration></supplier_registration>
              </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import IndexTop from "../User/IndexTop";
import orderall from "../Orderassembly/orderall";
import Supplier_registration from "../supplier/Supplier_registration";
import tabs from "../supplier/tabs";
import Recharge from "./Recharge";
export default {
  name: "PersonalCenter",
  data() {
    return {
      userid: sessionStorage.getItem('user'),
      useridd: sessionStorage.getItem('id'),
      tabPosition: 'left',
      gysState:""
    }
  },
  components: {
    Supplier_registration,
    top: IndexTop,
    orderall,
    Recharge,

    tabs
  },
  computed: {
    showLoginname() {
      return this.userid
    },
  },
  methods:{
    userGysone(){
      let params=new URLSearchParams();
      params.append("id",this.useridd);
      this.$axios.get("queryUserGysone.action/",{params:params}).
      then(response=>{
        this.gysState=response.data.gysState
      }).catch();
    }
  },
  created(){
    this.userGysone()
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

/*通用头部样式*/
.top {
  height: 41px;
  background-color: #333333;
  font-family: "Microsoft YaHei";
}

.zhong {
  width: 1227px;
  margin: 0 auto;
  height: 41px;
}

.zuo {
  float: left;
}

.zhong .ziti {
  float: left;
  height: 41px;
  line-height: 41px;
  font-size: 12px;
  margin-left: 0px;
}

.bj1 .topd .tu img {
  position: relative;
  top: 20px;
  width: 56px;
  height: 56px;
}

.he {
  float: right;
  height: 41px;
}

.zhong .ziti a:hover {
  color: red;
  background-color: white;

}

.zhong .che {
  float: left;
  height: 41px;
  width: 31px;
  line-height: 41px;
  margin-right: 0px;
}


.zhong a {
  color: #B0B0B0;
  display: inline-block;
  text-decoration: none;
  font-size: 12px;
  margin: 0px 8px;
  height: 41px;
  line-height: 41px;
}

.zhong a:hover {
  color: white;
}

.you {
  float: right;
  height: 41px;
}

.top .zhong .che a:hover {
  background-color: white;
  color: black;
}

.yincang {
  display: none;
}

/*通用底部样式*/
.site-footer {
  clear: both;

}

.wenzitiao {
  height: 308px;
  background-color: white;
  margin-top: 30px;
  padding-top: 20px;

}

.wenzitiaoxia {
  width: 1226px;
  height: 40px;
  margin: 0 auto;
  background-color: white;
}

.wenzitiaoxia a {
  display: inline-block;
  float: left;
  color: black;
  text-decoration: none;
  border-right: 1px solid #E0E0E0;
  width: 240px;
  height: 40px;
  margin-left: 2px;
  line-height: 40px;
  text-align: center;
  position: relative;
}

.wenzitiaoxia .shebian {
  border-right: 0px;
}

.wenzitiaoxia a:hover {
  color: #ff5c00;
}

.wenzitiaoxia a .img1 {
  position: absolute;
  top: 7px;
  left: 46px;
}

.wenzitiaoxia a .img2 {
  position: absolute;
  top: 7px;
  left: 42px;
}

.wenzitiaoxia a .img3 {
  position: absolute;
  top: 7px;
  left: 46px;
}

.wenzitiaoxia a .img4 {
  position: absolute;
  top: 7px;
  left: 4px;
}

.wenzitiaoxia a .img5 {
  position: absolute;
  top: 7px;
  left: 32px;
}

.wenzixiaxia {
  width: 1227px;
  height: 190px;
  background-color: white;
  border-top: 1px solid #E0E0E0;
  margin: 30px auto;
  padding: 20px;
}

.xiali, .xiali2, .xiali3, .xiali4, .xiali5, .xiali6 {

  height: 100px;
  width: 100px;
  background-color: white;
  text-align: center;
  line-height: 30px;
  font-size: 10px;
  color: #E0E0E0;
  margin-top: 10px;
  margin-left: 30px;
}

.xiali7 {

  height: 100px;
  width: 170px;
  background-color: white;
  text-align: center;
  line-height: 30px;
  font-size: 10px;
  color: #757575;
  margin-top: -5px;
  margin-left: 20px;
  border-left: 1px solid #E0E0E0;
}

.xiada7 {
  margin-left: 20px;
  height: 40px;
  width: 150px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  color: #FF7529;
  font-size: 14px;
  border-left: 1px solid #E0E0E0;

}

.xiada, .xiada2, .xiada3, .xiada4, .xiada5, .xiada6 {
  margin-left: 9px;
  height: 40px;
  width: 150px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.f1, .f2, .f3, .f4, .f5, .f6, .f7 {
  float: left;
}

.wenzixiaxia a {
  color: #333333;
  text-decoration: none;
}

.wenzixiaxia .f1 ul li a {
  color: #333333;
}

.wenzixiaxia .f2 ul li a {
  color: #333333;
}

.wenzixiaxia .f3 ul li a {
  color: #333333;
}

.wenzixiaxia .f4 ul li a {
  color: #333333;
}

.wenzixiaxia .f5 ul li a {
  color: #333333;
}

.wenzixiaxia .f6 ul li a {
  color: #333333;
}

.wenzixiaxia .f1 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f2 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f3 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f4 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f5 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f6 ul li a:hover {
  color: #FF7529;
}

.xiali7 .diyia {
  border: 1px solid #FF7529;
  display: block;
  width: 100px;
  margin: 0 auto;
  position: relative;
  color: #FF7529;
}

.xiali7 .diyia:hover {
  background-color: #FF7529;
  color: white;
}

.xiali7 .diyia img {
  position: absolute;
  top: 7px;
  left: 8px;
}

.diera {
  width: 150px;
  height: 50px;
  background-color: white;
  position: relative;
}

.diera .dd {
  position: absolute;
  top: 2px;
  right: 25px;
}

.diera .tt {
  position: absolute;
  top: 2px;
  right: 2px;
}

.zuihouxiaozi {
  height: 140px;
  width: 1227px;
  margin: 20px auto;
  background-color: #FAFAFA;
}

.zuihouxiaozitu {
  float: left;
  background-color: #FAFAFA;
  height: 140px;
  width: 70px;
}

.zuihouxiaozizi {
  float: left;
  height: 160px;
  width: 1157px;
  margin-top: 10px;
}

.zuihouxiaozizi a {
  font-size: 10px;
  color: #757575;
  text-decoration: none;
}

.zuihouxiaozizi a:hover {
  color: #FF6A00;
}

.zuihouxiaozizi span {
  font-size: 10px;
  color: #757575;
}

.dibuzi {
  margin-top: 70px;
  height: 50px;
}

.dibuzi p {
  text-align: center;
  font-size: 16px;
  color: #CBCBCB;
  font-weight: 200;
}

.xiali7 ul {
  position: relative;
  left: 25px;
}

.xiada7 span {
  position: relative;
  left: 25px;
}

.site-header .site-info {
  width: 1226px;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
}

.site-info .site-logo {
  display: inline-block;
  width: 112px;
  height: 100px;
  float: left;
  vertical-align: middle;
}

.site-logo img {
  padding-top: 25px;
}

.site-info .site-nav {
  width: 800px;
}

.site-info .site-nav ul {
  display: inline-block;
}

.site-info .site-nav ul li {
  display: inline-block;
  margin-right: 10px;
  line-height: 100px;
  text-align: center;
}

.site-info .site-nav ul li a {
  color: #000000;
  text-decoration: none;
}

.site-info .site-nav ul li a:hover {
  color: #ff6700;
}

.site-info .site-search {
  position: relative;
  top: -70px;
  width: 320px;
  display: inline-block;
  float: right;
}

.site-search #gname {
  width: 245px;
  height: 50px;
  color: #757575;
  border: 1px solid #e0e0e0;
}

.site-search #gbtn {
  width: 50px;
  height: 50px;
  background-color: #FFFFFF;
  border: 1px solid #e0e0e0;
  cursor: pointer;
}

.site-search #gbtn:hover {
  background-color: #ff6700;
}

.orange {
  color: #ff6700;
}

.black {
  color: #757575;
}

.mi-orderlist {
  background-color: #f5f5f5;
  padding-bottom: 50px;
  overflow: hidden;
}

.container ul li a {
  text-decoration: none;
  color: #757575;
  font-size: 12px;
}

.container ul li a:hover {
  color: #ff6700;
}

.mi-container {
  width: 1240px;
  margin: 0 auto;
}

.container ul li {
  color: #757575;
  font-size: 12px;
  display: inline-block;
}

.container {
  width: 1226px;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
}

.mi-box .mi-left, .mi-right {
  background-color: #fff;
  display: inline-block;
}

.mi-box .mi-left {
  width: 234px;
  float: left;
  clear: both;
}

.mi-box .mi-right {
  width: 978px;
  margin-left: 10px;

}

.mi-left .row {
  padding-top: 30px;
  padding-bottom: 50px;
}

.row .row-info {
  width: 138px;
  margin: 0 auto;
}

.row .row-info p {
  color: #333333;
  font-size: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row-info ul li .a1 {
  color: #ff6700;
}

.row-info ul li a {
  font-size: 14px;
  line-height: 26px;
  color: #757575;
  text-decoration: none;
  cursor: pointer;
}

.row-info ul li a:hover {
  color: #333333;
}

.mi-right .right-top {
  width: 882px;
  height: 224px;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 1px rgba(170, 170, 170, 0.5) solid;
}

.mi-right .right-foot {
  width: 882px;
  margin: 0 auto;
}

.right-top .user-card {
  display: inline-block;
  vertical-align: middle;
  padding-top: 35px;
}

.right-top .user-card img {
  width: 160px;
  height: 160px;
  border: 1px solid #e0e0e0;
  border-radius: 150px;
  vertical-align: middle;
}

.user-card .card-info {
  display: inline-block;
  vertical-align: middle;
}

.user-card .card-info h2 {
  display: inline-block;
  font-size: 24px;
  font-weight: 400;
  color: #616161;
}

.user-card .card-info p {
  color: #b0b0b0;
  font-size: 14px;
}

.user-card .card-info a {
  color: #ff6700;
  font-size: 12px;
  text-decoration: none;
  line-height: 40px;
}

.right-top .user-actions {
  display: inline-block;
  vertical-align: middle;
  width: 358px;
  float: right;
  margin-top: 65px;
}

.user-actions ul li {
  color: #757575;
  font-size: 14px;
  line-height: 30px;
}

.user-actions ul li .leave {
  color: #ffac13;
}

.right-foot ul {
  display: inline-block;
  width: 882px;
  height: 380px;
  margin: 0 auto;
  overflow: hidden;
}

.right-foot ul li {
  display: inline-block;
  width: 388px;
  height: 80px;
  margin-right: 25px;
  margin-top: 80px;
}

.right-foot ul li h3 {
  font-size: 18px;
  font-weight: 400;
  color: #757575;
}

.right-foot ul li h3 span {
  color: #ff6700;
}

.right-foot ul li a {
  color: #757575;
  font-size: 14px;
  text-decoration: none;
}

.right-foot ul li a:hover {
  color: #ff6700;
}

.right-foot ul li img {
  vertical-align: middle;
}

.right-foot ul li .foot-info {
  display: inline-block;
  vertical-align: middle;
}

/*个人中心*/
.uc-box {
  display: none;
}

/*我的订单*/
.uc-box .box-hd {
  width: 882px;
  margin: 0 auto;
  padding-bottom: 30px;
}

.uc-box .hd-top h1 {
  padding-top: 30px;
  color: #757575;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
}

.hd-top h1 small {
  font-size: 12px;
}

.hd-top h1 small a {
  color: #757575;
  font-size: 12px;
  text-decoration: none;
}

.hd-info .hd-items, .hd-search {
  overflow: hidden;
  display: inline-block;
}

.hd-items ul li {
  display: inline-block;
}

.hd-items ul li a {
  color: #757575;
  text-decoration: none;
  vertical-align: middle;
}

.hd-items ul li span {
  margin: 0 20px;
  font-weight: lighter;
  color: #757575;
}

.hd-info .hd-search {
  float: right;
  padding-bottom: 10px;
}

.hd-info .hd-search input {
  width: 221px;
  height: 42px;
  border: 1px solid #e0e0e0;
}

.hd-info .hd-search button {
  width: 42px;
  height: 42px;
  background-color: #fff;
  border: 1px solid #e0e0e0;

}

.uc-box .order-list {
  width: 882px;
  margin: 0 auto;
  font-size: 18px;
  color: #B0B0B0;
}

.order-list {
  border: 1px solid #B0B0B0;
  padding-top: 20px;
}

.order-list .order-top, .order-foot {
  width: 802px;
  margin: 0 auto;
}

.order-list .order-top div {
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.order-top .top-img {
  float: right;
  clear: both;
}

.order-list table .col-main {
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.order-list table .col-info {
  font-size: 14px;
  font-weight: lighter;
  color: #757575;
  text-align: left;
}

.order-list table .col-info span {
  margin: 0 5px;
}

.order-list table .col-info a {
  text-decoration: none;
  color: #757575;
}

.order-list table .col-info a:hover {
  color: #ff6700;
}

.col-main .col-price {
  font-size: 14px;
  font-weight: lighter;
  color: #757575;
}

.col-main .col-price span {
  font-size: 28px;
  color: #333333;
}

.col-main .col-price {
  width: 200px;
}

tbody .order-items {
  width: 600px;
}

tbody .order-actions {
  overflow: hidden;
}

tbody .order-pms, .order-price {
  display: inline-block;
  vertical-align: middle;
}

tbody .order-pms img {
  width: 80px;
  height: 80px;
}

tbody ul {
  padding-top: 20px;
}

tbody .order-price {
  font-size: 14px;
  color: #333333;
}

tbody .order-price p a {
  color: #333333;
  text-decoration: none;
}

tbody .order-price p a:hover {
  color: #ff6700;
}

tbody .order-btn {
  float: right;
  width: 120px;
  height: 30px;
  text-align: center;
  margin-top: 10px;
  border: 1px solid #b0b0b0;
}

tbody .order-btn a {
  text-decoration: none;
  color: #757575;
  font-size: 12px;
}

.order-bootom {
  padding-top: 30px;
  padding-bottom: 30px;
}

.order-bootom .mi-pagenav {
  width: 882px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 0 auto;
}

.mi-pagenav span {
  vertical-align: middle;
  display: inline-block;
  margin: 0 10px;
}

.mi-pagenav .sp {
  font-size: 26px;
  font-weight: 400;
  color: #B0B0B0;
}

.mi-pagenav .sp2 {
  display: inline-block;
  width: 48px;
  line-height: 30px;
  height: 30px;
  color: #FFFFFF;
  text-align: -webkit-match-parent;
  background-color: #757575;
}
</style>
