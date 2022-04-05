<template>
<div>
  <div class="top" >
    <div class="zhong">
      <div class="zuo">
        <a href="#">小米商城</a>
        <a href="#">MIUI</a>
        <a href="#">loT</a>
        <a href="#">云服务</a>
        <a href="#">天星数科</a>
        <a href="#">有品</a>
        <a href="#">小爱开放平台</a>
        <a href="#">企业团购</a>
        <a href="#">资质证照</a>
        <a href="#">协议规则</a>
        <a href="#">下载app</a>
        <a href="#">智能生活</a>
        <a href="#">Select Location</a>
      </div>
      <div class="you">
        <a @click="$router.push('/login')">登录</a>
        <a href="XiaoMi/zhuce.html">注册</a>
        <a href="#">消息通知</a>
        <div class="he">
          <div class="che">
            <a href="#"></a>
          </div>
          <div class="ziti">
            <a href="MyShopping.html">购物车 (0)</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="block">

    <el-carousel height="150px">
      <el-carousel-item v-for="item in carouseData" :key="item">
        <img class="small" :src="item.url ">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>
  <el-button @click="querysp()">商品详情按钮</el-button>
  <el-button @click="addspingcart()">加入购物车</el-button>
  <el-button @click="queryuserorder()">我的订单</el-button>
  <el-button @click="queryorderdfk()">待付款</el-button>
  <el-button @click="queryorderdsh()">待收货</el-button>
  <el-button @click="queryorderyth()">已提货</el-button>
  <el-button @click="addusergys()">申请成为供应商</el-button>

<!--  //面包屑-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品详情</el-breadcrumb-item>
  </el-breadcrumb>

<!--  //搜索-->
  <el-row>
    <el-col :span="3">
      <el-input></el-input>

    </el-col>
    <el-col :span="1">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
  </el-row>

<!--  商品展示-->

    <div class="page">
      <div class="page-box">
        <div class="page-img">
          <img src="src/image/sg1.jpg" width="560px" height="560px" alt=""/>
        </div>
        <div class="page-info">
          <div class="page-con">
<!--            //商品标题-->
            <h2>水果|超级无敌暴龙顶级sssssssssssssssssss水果1111111111111111111111111111111</h2>
<!--            //商品副标题-->
            <p>标准USB-C接口 / 数据传输、充电二合一 / 充电迅速、传输稳定 / 严格测试、安全护航</p>
          </div>
          <div style="background-color: red;height: 100px">
            <span>价格:</span>
            <span>9.9元</span>
          </div>
          <el-input-number v-model="num"  :min="1" :max="100" label="描述文字" style="height: 100px"></el-input-number>
          <div class="selected-list">

            <div class="total-price">
              总计：9.9元
            </div>
          </div>

          <div class="btn-box">

            <div class="favorite-btn">
              <el-button>立即购买</el-button>
            </div>
            <div class="sale-btn">
              <el-button class="btn-primary">加入购物车</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
export default {
  name: "CommodityDisplay",

  data(){
    return{
      num: 1,
      carouseData: [
        { url: "src/image/sg1.jpg" },
        { url: "src/image/jdlogin.png" },
      ],

    }
  },
  methods:{

    //查询商品
    querysp(){
      var params = new URLSearchParams();
      params.append("id",1)
      this.$axios.post("queryspid.action",params).then(res=>{
        console.log(res.data)
          alert(res.data)
      }).catch()
    },
    //加入购物车
    addspingcart(){
      var params = new URLSearchParams();
      //加入购物车  商品id 用户id 商品数量默认为1   如果购物车已有 购物车商品数量加1
      params.append("uid",3)
      params.append("cid",1)

      this.$axios.post("addspingcart.action",params).then(res=>{
        alert(res.data.msg);
      }).catch();
    },
    //订单查询
    queryuserorder(){
      //根据当前登录用户id  查询订单
      var params = new URLSearchParams();
      params.append("uid",1);
      this.$axios.post("queryuserorder.action",params).then(res=>{
        console.log(res.data);
      }).catch()
    },

    //待付款
    queryorderdfk(){
      var params = new URLSearchParams();
      params.append("uid",1);
      params.append("status",2);
      this.$axios.post("queryuserorder.action",params).then(res=>{
        console.log(res.data.records);
      }).catch()
    },
    //待收货
    queryorderdsh(){
      var params = new URLSearchParams();
      params.append("uid",1);
      params.append("status",3);
      this.$axios.post("queryuserorder.action",params).then(res=>{
        console.log(res.data.records);
      }).catch()

    },
    //已提货
    queryorderyth(){
      var params = new URLSearchParams();
      params.append("uid",1);
      params.append("status",4);
      this.$axios.post("queryuserorder.action",params).then(res=>{
        console.log(res.data.records);
      }).catch()
    },
    addusergys(){
      var params = new URLSearchParams();
      this.$axios.post("",params).then(res=>{

      }).catch()
    }
  },


}

