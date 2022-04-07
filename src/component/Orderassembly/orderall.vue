<template>
<div>
  <el-tabs v-model="activeName" @tab-click="queryorderdfk">
    <el-tab-pane label="全部订单" ></el-tab-pane>
    <el-tab-pane label="待付款订单" name="2"></el-tab-pane>
    <el-tab-pane label="待收货订单" name="4"></el-tab-pane>
    <el-tab-pane label="已提货订单" name="5"></el-tab-pane>
    <el-tab-pane label="已取消订单" name="1"></el-tab-pane>
  </el-tabs>

  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      prop="orderid"
      label="订单编号"
      width="180">
    </el-table-column>

    <el-table-column label="商品信息">
      <template slot-scope="scope">
        <el-table border :data='scope.row.ordderdetails' >
          <el-table-column prop='proname' label="订单商品"></el-table-column>
          <el-table-column prop='quantity' label="数量"></el-table-column>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column
      prop="ordderdetails.totalpirce"
      label="总价">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="updatestatus(scope.$index, scope.row)" v-if="scope.row.status==2">取消订单</el-button>
        <el-button
          size="mini"
          @click="updatestatus(scope.$index, scope.row)" v-if="scope.row.status==3">取消订单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.status==4">确认收货</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.status==2">付款</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.status==5">待评价</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteorderbyid(scope.$index, scope.row)" v-if="scope.row.status==1">删除订单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.status==1">加入购物车</el-button>
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
  name: "orderall",
  data(){
    return{
      activeName: '',
      useridd:sessionStorage.getItem('id'),
      list:[],
      search: '',
      pageno:1,   //页码
      pagesize:5,   //页size
      total:1,   //查询到的总记录数量
    }
  },
  methods: {
    //根据当前登录id查询订单
    queryorderdfk(){
      var params = new URLSearchParams();
      params.append("pageno",this.pageno);
      params.append("pagesize",this.pagesize);
      params.append("uid",this.useridd);
      params.append("status",this.activeName);
      this.$axios.post("queryuserorder.action",params).then(res=>{
        this.total = res.data.total; //总记录数量
        this.list = res.data.records;
        console.log(this.list)
      }).catch()
    },
    //分页控件
    handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
      this.pagesize= val;
      this.queryorderdfk()
    },
    //页码发生改变
    handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
      this.pageno=val;
      this.queryorderdfk()

    },
    //删除当前订单
    deleteorderbyid(index,row){
      console.log(row);
      var orderallparams  = new URLSearchParams();

      orderallparams.append("orderid",row.orderid)

      this.$axios.post("delorder.action",orderallparams).then(res=>{
        this.$message.success(res.data.msg);
          this.queryorderdfk();
      }).catch();
    }
  },

  mounted(){
    this.queryorderdfk();
  }

}
</script>

<style scoped>

</style>
