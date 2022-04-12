<template>
  <div id="app">
    <el-form :model="empForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="empLoginname">
        <el-input type="text" v-model="empForm.empLoginname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="emppassword">
        <el-input type="password" v-model="empForm.emppassword" autocomplete="off"></el-input>
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

</style>
