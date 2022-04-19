<template>
<div>
  <el-form :model="mtkwarehouse"  ref="updateckref" label-width="100px" class="demo-ruleForm">
    <el-form-item label="仓库名" prop="warName">
      <el-input v-model="mtkwarehouse.warName"></el-input>
    </el-form-item>
    <el-form-item label="最大存储数" prop="warMaxStock">
      <el-input v-model.number="mtkwarehouse.warMaxStock" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="fl" multiple placeholder="请选择">
        <el-option
          v-for="item in fl"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "UpdateCk",
  data(){
    return{
      mtkwarehouse:{},
      fl:[],
    }
  },
  methods:{
    warehousemtkzs(wh){
      this.mtkwarehouse  =wh;
     this.fl =  this.spfldy();
     console.log(this.fl);
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
