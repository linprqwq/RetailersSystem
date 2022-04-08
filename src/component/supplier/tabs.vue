<template>

  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="供应商首页" name="first"><supplierindex></supplierindex> </el-tab-pane>
      <el-tab-pane label="供应商订单" name="second">供应商订单</el-tab-pane>
      <el-tab-pane label="供应商退货" name="third">供应商退货</el-tab-pane>
      <el-tab-pane label="统计" name="fourth">统计</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
    import Supplierindex from "./Supplierindex";
    export default {
        name: "tabs",
      data() {
        return {
          activeName: 'first'
        };
      },components:{
          Supplierindex
      }

    }
</script>

<style scoped>

</style>
