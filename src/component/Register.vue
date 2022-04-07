<template>
  <div id="qwq">
    <div class="header" >
      <div class="logo-con w clearfix">
        <a href="https://www.jd.com" class="logo ">
        </a>
        <div class="logo-title">欢迎注册</div>
        <div class="have-account">已有账号？ <a @click="$router.push('/login')">请登录&gt;</a></div>
      </div>
    </div>
    <div class="middle">
      <el-input class="sr" v-model="username" @blur="testname"  placeholder="请输入你的昵称"></el-input>
      <el-input class="sr" v-model="loginname" @blur="testlogin"  placeholder="请输入登录账号"></el-input>
      <el-input class="sr" v-model="password1" show-password placeholder="请输入你的密码"></el-input>
      <el-input class="sr" v-model="password2" @blur="testpassword" show-password placeholder="请确认你的密码"></el-input>
      <el-input class="sr" v-model="phone"  placeholder="请输入你的手机号"></el-input>

      <el-upload class="sr"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button icon="el-icon-check" class="sr" round :loading="false">注册</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username:"",
      loginname:"",
      password1:"",
      password2:"",
      phone:"",
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    testname(){
      if(this.username=='' || this.username==null){
        this.$message.error("昵称不能为空")
      }else{
        alert("成功")
      }
    },
    testlogin(){
      if(this.loginname=='' || this.loginname==null){
        alert(11)
      }
    },
    testpassword(){
     if(this.password1!=this.password2){
        this.$message.error("两次密码不一致 检查后再试")
     }else if(this.password1=='' || this.password1==null){
       this.$message.error("密码不能为空")
     }
     alert(1)
    }
  }
}
</script>

<style scoped>
.header{
  font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #dcd9d9;
  font-size: 14px;
  margin: 0;
  padding: 0;
  height: 110px;
  box-shadow:20px 9px 10px -3px ;
}
.logo-con{
  font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #666;
  font-size: 14px;
  padding: 0;
  margin: 0 auto;
  width: 1210px;
}

.header .logo-title {
  float: left;
  height: 34px;
  line-height: 34px;
  font-size: 24px;
  color: #333;
  margin-top: 34px;
}
.header .have-account {
  font-size: 16px;
  float: right;
  margin-top: 55px;
  color: #999;
}
.header .have-account a {
  color: #e22;
}
a {
  color: #666;
  text-decoration: none;
}
.header{
}
#qwq{
  padding: 0;
  margin: 0;
  position: relative;
  top: -8px;
  width: auto;
}
.middle{
  margin: 50px auto 186px;
  width: 400px;
}
.middle .sr{
  margin: 10px 0;
}

</style>
