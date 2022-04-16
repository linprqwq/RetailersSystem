
<template>
 <div>

   <el-button style="float: left" type="success" @click="adddialogVisible=true">添加商品</el-button>
   <el-button style="float: right" type="primary" @click="submitForm()">创建采购单</el-button>
   <br>
   <br>
   <el-table
     :data="CgTable"
     tooltip-effect="dark"
     @selection-change="handleSelectionChange"
     style="width: 100%">
     <el-table-column type="selection" width="55"></el-table-column>
     <el-table-column prop="id" label="编号" width="100"></el-table-column>
     <el-table-column prop="proname" label="商品名称" width="100"></el-table-column>
     <el-table-column prop="prodetails" label="商品详情" width="180"></el-table-column>
     <el-table-column prop="prozimg" label="商品图片" width="100">
       <template slot-scope="scope">
         <img :src="scope.row.prozimg" style="width: 40px;height: 40px">
       </template>
     </el-table-column>
     <el-table-column label="供应商" width="180">
       <template slot-scope="scope">
            <el-select v-model="scope.row.goodsupplid" @change="addPrice(scope.$index)" placeholder="选择供应商">
              <el-option
                v-for="item in goodsupplier"
                v-if="item.gid==scope.row.id"
                :label="item.userinfo.username"
                :value="item.id"
              ></el-option>
            </el-select>
       </template>
     </el-table-column>
     <el-table-column prop="supplierPrice" label="商品单价"></el-table-column>
     <el-table-column label="采购数量">
       <template slot-scope="scope">
         <el-input v-model.number="scope.row.shopNum"></el-input>
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button type="danger" @click="removeShop(scope.$index)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <el-dialog
     title="添加商品信息"
     :visible.sync="adddialogVisible"
     width="50%"
     :before-close="handleClose">
     <!-- 动态组件   指定添加vue页面在模态框显示-->
     <component ref="commo" is="Commodity"></component>

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
            adddialogVisible:false,
            CgTable:[],
            path:"http://127.0.0.1:9090/RetailersBackSystem/",
            goodsupplier:[],
            multipleSelection:[]
          }
      },
      components:{
        Commodity
      },
      methods:{
        submitForm(){
          if(this.multipleSelection.length>0){
            let suppliersIds = new Set();
            let purchaseInfos = []; //存入采购
            //组装数据
            this.multipleSelection.forEach(item => {
              //获取所有的供应商id
              suppliersIds.add(item.supplyId);
            });
            suppliersIds.forEach(item => {
              var purchaseInfo = {supplyId: item};
              let details = [];//存放详情数组
              this.multipleSelection.forEach(item2 => {
                if (item == item2.supplyId) {
                  var detail = {
                    goodsupplid: item2.goodsupplid,
                    shopNum: item2.shopNum
                  }
                  details.push(detail);
                }
              });
              purchaseInfo["purchaseDetails"] = details;
              purchaseInfos.push(purchaseInfo);
            });
            this.$axios
              .post("purchase/purchase.action", purchaseInfos)
              .then(res => {
                if (res.data.code == "0") {
                  this.$message.success(res.data.msg);
                  this.resetForm();
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch(err => {
                this.$message.error(err);
              })
          }else{
            this.$message.error("请选择再提交采购单")
          }
        },
        handleSelectionChange(val){
          this.multipleSelection=val;
        },
        //删除当前一行
        removeShop(index){
          this.$confirm('您确定要删除该商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.CgTable.splice(index, 1);
            this.$message.success("删除成功")
          }).catch();
        },
        //选择供应商显示用户以及价格
        addPrice(index){
          //选择供应商时添加价格
          let obj = this.goodsupplier.find(item => {
            return item.id == this.CgTable[index].goodsupplid;
          })
          this.CgTable[index].supplierPrice = obj.supplierPrice;
          this.CgTable[index].gysId = obj.userinfo.id;
        },
        //删除当前一行采购申请表
        getGooodSuppliers() {
          //获取供应商维护表
          this.$axios.get("/goodsSupplied/queryAllGoodSupplied.action")
            .then(res => {
              this.goodsupplier = res.data;
            })
            .catch(err => {
              this.$message.error(err)
            })
        },
        //添加商品到采购申请表格
        addComm(){
          if(this.$refs.commo.multipleSelection.length>0){
            this.CgTable=[]
            this.$refs.commo.multipleSelection.forEach(item=>{
              var obj={
                id:item.id,
                proname:item.proname,
                prodetails:item.prodetails,
                prozimg:item.prozimg,
                goodsupplid:"",
                supplyId: "",//供应商id
                goodsuppPrice: 0,//供应商提供的价格
                shopNum: 1
              }
              this.CgTable.push(obj)
              this.$message.success("添加成功")
              this.$refs.commo.$refs.tbl.clearSelection()
              this.adddialogVisible=false;
            })
          }else{
            this.$message.error("你没有选中商品")
          }
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
        }
      },
      created(){
          this.getGooodSuppliers();
      }
    }
</script>

<style scoped>

</style>
