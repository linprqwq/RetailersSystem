<template>
  <div>
    <div class="top" >
      <div class="zhong">
        <div class="zuo">
          <a href="#" @click="$router.push('/')">兴盛商城</a>
          <a href="#">XISI</a>
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
        <div class="you" >
          <a class="mzz" v-show="userid!=null" @click="$router.push('/personalCenter')">{{userid}}</a>
          <a class="mzz" v-show="userid==null"  @click="$router.push('/login')">登录</a>
          <a class="mzz" v-show="userid==null" @click="$router.push('/register')">注册</a>
          <a class="mzz" v-show="userid!=null" @click="zx()">注销</a>

          <a class="mzz" href="#">消息通知</a>
          <div class="he">
            <div class="che">
              <a href="#"></a>
            </div>
            <div class="ziti">
              <a   @click="gwc()">购物车 ({{cartcount}})</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      userid:sessionStorage.getItem('user'),
      useridd:sessionStorage.getItem('id'),
      commodity:[],
      cartcount:0
    }
  },
  computed:{
    showLoginname(){
      return this.userid
    },
    showlgoinid(){
      return this.useridd
    }
  },
  methods:{
    shopping(){
      if(this.userid==null){
        this.$router.push("/ShoppingFalst")
      }
    },
    gwc(){
      if (this.userid==null){
      this.$message.error("请先登录")
        this.$router.push('/login');
      }else if (this.cartcount==0){
        this.$router.push('/myshoppingkk');
      }else{
        this.$router.push('/shopping2');
      }
    },

    zx(){

      /*去清空 token 浏览器的缓存  紧张浏览器回退*/
      localStorage.clear()
      sessionStorage.clear()
      this.$message.success("注销成功")
      setTimeout(()=>{
        this.$router.go(0)
      },200)


    }

  },


  created(){
    var _this=this;
    this.$axios.post("queryAllcom.action").then(val=>{
      _this.commodity=val.data
      console.log(val.data)
    }).catch()
    if(this.useridd!=null){
      var params= new URLSearchParams();
      params.append("id",this.useridd)
      this.$axios.post("cartcount.action",params).then(
        val=>{
          _this.cartcount=val.data
        }
      ).catch()
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
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
  width: auto;
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




</style>
