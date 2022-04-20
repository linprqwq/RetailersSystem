<template>
<div>
  <el-form :model="mtkwarehouse" :rules="rules" ref="updateckref" label-width="100px" class="demo-ruleForm">
    <el-form-item label="仓库名" prop="warName">
      <el-input v-model="mtkwarehouse.warName"></el-input>
    </el-form-item>
    <el-form-item label="最大存储数" prop="warMaxStock">
      <el-input v-model.number="mtkwarehouse.warMaxStock" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="value" multiple placeholder="请选择">
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
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger((Number(value)))) {

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
      mtkwarehouse:{Id:0,warName:"",warMaxStock:""},
      fl:[],
      value:[],
      rules:{
        warName:[{ required: true, message: '仓库名不能为空',trigger: 'click'}],
        warMaxStock:[{validator:checkAge,trigger: 'click' }],
      },
    }
  },
  methods:{
    //赋值
    warehousemtkzs(wh){
      var params = new URLSearchParams();
      params.append("Id",wh.id);
      this.$axios.post("querywarehouseInfobyid.action",params).then(res=>{
        this.mtkwarehouse = res.data;
        console.log(this.mtkwarehouse);
        this.mtkwarehouse.warefenlei.forEach(item=>{
          this.value.push(item.shopClassId)
        })
      }).catch()

    },
    //商品分类查询
    queryspfenlei(){
      this.$axios.get("shopinfo.action/queryallshoptype.action").then(res=>{
        this.fl = res.data;
        console.log(this.fl);
      }).catch()
    },
    //修改仓库
    UpdateWareHouse(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fl.length==0){
            this.$message.error("请选择商品分类")
            // this.$message.error("请选择商品分类");
            return ;
          }
          var params = new URLSearchParams();
          params.append("Id",this.mtkwarehouse.id);
          params.append("warName",this.mtkwarehouse.warName);
          params.append("warMaxStock",this.mtkwarehouse.warMaxStock);
          params.append("isCheck",0);
          params.append("list",this.value);
        this.$axios.post("updatewarehbyid.action",params).then(res=>{
                      this.$message.success(res.data.msg);
          this.$emit('success',false);
        }).catch()
        } else {
          console.log('error submit!!');
          return false;
        }

      });
    }
  },
  created() {
this.queryspfenlei();
  }
}
</script>

<style scoped>

</style>
