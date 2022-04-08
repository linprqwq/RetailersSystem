<template>
  <el-container>
    <el-header >商户系统</el-header>
    <el-container>
      <el-aside width="200px"><el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/qbdd" >全部订单</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/dsh" >待收货订单</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/dth" >待提货订单</router-link></el-menu-item>
            <el-menu-item index="1-4"><router-link to="/yth" >已提货订单</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" >
          <span slot="title"><router-link to="/zlwh" >资料维护</router-link></span>
        </el-menu-item>
        <el-menu-item index="3" >
          <span slot="title">营收</span>
        </el-menu-item>
      </el-menu></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>


<script>
    export default {
        name: "Shzy"
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }

.el-aside {
  background-color: #FFFFFF;

}

.el-main {

}




</style>
