<template>
<div>
  <el-form :model="AddWhouse" :rules="rules" ref="awhref" label-width="100px" class="demo-ruleForm">
    <el-form-item label="仓库名" prop="warName">
      <el-input v-model="AddWhouse.warName"></el-input>
    </el-form-item>
    <el-form-item label="最大存储数" prop="warMaxStock">
      <el-input v-model.number="AddWhouse.warMaxStock" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="fl" multiple placeholder="请选择">
        <el-option
          v-for="item in fllist"
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
  name: "AddWareHouse",
  data(){
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('只能是数字'));
        } else {
          if (value<1) {
            callback(new Error('不能为空'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return{

      AddWhouse: {warName:"",warMaxStock:""},
      fl:[],
      fllist:[],

      rules:{
        warName:[{ required: true, message: '仓库名不能为空'}],
        warMaxStock:[{validator:checkAge,trigger: 'change' }],
      },

    }
  },
  methods:{
    addcka(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fl.length==0){
            this.$message.error("请选择商品分类");
            return ;
          }
          var params = new URLSearchParams();
          params.append("warName",this.AddWhouse.warName);
          this.$axios.post("cxwhouse.action",params).then(res=>{
              if (res.data.code==1){
                this.$message.error(res.data.msg);
                return;
              }else{
                this.tjck();
              }
          }).catch()
        } else {
          console.log('error submit!!');
          return false;
        }

      });
    },
    //商品分类查询
    queryspfenlei(){
      this.$axios.get("shopinfo.action/queryallshoptype.action").then(res=>{
        this.fllist = res.data;
        console.log(this.fllist);
      }).catch()
    },
    tjck(){

      var params = new URLSearchParams();
      params.append("warName",this.AddWhouse.warName);
      params.append("warMaxStock",this.AddWhouse.warMaxStock);
      params.append("arr",this.fl)

      this.$axios.post("tjck.action",params).then(res=>{
          if (res.data.code==0){
            this.$message.error(res.data.msg);
          }else{
            this.$message.success(res.data.msg);
            this.$emit('success',false);
          }
      }).catch();
    }
  },
  created() {
  this.queryspfenlei();
  }
}
</script>

<style scoped>

</style>
