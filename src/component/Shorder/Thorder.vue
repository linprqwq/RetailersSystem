<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="商品名称"
      width="180">
      <template slot-scope="scope">
        {{scope.row.olist[0].proname}}
      </template>
    </el-table-column>
    <el-table-column
      label="商品图片"
      width="180">
      <template slot-scope="scope" >
        <img :src="scope.row.olist[0].proimage" style="width: 80px;height: 80px">
      </template>
    </el-table-column>
    <el-table-column
      label="商品单价"
      width="150">
      <template slot-scope="scope">
        {{scope.row.olist[0].prosprice}}
      </template>
    </el-table-column>
    <el-table-column
      label="商品数量"
      width="150">
      <template slot-scope="scope">
        {{scope.row.olist[0].quantity}}
      </template>
    </el-table-column>
    <el-table-column
      label="商品总价"
      width="150">
      <template slot-scope="scope">
        {{scope.row.olist[0].totalpirce}}
      </template>
    </el-table-column>
    <el-table-column
      prop="tmoney"
      label="退款金额"
      width="150">
    </el-table-column>
    <el-table-column
      prop="thtime"
      label="退货时间">
    </el-table-column>
    <el-table-column
      prop="thyy"
      label="退货理由">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" type="primary"
          @click="handleEdit(scope.row)">确认退货</el-button>
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
        name: "Thorder",
      data(){
          return{
            tableData:[],
            useridd:sessionStorage.getItem('id'),
            pageno:1,   //页码
            pagesize:5,   //页size
            total:1
          }
      },
      methods:{

            getdata(){
              var params=new URLSearchParams();
              params.append("sid",this.useridd);
              params.append("audit",1);
              params.append("commstate",1);
              params.append("pageno",this.pageno);
              params.append("pagesize",this.pagesize);
              this.$axios.post("queryreturnstop.action",params).then(res=>{
                this.tableData=res.data.records;//获取所有要展示的数据
                this.total = res.data.total; //总记录数量
              }).catch()
          },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          this.pagesize= val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          this.pageno=val;
          this.getdata()

        },
        handleEdit(row){
          var params=new URLSearchParams()
          params.append("id",row.id);
          params.append("commstate",2);
          this.$axios.post("uptcommstate.action",params).then(res=>{
            this.$message.success(res.data.msg);
            this.getdata()
          })
        }
      },
      created() {
          this.getdata();
      }
    }
</script>

<style scoped>

</style>
