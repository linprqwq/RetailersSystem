<template>
  <div>
    <form id="myform">
      <input type="text"  v-model="zhh" placeholder="请输入账号">
      <input type="password" v-model="pwd"  placeholder="请输入密码">
      <input type="submit" id="btn01" value="登录" @click="logindl">
    </form>
  </div>
</template>

<script>
export default {

  name: "Login",
  data(){
    return{
      zhh:"",
      pwd:""
    }
  },
  methods:{
    logindl(){
      var params= new URLSearchParams();
      params.append("loginname",this.zhh)
      params.append("password",this.pwd)
      this.$axios.get("login.action",params).then(
        val=>{
          if(val==0){
            alert("账号密码有误")
          }
        }
      ).catch()
    }
  }
}
</script>

<style scoped>

</style>
