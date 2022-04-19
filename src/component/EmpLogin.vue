<template>

  <div id="app">
    <el-form :model="empForm" ref="ruleForm" :rules="rules" class="login-box">
      <h3 class="login-title">兴盛优选后台管理系统</h3>
      <el-form-item label="账号" prop="empLoginname">
        <el-input type="text" placeholder="请输入账号" v-model="empForm.empLoginname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="emppassword">
        <el-input type="password" placeholder="请输入密码" v-model="empForm.emppassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(empForm)">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "EmpLogin",
      data(){
          return{
            empForm: {
              empLoginname: '',
              emppassword: ''
            },
            rules: {
              empLoginname: [{
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
              }],
              emppassword: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }]
            }
          }
      },
      methods:{
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        login(empForm){
          this.$axios.get("sysemplogin.action",
            {params:
                {"empLoginname":empForm.empLoginname,
                "empPassword":empForm.emppassword}})
            .then(response=>{
               //总记录数量
              if(response.data!=""){
                alert("登录成功")
                // window.location.href="SystemList.vue"

                sessionStorage.setItem("empname",response.data.empName);
                sessionStorage.setItem("eid",response.data.id);
                this.$router.push("/syslist")
              }else{
                alert("登录失败")
              }

            }).catch();
        }
      }
    }
</script>

<style scoped>
  .login-box {
    width: 350px;
    margin: 120px auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6;
  }

  .login-title {
    text-align: center;
  }
</style>
