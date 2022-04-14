
<template>
 <div>
   <!--采购申请组件-->
<!--   供应商：<el-select v-model="pid" clearable placeholder="请选择" @change="getData()">-->
<!--   <el-option v-for="item in ops"-->
<!--              :key="item.id"-->
<!--              :label="item.username"-->
<!--              :value="item.id"-->
<!--   ></el-option>-->
<!-- </el-select>-->

   <el-button style="float: left" type="success" @click="adddialogVisible=true">添加商品</el-button>
   <el-button style="float: right" type="primary">创建订单</el-button>
   <br>
   <br>
   <el-table
     :data="CgTable"
     tooltip-effect="dark"
     style="width: 100%">
     <el-table-column prop="id" label="编号" width="100"></el-table-column>
     <el-table-column prop="proname" label="商品名称" width="100"></el-table-column>
     <el-table-column prop="prodetails" label="商品详情" width="180"></el-table-column>
     <el-table-column prop="prozimg" label="商品图片" width="100">
       <template slot-scope="scope">
         <img :src="scope.row.prozimg" style="width: 40px;height: 40px">
       </template>
     </el-table-column>
     <el-table-column label="供应商" width="180"></el-table-column>
   </el-table>
   <el-dialog
     title="添加商品信息"
     :visible.sync="adddialogVisible"
     width="50%"
     :before-close="handleClose">
     <!-- 动态组件   指定添加vue页面在模态框显示-->
     <component ref="commodity" is="Commodity"></component>

     <el-button type="primary" @click="addComm">添 加</el-button>
     <el-button @click="adddialogVisible = false">取 消</el-button>

   </el-dialog>
 </div>

</template>

<script>
  import Commodity from "./Commodity";
    export default {
        name: "Purchasing_application",
      data(){
          return{
            pid:"",
            ops:[],
            shops:[],
            adddialogVisible:false,
            CgTable:[],
            path:"http://127.0.0.1:9090/RetailersBackSystem/"
          }
      },
      components:{
        Commodity
      },
      methods:{
        addComm(){
          let cids=""
          let coms=this.$refs.commodity.multipleSelection;
          coms.forEach(item=>{
            cids+=item.id+",";
          })
          this.$axios.get("queryCommids.action",{params:{"cids":cids}})
            .then(response=>{
              this.CgTable=response.data
              this.CgTable.forEach((item)=> {
                item.prozimg = this.path+item.prozimg;
              })
              this.adddialogVisible=false
          }).catch()
        },
        //窗口关闭确认
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.editdialogVisible = false
              this.adddialogVisible = false
              this.$refs.editUser.fileList=[];
            })
            .catch(_ => {});
        },
        num1(row){
         row.num==1?1:row.num--
        },
        num2(row){
          row.num++
        },
          useroption(){
            this.$axios.get("userGysoption.action")
              .then((response) => {  //异步调用后成功执行
              //去将查询到的数据放入到数组中去getObject
              this.ops = response.data;
            }).catch(function (error) {  //异步调用失败去执行
              alert(error)
            })
          },
        getData(){
         if(this.pid!=""){
           let params={
             id:this.pid
           };
           //调用异步 ，根据当前用户,查询供应商目前可以添加到供应商维护商品表里面的商品
           this.$axios.get("goodsSupplied/selelctcomodity.action", {params: params})
             .then((response) =>{  //异步调用后成功执行
               if(response.data!=null){
                 //去将查询到的数据放入到数组中去getObject
                 this.shops = response.data;
               }
             }).catch(function (error) {  //异步调用失败去执行
             alert(error)
           })
         }

        }
      },
      created(){
          this.useroption();
          this.getData();
      }
    }
</script>

<style scoped>

</style>
