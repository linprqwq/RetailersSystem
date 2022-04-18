<template>
  <div>

      <el-table :data="purchaseDetails">
        <el-table-column prop="goodsupplied.commodity.proname" label="商品名称"></el-table-column>
        <el-table-column prop="shopPrice" label="采购价格"></el-table-column>
        <el-table-column prop="shopNum" label="采购数量"></el-table-column>
        <el-table-column prop="totalPrice" label="小计价格"></el-table-column>
      </el-table>
      <div>
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
      </div>

  </div>
</template>

<script>
    export default {
        name: "CgShDetails",
      data() {
        return {
          purchaseDetail:{pid:""},
          purchaseDetails: [],
          pageno: 1,
          pagesize: 5,
          total: 1,
        }
      },
      methods: {
        getData() {
          var params = {}
          params["pageno"]=this.pageno;
          params["pagesize"]=this.pagesize;
          Object.keys(this.purchaseDetail).forEach(item => {
            params[item]=this.purchaseDetail[item];
          });
          this.$axios.get("purchaseDetailInfo/purchaseDetail.action", {params: params})
            .then(res => {
              this.purchaseDetails=res.data.records;
              this.total = res.data.total;
            })
            .catch(err => {
              this.$message.error(err)
            })
        },
        search() {
          //按商品名称搜索
          this.getData();
        },
        handleSizeChange(val) {
          //每页范围
          this.pagesize = val;
          this.getData();
        },
        handleCurrentChange(val) {
          //当前页
          this.pageno = val;
          this.getData();
        }
      },
      created() {
        this.getData();
      }
    }
</script>

<style scoped>

</style>
