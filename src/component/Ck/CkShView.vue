<template>
  <div>
  <el-input v-model="ckmName" placeholder="请输入您要查询的仓库名" style="width: 200px;"></el-input>
  <el-button type="primary" @click="queryallck()">查询</el-button><br><br>
  <el-table
    :data="ckall"
    style="width: 100%">
    <el-table-column
      label="仓库名"
      prop="warName">
    </el-table-column>
    <el-table-column
      label="仓库最大库存"
      prop="warMaxStock">
    </el-table-column>
    <el-table-column label="仓库分类" width="180">

      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.shoptypename }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">查看分类详情</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          type="success"
          size="mini"
          @click="tgsh( scope.row)">通过审核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="btgsh( scope.row)">不通过审核</el-button>
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
        name: "CkShView",
      data(){
          return{
            ckall:[],
            pageno:1,   //页码
            pagesize:5,   //页size
            total:1,   //查询到的总记录数量
            ckmName:'',
            editmodalVisible:false
          }
      },
      methods:{
        queryallshck(){
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);
          //仓库名
          params.append("warName",this.ckmName);
          this.$axios.post("queryallshck.action",params).then(res=>{
            this.total = res.data.total; //总记录数量
            this.ckall = res.data.records;

          }).catch()
        },
        //分页控件
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          this.pagesize= val;
          this.queryallck()
        },
        //页码发生改变
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          this.pageno = val;
          this.queryallck()

        },
        tgsh(row){
          var params=new URLSearchParams();
          params.append("id",row.id)
          params.append("isCheck",1)
          this.$axios.post("cksh.action",params).then(res=>{
            this.$message.success(res.data.msg);
            this.queryallshck()
          }).catch()
        },
        btgsh(row){
          var params=new URLSearchParams();
          params.append("id",row.id)
          params.append("isCheck",2)
          this.$axios.post("cksh.action",params).then(res=>{
            this.$message.success(res.data.msg);
            this.queryallshck()
          }).catch()
        }
        },
      created() {
        this.queryallshck();
      }
    }
</script>

<style scoped>

</style>
