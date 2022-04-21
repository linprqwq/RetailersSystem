<template>
  <div>
    <el-table
      :data="ckdetails"
      style="width: 100%">
      <el-table-column
        label="商品名"
        prop="commodity.proname">
      </el-table-column>
      <el-table-column
        label="商品类别"
        prop="commodity.shopTypeInfo.name">
      </el-table-column>
      <el-table-column
        label="供应商"
        prop="userinfo.username">
      </el-table-column>
      <el-table-column
        label="最大存储量"
        prop="maxNum">
      </el-table-column>
      <el-table-column
        label="最小存储量"
        prop="minNum">
      </el-table-column>
      <el-table-column
        label="仓库最大库存"
        prop="commodity.proname">
      </el-table-column>
      <el-table-column
        label="仓库最大库存"
        prop="commodity.proname">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="">编辑
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: "CkDetails",
  data() {
    return {
      ckdetails: [],
      pageno: 1,   //页码
      pagesize: 5,   //页size
      total: 1,   //查询到的总记录数量
    }
  },
  methods: {
    querywaredetails(row) {
      console.log(row)
      var params = new URLSearchParams();
      params.append("pageno", this.pageno);
      params.append("pagesize", this.pagesize);
      params.append("pId", row.id);
      this.$axios.post("querywaredetails.action",params).then(res => {
        this.ckdetails = res.data.records;
      }).catch()
    },
    //分页控件
    handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
      this.pagesize = val;
      this.queryallck()
    },
    //页码发生改变
    handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
      this.pageno = val;
      this.queryallck()

    },
  },
  created() {

  }
}
</script>

<style scoped>

</style>
