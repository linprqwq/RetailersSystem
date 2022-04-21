<template>

  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="供应商管理页面" name="first"><supplierindex></supplierindex> </el-tab-pane>
      <el-tab-pane label="修改" name="fourth"><eiitsupplier></eiitsupplier>  </el-tab-pane>
      <el-tab-pane label="处理采购单发货" name="second"> <supplierfh></supplierfh> </el-tab-pane>
      <el-tab-pane label="供应商品维护" name="third"> <whsupplier></whsupplier> </el-tab-pane>
      <el-tab-pane label="供应订单历史记录" name="five"><selectgyorder></selectgyorder></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
    import Supplierindex from "./Supplierindex";
    import eiitsupplier from "./eiitsupplier";
    import supplierfh from "./supplierfh";
    import Whsupplier from "./whsupplier";
    import Selectgyorder from "./selectgyorder";

    export default {
        name: "tabs",
      data() {
        return {
          activeName: 'first'
        };
      },components:{
        Selectgyorder,
        Whsupplier,
          Supplierindex,eiitsupplier,supplierfh,
      }

    }
</script>

<style scoped>

</style>
