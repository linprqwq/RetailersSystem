<template>
  <div>
    <!--去获取采购单然后去发货-->
    <el-table :data="purchases">
      <el-table-column prop="buyNumber" label="采购单编号"></el-table-column>
      <el-table-column prop="totalMoney" label="采购总金额"></el-table-column>
      <el-table-column prop="totalNum" label="采购总数量"></el-table-column>
      <el-table-column prop="ptime" label="采购时间"></el-table-column>
      <el-table-column prop="user.uname" label="供应商"></el-table-column>

     <el-table-column label="采购单状态">
        <el-tag type="warning">总店发起采购,确认发货</el-tag>
      </el-table-column>

      <el-table-column label="操作">

        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row.id)" >
            查看详情
          </el-link>

          <el-button type="primary" @click="fhgoods(scope.row.id)" >
            确认发货
          </el-button>


        <!--  <el-dropdown  split-button type="primary" @click="showDetail(scope.row.id)">
            查看详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              <el-button size="medium"type="danger" @click="fhgoods(scope.row.id)">确认发货</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
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

    <div>
    <!--去显示采购详情表里面的数据-->
      <el-dialog
        title="采购单详情"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <component ref="cgshde" is="CgShDetails"></component>
        <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
      </el-dialog>

    </div>
  </div>

</template>

<script>

  import CgShDetails from "../procurement/CgShDetails";

    export default {
        name: "supplierfh",
      data(){
          return{
            purchases:[],
            purchase:{
              buyNumber:"",
              supplyId:sessionStorage.getItem("id"),//供应商id
              isShipments:0,//未发货
              isAudit:1//审核通过
            },
            pageno:1,   //页码
            pagesize:5,   //页size
            total: 1,
            dialogVisible:false
          }
      },
      methods:{
        handleClose(){
          this.dialogVisible=false;
          this.$refs.cgshde.purchaseDetails=[];
        },
          getPurchase(){
            var params=new URLSearchParams();
            //页码 页数
            params.append("pageno",this.pageno)
            params.append("pagesize",this.pagesize);

            Object.keys(this.purchase).forEach(item=>{
            params.append(item,this.purchase[item]);
            })
            this.$axios.get("purchaseInfo/purchase.action",{params:params}).
            then(res=>{
                  this.purchases=res.data.records;
                  this.total=res.data.total;
            }).catch(err=>{
              this.$message.error(err);
            })
          },
        //去查看详情
        showDetail(pid){
          this.dialogVisible=true;
          this.$nextTick(item=>{
            this.$refs.cgshde.purchaseDetail.pid=pid;
            this.$refs.cgshde.getData();
          })
        },
        //发货商品
        fhgoods(id){
              let purchaseInfo={
                id:id,
                isShipments:1, //去设置发货状态为发货
              };
              //去调用异步,去进行发货
          this.$axios.post("goodsSupplied/supplierfh.action",purchaseInfo)
          .then(res=>{
                if(res.data.x){
                    this.$message.success(res.data.msg);
                }else{
                  this.$message.error(res.data.msg);
                }
                this.getPurchase();
          }).catch(err=>{
        this.$message.error(err);
        alert(err);
          })
        },
        handleSizeChange(val){
            //每页范围
          this.pagesize=val;
          this.getPurchase();
        },
        handleCurrentChange(val){
            //当前页
          this.pageno=val;
          this.getPurchase();
        }
      },

      components:{
        CgShDetails
      },
      created() {
          this.getPurchase();
      }
    }
</script>

<style scoped>

</style>
