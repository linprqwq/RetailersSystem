<template>
  <!--修改商品维护表里面的数据-->
  <div>
    <el-dialog title="修改供应商品" :visible.sync="editVisible"
               :before-close="handleClose">
      <el-form :model="supplys">

        <el-form-item label="商品名称">
          <el-input v-model="supplys.commodity.proname" readonly></el-input>
        </el-form-item>

        <el-form-item label="商品类型">
          <el-input v-model="supplys.shopTypeInfo.name" readonly></el-input>
        </el-form-item>

        <el-form-item label="供应价格">
          <el-input v-model="supplys.supplierPrice" placeholer="请输入供应价格"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="update">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "editwhsupplier.vue",
    data() {
      return {
        editVisible:false,
        supply: {id: ""},
        supplys: {
          commodity: {
            proname: ""
          },
          shopTypeInfo: {
            name: ""
          }
        }

      }
    },
    methods: {
      getData() {
        this.$axios.get("goodsSupplied/querybysid.action/" + this.supply.id).then(res => {
          this.supplys = res.data;
        }).catch(err => {
        })
      },
      reset(){

      },

      //提交
      update() {
        this.$axios.put("goodsSupplied/xgsupplier.action", this.supplys).then(res => {
          if (res.data.code > 0) {
            this.$message.success(res.data.msg);
            this.getData();
            this.editVisible = false;
          } else {
            this.$message.success(res.data.msg);

          }
        }).catch(error => {
          this.$message.error(error);
        })
      },
      handleClose(){
        this.$confirm('确认关闭？')
          .then(_ => {
            this.editVisible = false

          })
          .catch(_ => {});
      }


    }
  }
</script>

<style scoped>

</style>
