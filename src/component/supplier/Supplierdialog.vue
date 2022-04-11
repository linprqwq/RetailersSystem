<template>

<!--供应商对话框-->
  <div>
    <el-form label-width="80px" :model="shop">
          <el-form-item label="商品名">
          <el-input v-model="shop.proname"  ></el-input>
          </el-form-item>

      <!--<el-form-item label="商品分类">
        <el-input v-model="shop.shoptype.name" readonly></el-input>
      </el-form-item>-->

      <el-form-item label="提供价格">
        <el-input v-model="shop.supplierPrice"></el-input>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>

    export default {
        name: "Supplierdialog",
      data(){
          return{
            shop:{/*proname:"1",type:{name:"1"}*/},
            addform:{
            pId:"",
            gId:""
            }
          }
      },
      methods:{
            getObject(id){
              //去根据商品id查询商品表里面的数据
              let params=new URLSearchParams();
              params.append("id",id);
              console.log(id)
          this.$axios.get("queryspid.action", {params:params}).
          then(res=>{

            this.shop=res.data;
            console.log(res.data)
          })
              .catch(err=>{
            this.$message.warning(err)
                alert(Array)
              })
            }
      },
        submit(id){
                //当前用户id从coke里面取出
            this.addform.pid=sessionStorage.getItem("id");
            this.addform.gid=id;


//去调用异步，进行数据添加，需要去审核
      this.$axios.put("goodsSupplied/addsupplierSupplyOfGoods.action",this.addform).then(res=>{
        if(res.data.x){
          this.$message.success(res.data.msg);
        }else{
this.$message.error(res.data.msg);
        }
      }).catch(err=>{
        this.$message.warning(err);
        alert(err);
      })
        }
    }
</script>

<style scoped>

</style>
