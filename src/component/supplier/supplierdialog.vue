<template>

<!--供应商对话框-->
  <div>
    <el-form label-width="80px">
          <el-form-item label="商品名">
          <el-input v-model=""></el-input>
          </el-form-item>

      <el-form-item label="商品分类">
        <el-input v-model=""></el-input>
      </el-form-item>

      <el-form-item label="提供价格">
        <el-input v-model=""></el-input>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
    export default {
        name: "supplierdialog",
      data(){
          return{

          }
      }
    }
</script>

<style scoped>

</style>
