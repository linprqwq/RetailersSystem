<template>
  <div>
    <el-table :data="purchases">
      <el-table-column prop="buyNumber" width="180px" label="采购编号"></el-table-column>
      <el-table-column prop="totalMoney" label="采购总金额"></el-table-column>
      <el-table-column prop="totalNum" label="采购总数量"></el-table-column>
      <el-table-column prop="ptime" width="180px" label="采购时间"></el-table-column>
      <el-table-column prop="userinfo.username" label="供应商"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link type="info" @click="showdetail(scope.row.id)">查看详情</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.isDesign==0">
            <el-button size="mini" type="primary" @click="bePutInStorage(scope.row.id)">设计指定仓库</el-button>
          </div>
          <div v-if="scope.row.isDesign==1">
            <el-button size="mini" type="primary" @click="designPutInStorage(scope.row.id)">修改指定仓库</el-button>
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


    <!--查询等待分配的供应商商品对话框-->
    <div>
      <el-dialog
        title="为商品选择仓库"
        :visible.sync="t1_Visible"
        width="70%">
        <component ref="purchasedialog1" is="PurchaseDialog1"></component>
        <!--根据采购详情表下的商品维护id，展示-->
        <div>
          <el-dialog
            title="请选择仓库"
            :visible.sync="t2_Visible"
            width="50%"
            append-to-body>
            <component ref="" is=""></component>
            <div slot="footer" class="dialog-footer">
              <el-button @click="t2_Visible = false">取 消</el-button>
            </div>
          </el-dialog>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="t1_Visible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import PurchaseDialog1 from "./PurchaseDialog1";

    export default {
        name: "WahourSgather",
      data() {
        return {
          t1_Visible:false,
          t2_Visible:false,
          purchases: [],
          purchase: {buyNumber: "", isAudit: 0},
          pageno: 1,
          pagesize: 5,
          total: 1,
          dialogVisible:false
        }
      },
      components:{
        PurchaseDialog1
      },
      methods:{
        getPurchases() {
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          Object.keys(this.purchase).forEach(item => {
            params.append(item, this.purchase[item]);
          });
          this.$axios.get("purchaseInfo/purchase.action", {params: params})
            .then(res => {
              this.purchases = res.data.records;
              this.total = res.data.total;
            })
            .catch(err => {
              this.$message.error(err)
            })
        },
        handleClose() {
          //关闭
          this.dialogVisible=false;
          this.$refs.cgshde.purchaseDetails=[];
        },
        bePutInStorage(id){
          //调用异步，根据采购id，添加入库表和入库详情表数据
          this.$axios.get("gatherInfo/addGatherInfoandDetailPurchaseInfo.action/"+id,null)
            .then(res=>{
              if(res.data.x){
                this.$message.success(res.data.msg);
                //打开对话框
                this.t1_Visible=true;
                //调用子组件函数，进行查询该采购单下的所有详情数据
                this.$nextTick(item=>{
                  this.$refs.purchasedialog1.getData(id);
                  //重新刷新数据
                  this.getPurchases();
                });
              }else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err=>{
              this.$message.warning(err);
              alert(err);
            })
        },
        designPutInStorage(id){
          //打开对话框
          this.t1_Visible=true;
          //调用子组件函数，进行查询该采购单下的所有详情数据
          this.$nextTick(item=>{
            this.$refs.purchasedialog1.getData(id);
          });
        },
        search() {
          this.getPurchases();
        },
        handleSizeChange(val) {
          //每页范围
          this.pagesize = val;
          this.getPurchases();
        },
        handleCurrentChange(val) {
          //当前页
          this.pageno = val;
          this.getPurchases();
        }
      },
      created() {
        this.getPurchases();
      }
    }
</script>

<style scoped>

</style>
