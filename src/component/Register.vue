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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item
          label="昵称"
          prop="username">
          <el-input  v-model.number="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="登录名"
          prop="loginname">
          <el-input  v-model.number="ruleForm.loginname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="ruleForm.password"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="ruleForm.password2"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input type="number" v-model.number="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="upload-demo"
            ref="upload"
            :on-change="changeFile"
            action="#"
            :limit="1"
            :file-list="fileList"
            list-type="picture-card"
            :auto-upload="false"
            multiple>
            <el-button slot="trigger" size="small" type="primary">选取头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import {Loading} from "element-ui";

export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password2 !== '') {
          this.$refs.ruleForm.validateField('password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var testusername = (rule, value, callback) => {
      console.log()
      var params = new URLSearchParams()
      params.append("username", this.ruleForm.username)
      this.$axios.post("checkusername.action", params).then(val => {
        if (val.data != 0) {
          callback(new Error("用户名重复"))
        } else {
          callback();
        }
      }).catch()
    };
    var testloginname = (rule, val, callback) => {
      var params = new URLSearchParams()
      params.append("loginname", this.ruleForm.loginname)
      this.$axios.post("checkloginname.action", params).then(val => {
        if (val.data != 0) {
          callback(new Error("登录账号重复"))
          console.log(this.ruleForm)
        } else {
          callback()
        }
      }).catch()
    }
    var testphone = (rule, val, callback) => {
      var myreg = /^1[35678]\d{9}$/;
      if (!myreg.test(val)) {
        callback(new Error("电话号码不符合规则"))
      } else {
        callback()
      }
    }
    return {
      loadingInstance: null,
      fileList: [],
      ruleForm: {
        password: "",
        password2: "",
        username: "",
        loginname: "",
        phone: "",
      },
      rules: {
        password1: [
          {validator: validatePass, trigger: 'blur'}
        ],
        password2: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '昵称不能为空'},
          {validator: testusername, trigger: 'blur'}
        ],
        loginname: [
          {required: true, message: '登录名不能为空'},
          {validator: testloginname, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '手机号不能为空'},
          {validator: testphone, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.go()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    go(){
      var formData = new FormData();
      Object.keys(this.ruleForm).forEach(itme=>{
        formData.append(itme,this.ruleForm[itme])
      })
      this.fileList.forEach(item=>{
        formData.append('file',item.raw)
      })
      this.sendFile(formData)
    },
    sendFile(data){
      this.loadingInstance = Loading.service({
        text:'桥豆麻袋',
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios({
        method:'post',
        url:'registeruser.action',
        data:data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(val=>{
          if(val!=0){
            setTimeout(()=>{
              this.loadingInstance.close();
              this.$message.success("注册成功 正在去往登录界面")
             setTimeout(()=>{
               this.$router.push("/login")
             },2000)
            },2000)
          }
        }
      ).catch()
    },  //每次文件改变选择，都将最新的选择文件 更新到头像数组中
    changeFile(file, fileList) {
      this.fileList = fileList;
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