</script>

<style scoped>
.bj1 {
  background-color: white;
  height: 760px;
}

.top {
  height: 41px;
  background-color: #333333;
  font-family: "Microsoft YaHei";
  position: relative;
  top: -11px;
  left: -8px;
  width: 1920px;

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
.bj1 .topd .tu img{
  position: relative;
  top: 20px;
  width: 56px;
  height: 56px;
//  z-index: 1;
}
.he {
  float: right;
  height: 41px;
}

/*.zhong .ziti a:hover {*/
/*  color: red;*/
/*  background-color: white;*/

/*}*/

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

.topd {
  height: 100px;
  width: 1227px;
  margin: 0 auto;
  background-color: white;
//   z-index: 1;
}

.topd .tu {
  float: left;
  height: 100px;
  width: 235px;
  background-color: white;
}

.topdzh {
  float: left;

}
#topdzh_ul li {
  display: inline;
}

.topd .topdzh a {
  color: black;
  display: inline-block;
  text-decoration: none;
  font-size: 16px;
  margin: 0px 10px;
  line-height: 100px;
}

.topdzh a:hover {
  color: red;
}

.topdyou {
  float: right;
  background-color: white;
}

.topdyou input {
  height: 49px;
  width: 244px;
  margin-top: 26px;
}

.topdyou .sousuo {
  float: right;
  width: 50px;
  height: 53px;
  margin-top: 26px;
  background-color: white;
}

.loginname ul{

  background: #ffffff;
  display: block;
  z-index: 20000;
  float: left;
  position: absolute;
  left: -180px;
  top: -5px;
}

.tope {
  height: 460px;
  width: 1227px;
  margin: 0 auto;
  background-color: yellow;
  z-index: -22200;
}
.youtu {
  position: relative;
  top: -29px;
  height: 460px;
  width: 992px;
  float: left;
  z-index: 5000;
}
.zuozi {
  width: 235px;
  height: 460px;
  float: left;
  background-color: #b0b0b0;
}

.zuozi a {
  display: block;
  color: white;
  text-decoration: none;
  height: 45px;
  line-height: 45px;
  padding-left: 17px;
  padding-top: 1px;
}

.zuozi a:hover {
  background-color: orange;
}



.zhongxia {
  height: 169px;
  width: 1227px;
  background-color: rosybrown;
  margin: 14px auto 17px auto;
}

.zhongxiazuo {
  float: left;
  height: 169px;
  width: 233px;
  background-color: #5F5750;
  position: relative;

}

.quanjin {
  height: 160px;
  width: 210px;
  margin: 0 auto;
  background-color: yellowgreen;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0px;
  top: 0px;
  bottom: 0px;
}

.zhongxiayou {
  float: left;
  height: 169px;
  width: 994px;
  background-color: white;
}

.xia1,
.xia2,
.xia3 {
  float: left;
  margin-left: 15px;
}

.xiaxia {
  width: 1227px;
  height: 402px;
  margin: 0 auto;
}

.bj2 {
  overflow: hidden;
  background-color: #FAFAFA;
}

.xiazi {
  height: 63px;
  line-height: 63px;
  font-size: 24px;
  font-weight: 300;
  width: 1227px;

}

.xiatu {
  height: 298px;
  width: 1227px;
  background-color: #F5F5F5;
  text-align: center;
}

.xiatu1 {
  float: left;
}

