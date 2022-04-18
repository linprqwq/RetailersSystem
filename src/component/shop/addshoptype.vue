<template>
  <!--去添加商品的分类-->
  <div>
    <el-form :model="addForm" status-icon  ref="addForm">
        <el-form-item label="分类名" prop="name"  >
          <el-input v-model="addForm.name" style="width: 200px;" placeholder="请输入分类名"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "addshoptype",
      data(){
          return{
            addForm:{
              name:""
            },//添加页面保存的数据，提交用
          }
      },methods:{
        submitUpload(forName){
          this.$axios.post("shopinfo.action/addsptype.acction",this.addForm).then(res=>{
              if(res.data.code>0){
                this.$message.success(res.data.msg);
                this.addForm={
                  name:""
                };
              }
          }).catch(err=>{
              this.$message.error(err);
          })
        }

      }
    }
</script>

<style scoped>

</style>
