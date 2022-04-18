<template>
  <div>
    <el-table :data="purchases">
      <el-table-column prop="buyNumber" width="180px" label="采购编号"></el-table-column>
      <el-table-column prop="totalMoney" label="采购总金额"></el-table-column>
      <el-table-column prop="totalNum" label="采购总数量"></el-table-column>
      <el-table-column prop="ptime" width="180px" label="采购时间"></el-table-column>
      <el-table-column prop="userinfo.username" label="供应商"></el-table-column>
      <el-table-column label="采购单状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.isShipments==0&&scope.row.isAudit==2">未发货</el-tag>
          <el-tag type="success" v-if="scope.row.isShipments==1">已发货</el-tag>
          <el-tag type="warning" v-if="scope.row.isAudit==0">待审核</el-tag>
          <el-tag type="info" v-if="scope.row.isAudit==1">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.isAudit==2">审核未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link type="info" @click="cgShDetail(scope.row.id)">查看详情</el-link>
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
    >
    </el-pagination>
    <el-dialog
      title="采购单详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <component ref="cgshde" is="CgShDetails"></component>
      <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
    </el-dialog>
  </div>

</template>

<script>
    import CgShDetails from "./CgShDetails";

    export default {
        name: "CgJlView",
      data() {
        return {
          purchases: [],
          purchase: {buyNumber: ""},
          pageno: 1,
          pagesize: 5,
          total: 1,
          dialogVisible:false
        }
      },
      components:{
        CgShDetails
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
          this.purchaseDetails=[];
        },
        cgShDetail(pid) {
          this.dialogVisible = true;
          this.$refs.cgshde.purchaseDetail.pid = pid;
          this.$refs.cgshde.getData();
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
