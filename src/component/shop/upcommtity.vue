<template>
  <!--上架商品-->
  <div>
    <el-dialog
      title="上架"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>上架商品数量:{{shop.quantity}}</span>
      <span style="color: #ff0000">{{msg}}</span>
      <el-slider :disabled="state" v-model="shop.quantity" :max="max"></el-slider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sj" :disabled="state">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "upcommtity",
    data() {
      return {
        state: false,
        msg: "",
        max: 0,
        dialogVisible: false,
        shop: {
          id: "",
          sj: "",
          quantity: ""
        }
      }
    }, methods: {
      handleClose(done) {
        //模态框的关闭
        this.$confirm("确认要关闭吗?").then((_) => {
          this.cancel();
        }).catch();
      },
      cancel() {
        this.max = 0;
        this.shop = {};
        this.dialogVisible = false;
      },
      getSj() {
        //去查询仓库表里面的数量
        this.$axios.get("").then(res => {
          if (res.data().code > 0) {
            this.max = res.data.num;
          } else {
            this.msg = res.data.msg;
            this.state = true;
          }
        }).catch(err => {
          this.$message.error(err);
        })
      },
      sj() {
        if (this.shop.quantity == 0) {
          this.$message.warning("请选择上架数量")
          return
        }
        this.$axios.put("xgstatus.action", this.shop).then(res => {
          if (res.data.code > 0) {
            this.$message.success(res.data.msg);
            this.$parent.getShopData();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(error => {
          alert(error);
        })
      }
    }
  }
</script>

<style scoped>

</style>