.xiatu2,
.xiatu3,
.xiatu4,
.xiatu5 {
  float: left;
  margin-left: 14px;
  width: 233px;
  height: 298px;
  background-color: white;
}

.xiatu p {
  font-size: 14px;
}

.xiatu span {
  font-size: 10px;
  color: #BDBDBD;
}

.nei1 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei1 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei2 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei2 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei3 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei3 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei4 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei4 span {
  text-decoration: line-through;
  font-size: 14px;
}

.ditu {
  margin-top: 40px;
  height: 145px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
}

.ditu2 {
  margin-top: 40px;
  height: 120px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
  top: -60px;
}
.ditu3 {
  margin-top: 40px;
  height: 120px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
}

.zhongxiazuo a {
  display: block;
  float: left;
  width: 70px;
  height: 20px;
  background-color: #5F5750;
  padding: 60px 0 0 0;
  text-decoration: none;
  color: white;
  font-size: 10px;
  position: relative;
  text-align: center;

}

.zhongxiazuo img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.wenzitiao {
  height: 308px;
  background-color: white;
  margin-top: 30px;
  padding-top: 20px;

}

.wenzitiaoxia {
  width: 1227px;
  height: 40px;
  margin: 0 auto;
  background-color: white;
}

.wenzitiaoxia a {
  display: block;
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
  color: rgba(255, 0, 0, 0.336);
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

li {
  list-style: none;
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
  text-decoration: none;
}
.wenzixiaxia .f1 ul li a:link{
  color: #333333;
}
.wenzixiaxia .f2 ul li a:link{
  color: #333333;
}
.wenzixiaxia .f3 ul li a:link{
  color: #333333;
}
.wenzixiaxia .f4 ul li a:link{
  color: #333333;
}
.wenzixiaxia .f5 ul li a:link{
  color: #333333;
}
.wenzixiaxia .f6 ul li a:link{
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
.xiali7 ul{
  position: relative;
  left: 25px;
}
.xiada7 span{
  position: relative;
  left: 25px;
}

.gt{
  background-color:transparent;
  position: relative;
  top: 230px;
  border: 0px;
  width: 50px;
  font-size: 25px;
}
.lt{
  background-color: transparent;
  float: right;
  position: relative;
  top: -250px;
  border: 0px;
  width: 50px;
  font-size: 25px;
}
.yc{
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}
.yc1,.yc2,.yc3,.yc4,.yc5,.yc6{
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}
.yc span{
  font-size: 12px;
}
.yc price{
  font-size: 12px;
  color: #FF6A00;
}
.ycleft{
  position: absolute;
  top: 50px;
  z-index:10;
}
.left1{
  position: absolute;
  left: 295px;
  z-index: 100;
  display: none;
}
.yans{
  box-shadow: -1px -1px 22px darkgray;
}
.ycyc{
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}
.ycyc1,.ycyc2,.ycyc3,.ycyc4,.ycyc5,.ycyc6{
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}
.ycyc span{
  font-size: 12px;
}
.ycyc price{
  font-size: 12px;
  color: #FF6A00;
}
.ycyc img{
  height: 110px;
  width: 160px;
}
.ds{
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}
.ds1,.ds2,.ds3,.ds4,.ds5,.ds6{
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}
.ds span{
  font-size: 12px;
}
.ds price{
  font-size: 12px;
  color: #FF6A00;
}
.ds img{
  height: 110px;
  width: 160px;
}
.bjb{
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}
.bjb1,.bjb2,.bjb3,.bjb4,.bjb5,.bjb6{
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}
.bjb span{
  font-size: 12px;
}
.bjb price{
  font-size: 12px;
  color: #FF6A00;
}
.bjb img{
  height: 110px;
  width: 160px;
}
.left1{
  background: #ffffff;
}
.loginname{
  height: 41px;
  width: 50px;
  position: absolute;
  right: 287px;
  display: none;
  top: 46px;
}
.loginname span{
  color: #ffffff;
  font-size: 12px;
  position: relative;
  top: 8px;
}
.loginname ul{
  box-shadow: 1px 1px 7px darkgray;
}
#top_ul,#top_ul li {
  display: inline;

}
#one,#one li{
  display: block;
}
.topdzh #topdzh_ul li{
  height: 100px;
}
.lxyans{
  color: #FF6A00;
}
img#lunbo {
  position: relative;
  top: 29px;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.contains{
  width: 100%;
  height: 100%;
}
.img-box img{
  min-height: 100px;
  max-width: 100%;
  width: auto;
  display: block;
  margin: 0 auto;
}
.nav-bar{
  height: 63px;
  border-bottom: darkgray 1px solid;
  width: 100%;
}
.con{
  width: 1226px;
  margin: 0 auto;
}
.con .con-info h2{
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 60px;
  color: #424242;
  display: inline;
}
.con .con-info a{
  color: #424242;
  line-height: 60px;
  float: right;
  display: inline;
  text-decoration: none;
}
.con .con-info a:hover{
  color: #ff6700;
}
.page-box{
  width: 1226px;
  height: auto;
  margin: 0 auto;
}

