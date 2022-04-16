<template>

  <!--供应商对话框-->
  <div>
    <el-form :inline="true" label-width="80px" :model="shop" class="demo-form-inline">

      <el-form-item label="商品名">
        <el-input v-model="shop.proname" readonly></el-input>
      </el-form-item>

      <el-form-item label="提供价格">
        <el-input v-model="shop.supplierPrice" placeholder="提供价格"></el-input>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>

  export default {
    name: "Supplierdialog",
    data() {
      return {
        shopId: "",
        shop: {
          supplierPrice: ""
        },
        pid:sessionStorage.getItem("id")
      }
    },
    methods: {
      getObject(id) {
        this.shopId = id;
        //根据商品id去 获取商品表数据
        this.$axios.get("queryspid.action?id=" + id, null).then(response => {
          this.shop = response.data;

          console.log(response.data)
        })
          .catch();
      },
      submit() {
        //组装数据
        let goodsuppplier = {
          gid: this.shopId,
          pid: sessionStorage.getItem("id"),
          supplierPrice: this.shop.supplierPrice,
        }
        console.log(this.pid)
//去调用异步，进行数据添加，需要去审核
        if(this.pid!=""){
          this.$axios.put("goodsSupplied/addsupplierSupplyOfGoods.action", goodsuppplier)
            .then(res => {
              if (res.data.x) {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch();
        }else{
          alert("请供应商登录后再去停供货物")
        }
      }
    },

    created() {
    }
  }
</script>

<style scoped>

</style>
