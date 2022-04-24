<template>
  <div>
    <el-table :data="warehouseInfoList">
      <el-table-column prop="warName" label="仓库名"></el-table-column>
      <el-table-column prop="warehouseDetailsInfoList[0].commodity.proname" label="商品名"></el-table-column>
      <el-table-column prop="warehouseDetailsInfoList[0].lockStock" label="锁定库存"></el-table-column>
      <el-table-column prop="warehouseDetailsInfoList[0].maxNum" label="最大存储量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.isDeposit==true">
            <!--检查上个对话框传来的数据来判断，是否指定过仓库，如果指定过仓库，那么就可以重新指定仓库-->
            <div v-if="specifiedState==false">
              <el-button size="mini" type="primary" @click="config(scope.row.id)">放入到该仓库</el-button>
            </div>
            <div v-if="specifiedState==true">
              <el-button size="mini" type="danger" @click="changeConfig(scope.row.id)">变更到该仓库</el-button>
            </div>
          </div>
          <div v-if="scope.row.isDeposit==false">
            <el-button size="mini" type="danger" disabled>仓库已满</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
    export default {
        name: "PurchaseDialog2",
        data(){
          return{
            id:null,
            specifiedState:null,
            warehouseInfoList: [],
            pageno: 1,
            pagesize: 5,
            total: 1
          }
        },
      methods:{
        getData(id,specifiedState){
          this.specifiedState=specifiedState;
          this.warehouseInfoList=[];
          this.id=id;
          let purchaseDetailInfo={
            id:id
          };
          // 根据采购详情id，查询可以存放的仓库有哪些
          this.$axios.get("gatherInfo/storableWarehouse.action",{params:purchaseDetailInfo}).
          then((response)=> {   //异步调用成功执行
            //将查询到的数据存入对象数组中
            this.warehouseInfoList=response.data;
            console.log(this.warehouseInfoList);
            // this.total = response.data.total;
          }).catch(function (error) {//异步调用失败执行
            alert(error);
          });
        },
        config(warId){
          //调用异步，将采购单详情设置为已设计，并且修改入库申请详情的仓库id
          let params=new URLSearchParams();
          params.append("purchaseDetailInfoId", sessionStorage.getItem("purchaseInfoId"));
          params.append("warId", warId);
          this.$axios.get("purchaseDetail/changeDetailInfoState.action",{params:params})
            .then(res=>{
              if(res.data.x){
                this.$message.success(res.data.msg);
                //重新刷新数据
                this.$parent.$parent.$parent.$parent.$parent.getData(sessionStorage.getItem("purchaseInfoId"));
              }else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err=>{
              this.$message.warning(err);
              alert(err);
            })
        },
        changeConfig(warId){
          //调用异步，重新指定到该仓库
          let params=new URLSearchParams();
          params.append("purchaseDetailInfoId", sessionStorage.getItem("purchaseInfoId"));
          params.append("warId", warId);
          this.$axios.get("purchaseDetail/anewChangeDetailInfoState.action",{params:params})
            .then(res=>{
              if(res.data.x){
                this.$message.success(res.data.msg);
                //重新刷新数据
                this.$parent.$parent.$parent.$parent.$parent.getData(sessionStorage.getItem("purchaseInfoId"));
              }else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err=>{
              this.$message.warning(err);
              alert(err);
            })
        },
        handleSizeChange(val) {
          //每页范围
          this.pagesize = val;
          this.getData(this.id);
        },
        handleCurrentChange(val) {
          //当前页
          this.pageno = val;
          this.getData(this.id);
        }
      }
    }
</script>

<style scoped>

</style>