.page-box .page-img,.page-info{
  width: 562px;
  height: 736px;
  display: inline-block;
  vertical-align: middle;
}

.page-con h2{
  margin: 0;
  padding-top: 30px;
  font-size: 24px;
  font-weight: 400;
}
.page-con p{
  font-size: 14px;
  color: #b0b0b0;
  margin: 0;
  padding: 0;
  padding-top: 8px;
  line-height: 1.5;

}
.price-info{
  border-bottom: 1px solid darkgray;
}
.price-info span{
  display: block;
  color:#ff6700 ;
  margin: 10px 0;
}
.price-info span:last-child{
  font-size: 20px;
}
.address-box{
  padding: 30px 50px;
  position: relative;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 10px;
}
.address-info img,span,a{
  vertical-align: middle;
}
.address-info a{
  text-decoration: none;
  color: #ff6700;
}
.info span{
  margin: 0 25px;
  color: #ff6700;
}
.option-box .title{
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}
.option-box .option-info{
  color: #ff6700;
  border: 1px solid #ff6700;
  width: 292px;
  height: 41.6px;
  text-align: center;
  cursor:pointer;
  margin-bottom: 20px;
}
.option-box .option-info a{
  text-decoration: none;
  color: #ff6700;
  line-height: 41.6px;;

}
.selected-list{
  background: #f9f9fa;
  padding: 30px;
  margin-bottom: 30px;
  line-height: 30px;
  color: #616161;
}
.selected-list li{
  display: inline-block;
}
.selected-list span{
  float: right;
}
.selected-list .total-price{
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
.btn-box{
  margin: 10px 0 20px;
}
.btn-box .sale-btn{
  width: 298px;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background: #ff6700;
  border-color: #ff6700;
  display: inline-block;
  text-align: center;
  cursor:pointer;
}
.btn-box .sale-btn:hover{
  background-color: rgba(255,103,0,0.8);
}
.btn-box .favorite-btn:hover{
  background-color: rgba(176,176,176,0.8);
}
.btn-box .favorite-btn{
  width: 140px;
  height: 52px;
  line-height: 52px;
  background: #b0b0b0;
  border-color: #b0b0b0;
  display: inline-block;
  text-align: center;
  cursor:pointer;
}
.btn-box a{
  text-decoration: none;
  color: #ffffff;
}
.after-sale-info span{
  margin-right: 15px;
  line-height: 30px;
  margin-bottom: 10px;
}
.after-sale-info span a{
  text-decoration: none;
  color: #b0b0b0;
  vertical-align: middle;
  font-size: 14px;
}
.after-sale-info span a em{
  font-style: normal;
  vertical-align: middle;
}
.iconfont{
  width:  25px;
  height:25px;
  vertical-align: middle;
}

.section h3{
  font-size: 22px;
  color: #333;
  width: 1226px;
  margin: 0 auto;
  padding: 22px 0;
  font-weight: normal;
}
.section .img-box img{
  min-height: 100px;
  max-width: 100%;
  width: 1226px;
  display: block;
  margin: 0 auto;
}
.detail-box{
  background-color: #f5f5f5;
}
.foots-bootom{
  height: 50px;
}
</style>
