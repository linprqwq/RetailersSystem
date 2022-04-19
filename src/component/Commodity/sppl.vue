<template>
<div>
  <el-row type="flex" class="row-bg" v-for="a in plall" >
    <br><br><br><br><br>
    <el-col :span="24">

      <img :src="'/src/'+a.userinfo.img" style="height: 50px;width: 50px;">
      <span id="span">{{a.userinfo.username}}</span>
      <el-rate
        v-model="a.tscore" disabled
        show-text>
      </el-rate>
      <span>评论时间:{{a.commenttime}}</span><br>
     <el-col :span="24">

       <span >内容:{{a.content}}</span>
     </el-col>
    </el-col>

  </el-row>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageno"

    :page-size="pagesize"
    layout="total, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: "sppl",
  data(){
    return{
      plall:[],
      pageno:1,   //页码
      pagesize:5,   //页size
      total:1,   //查询到的总记录数量
    }
  },
  methods:{
    plallbyid(){

      var params = new URLSearchParams();
      params.append("pageno",this.pageno);
      params.append("pagesize",this.pagesize);
      params.append("cid",this.$route.query.comid)
      this.$axios.post("plallbyid.action",params).then(res=>{
        this.total = res.data.total; //总记录数量
        this.plall = res.data.records;
        console.log(this.plall);
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
  },
  created() {
    this.plallbyid();
  }


}
</script>

<style scoped>
#span{
  position: relative;
  top: -20px;
}
</style>
