<template>
  <div id="back">
          <div class="login" >
            <div class="title">兴盛不会以任何理由要求您转账汇款，谨防诈骗。</div>
            <div class="login-tab">
              <div class="login-l">
                <a href="#" id="smdl">扫码登录</a>
              </div>
              <div class="login-r">
                <a href="#" id="zhdl">账户登录</a>
              </div>
              <div class="line"></div>
            </div>
            <div class="content" id="content">
              <div class="user">
                <label id="user"  for="user1"></label><input type="text" v-model="loginqwq.zhh" name="user1" id="user1" placeholder="邮箱/用户名/登录手机">
              </div>
              <div class="pwd">
                <label id="pwd"  for="pwd1"></label><input type="password" v-model="loginqwq.pwd" name="pwd1" id="pwd1" placeholder="密码">
              </div>
              <div class="safe">
                <a href="#">忘记密码</a>
              </div>
              <div class="login-btn" @click="logindl">
                <a href="#">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
              </div>
            </div>
            <ul class="footer">
              <li>
                <a href="#"><span></span>QQ</a>
              </li>
              <li></li>
              <li>
                <a href="#"><span></span>微信</a>
              </li>
              <li>
                <a href="#"><i></i>立即注册</a>
              </li>
            </ul>
            <div class="none" id="none">
              <div class="show" id="show"></div>
              <div class="phone" id="phone"></div>
            </div>
          </div>
  </div>
</template>

<script>
export default {

  name: "Login",
  data(){
    return{
     loginqwq:{
       zhh:"",
       pwd:""
     }
    }
  },
  methods:{
    logindl(){
      var params= new URLSearchParams();
      params.append("loginname",this.loginqwq.zhh)
      params.append("password",this.loginqwq.pwd)
      this.$axios.post("login.action",params).then(res=>{
        if(this.loginqwq.zhh =="" || this.loginqwq.zhh  ==null){
          this.$message.error("账号不能为空")
          return
        }else if(this.loginqwq.pwd=="" || this.loginqwq.pwd==null){
          this.$message.error("密码不能为空")
          return
        }else {
          if(res.data==0){
            this.$message.error("账号或密码有误")
            return
          }
        }
        if(res.data!=0){
          this.$message({
            message:"登录成功",
            type:"success"
          })
           this.$router.push("/index").catch(err=> {
            console.log("aaaa",err)
          })
        }
      }).catch()
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #e93854;
  font-size: 12px;
  line-height: 1;
}
a {
  text-decoration: none;
  color: #666666;
}
.login {
  position: relative;
  overflow: hidden;
  width: 346px;
  height: 391px;
  margin: 100px auto;
  font-size: 0;
  background-color: #ffffff;
  left: 400px;
  top: 130px;
}
.login .title {
  width: 100%;
  height: 38px;
  text-align: center;
  font-size: 12px;
  line-height: 38px;
  background-color: #fff8f0;
}
.login .title::before {
  display: inline-block;
  width: 16px;
  height: 16px;
  content: '';
  margin-right: 5px;
  background: url("../image/icon.png") no-repeat;
  vertical-align: middle;
}
.login-tab {
  position: relative;
  width: 100%;
  height: 55px;
}
.login .login-l,
.login .login-r {
  display: inline-block;
  width: 173px;
  height: 55px;
  text-align: center;
  line-height: 55px;
  border-bottom: 1px solid #f4f4f4;
}
.login .login-l a {
  width: 99%;
  font-size: 18px;
}
.login .login-l a:hover {
  color: #e4393c;
  font-weight: 700;
}
.login .login-r a {
  width: 99%;
  font-weight: 700;
  font-size: 18px;
  color: #e4393c;
}
.line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 18px;
  background-color: #f4f4f4;
  transform: translate(-50%,-50%);
}
.content {
  width: 100%;
  height: 248px;
  padding: 30px 0 20px;
  opacity: 1;
}
.content .user,
.content .pwd {
  width: 304px;
  height: 38px;
  margin: 0 auto 20px;
  border: 1px solid #bdbdbd;
}
label {
  float: left;
  display: block;
  width: 39px;
  height: 38px;
  background: url("../image/sprite.png") no-repeat center;
  border-right: 1px solid #bdbdbd;
}
.content .user label {
  background-position: 0 0;
}
.content .pwd label {
  background-position: -48px 0;
}
.user input,
.pwd input {
  float: left;
  width: 263px;
  height: 36px;
  font-size: 14px;
  padding-left: 10px;
  border: 0;
  outline: none;
}
/*忘记密码*/
.safe {
  width: 306px;
  height: 18px;
  margin: 0 auto 20px;
  line-height: 18px;
  text-align: right;
}
.safe a {
  font-size: 12px;
}
.safe a:hover {
  color: #e4393c;
  text-decoration: underline;
}
/*登录*/
.login-btn {
  width: 304px;
  height: 34px;
  margin: 0 auto 30px;
  border: 1px solid #e85356;
  background-color: #e4393c;
}
.login-btn a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  line-height: 34px;
  color: #fff;
}
/*底部*/
.footer {
  width: 306px;
  height: 50px;
  margin: 0 auto;
  background-color: #fff;
}
.footer li {
  float: left;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}
.footer li a {
  font-size: 12px;
}
.footer li a span {
  display: inline-block;
  width: 19px;
  height: 18px;
  margin-right: 5px;
  background: url("../image/qq-wx.png") no-repeat 0 0;
  vertical-align: middle;
}
.footer li:nth-child(3) a span {
  background-position: -20px 0;
}
.footer li:nth-child(3) {
  margin-left: 5px;
}
.footer li:nth-child(2) {
  width: 1px;
  height: 14px;
  margin: 18px 0 0;
}
.footer li:last-child {
  float: right;
  width: 77px;
  height: 100%;
  text-align: right;
}
.footer li:last-child a {
  font-size: 12px;
  color: #b61d1d;
}
.footer li:last-child a i {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../image/sprite.png") no-repeat -104px -75px;
  vertical-align: middle;
  margin-right: 5px;
  border-radius: 50%;
}
.footer li a:hover {
  color: #e4393c;
  text-decoration: underline;
}
/*二维码*/
.none {
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 306px;
  height: 168px;
  transform: translate(-50%,-50%);
}
.none .show {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 147px;
  height: 147px;
  background: url("../image/show.png") no-repeat;
  transform: translate(-50%,-50%);
  transition: all 0.8s;
}
.none .phone {
  position: absolute;
  top: 50%;
  right: 0;
  width: 148px;
  height: 168px;
  background: url("../image/phone.png") no-repeat;
  transform: translateY(-50%);
  transition: all 0.5s 0.3s;
  opacity: 0;
}
#back{
  background: url("../image/loginn.png");
  background-repeat:no-repeat;
  background-size: cover;
  height: 600px;
  position: relative;
  top: -100px;
}
</style>

