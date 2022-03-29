<template>
<div>
  <el-button @click="querysp()">商品详情按钮</el-button>
  <el-button @click="addspingcart()">加入购物车</el-button>
  <el-button @click="queryuserorder()">我的订单</el-button>
  <el-button @click="queryorderdfk()">待付款</el-button>
  <el-button @click="queryorderdsh()">待收货</el-button>
  <el-button @click="queryorderyth()">已提货</el-button>
</div>
</template>

<script>
export default {
  name: "CommodityDisplay",

  data(){
    return{

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
    }
  },

}
</script>

<style scoped>

</style>
