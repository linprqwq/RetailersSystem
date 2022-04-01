<template>
  <div>
    <table border="1px">
      <tr><td><input type="checkbox" @click="qx()"></td><td>商品名称</td><td>商品价格</td><td>购买数量</td></tr>

      <tr v-for="(g,index) in allgoods">
        <td><input type="checkbox" v-model="g.ck"></td>
        <td>{{g.commodity.proname}}</td>
        <td>{{g.commodity.prosprice}}</td>
        <td>
          <input type="button" value="-" @click="jj(g.cartid,true,g.quantity)">
          {{g.quantity}}
          <input type="button" value="+" @click="jj(g.cartid,false)">
        </td>
      </tr>
    </table>
    <hr>
    共{{totalprice}}元  <input type="button" value="批量删除" >
    <input type="button" value="确认订单" @click="tj()">
  </div>

</template>

<script>
export default {
  name: "shopping",
  data(){

return{
  allgoods:[
  ],
  list:[]
}
  },
  methods: {

    queryshopping() {
      var params = new URLSearchParams();
      params.append("uid", 1);

      this.$axios.post("querygwcid.action", params).then(res => {
        this.allgoods = res.data;
        console.log(res.data)
      }).catch()
    },

    jj(id,boolean,sl){
      console.log(boolean)
      console.log(sl)
      if (boolean==true&&sl==1){
        if (confirm("您确定要移除购物车吗?")){
          var params = new URLSearchParams();
          params.append("cartid",id);
          params.append("pdjj",boolean)
          this.$axios.post("gwcssjj.action",params).then(res=>{

            this.queryshopping();
          }).catch();
        }else{
          return
        }
      }
      var params = new URLSearchParams();
      params.append("cartid",id);
      params.append("pdjj",boolean)
      this.$axios.post("gwcssjj.action",params).then(res=>{

          this.queryshopping();
      }).catch();
    },
qx(){

}
  },
  computed:{
    totalprice(){
      var tp=0;
      //  checkbox 选中状态  数量
      this.allgoods.forEach(item=>{
        if(item.ck) {
          tp += item.commodity.prosprice * item.quantity;
        }
      })
      return tp;
    }
  },
  created(){
    this.queryshopping();
  }
}
</script>

<style scoped>

</style>
