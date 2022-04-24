<template>
 <!-- <el-container>
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
  </el-container>-->
  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="全部订单" name="first"><Allorder></Allorder> </el-tab-pane>
      <el-tab-pane label="待收货订单" name="second"><Dshorder></Dshorder></el-tab-pane>
      <el-tab-pane label="待提货订单" name="third"><Dthorder></Dthorder></el-tab-pane>
      <el-tab-pane label="已提货订单" name="fourth"><Yrhorder></Yrhorder></el-tab-pane>
      <el-tab-pane label="退货订单" name="hhhh"><Thorder></Thorder></el-tab-pane>
      <el-tab-pane label="资料维护" name="jjjj">
        <component is="Zlwh"></component>
      </el-tab-pane>
      <el-tab-pane label="商户营收" name="yyyy"><Shys></Shys></el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
  import Allorder from "../Shorder/Allorder";
  import Dshorder from "../Shorder/Dshorder";
  import Dthorder from "../Shorder/Dthorder";
  import Yrhorder from "../Shorder/Yrhorder";
  import Thorder from "../Shorder/Thorder";
  import Zlwh from "../shzlwh/Zlwh";
  import Shys from "../Shorder/Shys";

    export default {
        name: "Shzy",
      data(){
          return{
            activeName:"first"
          }
      },components:{
        Allorder,
        Dshorder,
        Dthorder,
        Yrhorder,
        Thorder,
        Zlwh,
        Shys
      }
    }
</script>

<style scoped>
 /* .el-header, .el-footer {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }

.el-aside {
  background-color: #FFFFFF;

}

.el-main {

}
*/



</style>
