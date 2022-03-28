<template>
  <el-button @click="queryshopping">我的购物车</el-button>
</template>

<script>
export default {
  name: "ShoppingCart",

  data(){
    return{

    }
  },
  methods:{
    queryshopping(){
      var params= new URLSearchParams();
      params.append("uid",1);

      this.$axios.post("querygwcid.action",params).then(res=>{
        console.log(res.data)
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
