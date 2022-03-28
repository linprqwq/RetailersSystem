<template>
  <div>
      <input type="text"  v-model="zhh" placeholder="请输入账号">
      <input type="password" v-model="pwd"  placeholder="请输入密码">
      <input type="button" id="btn" value="登录" @click="logindl">
  </div>
</template>

<script>
export default {

  name: "Login",
  data(){
    return{
      zhh:"",
      pwd:"",
    }
  },
  methods:{
    logindl(){
      var params= new URLSearchParams();
      params.append("loginname",this.zhh)
      params.append("password",this.pwd)
      this.$axios.post("login.action",params).then(res=>{
       if(res.data!=0){
         alert("登录成功")
       }
        alert("账号或密码有误")
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
