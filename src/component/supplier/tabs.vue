<template>

  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="供应商管理页面" name="first"><supplierindex></supplierindex> </el-tab-pane>
      <el-tab-pane label="修改" name="fourth"><eiitsupplier></eiitsupplier>  </el-tab-pane>
      <el-tab-pane label="供应订单管理" name="second">供应订单管理</el-tab-pane>
      <el-tab-pane label="供应商订单记录" name="third">供应商订单记录</el-tab-pane>
      <el-tab-pane label="统计" name="five">统计</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
    import Supplierindex from "./Supplierindex";
    import eiitsupplier from "./eiitsupplier";
    export default {
        name: "tabs",
      data() {
        return {
          activeName: 'first'
        };
      },components:{
          Supplierindex,eiitsupplier
      }

    }
</script>

<style scoped>

</style>
