<template>
  <div>

    <el-input v-model="ckmName" placeholder="请输入您要查询的仓库名" style="width: 200px;"></el-input>
    <el-button type="primary" @click="queryallck()">查询</el-button><br><br>
    <el-button type="primary" @click="addwarehouse()" style="position: relative;left: -800px">添加仓库</el-button>
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
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updatewarehoures(scope.$index, scope.row)">修改仓库</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="querywarexqbyid(scope.$index, scope.row)">查看仓库详情</el-button>
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

    <!--  退货页面-->
    <el-dialog
      title="新增仓库"
      :visible.sync="AddCk"
      width="30%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="awhref" is="AddWareHouse"v-on:success="success(false)"></component>
      <el-button type="primary" @click="AddWHouse('awhref')">确 定</el-button>
      <el-button @click="AddCk = false">取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import AddWareHouse from "./AddWareHouse";
export default {
  name: "CkView",
  data(){
    return{
      ckall:[],
      pageno:1,   //页码
      pagesize:5,   //页size
      total:1,   //查询到的总记录数量
      search: '',
      ckmName:'',
      AddCk:false,
    }
  },
  components:{
    AddWareHouse
  },
  methods:{
    //查询仓库
    queryallck(){
      var params = new URLSearchParams();
      params.append("pageno",this.pageno);
      params.append("pagesize",this.pagesize);
      //仓库名
      params.append("warName",this.ckmName);

      this.$axios.post("queryallck.action",params).then(res=>{
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
      this.pageno=val;
      this.queryallck()

    },
    //修改仓库
    updatewarehoures(){
      //模态框展示
    },
    //查看商品详情
    querywarexqbyid(){
      //模态框展示
    },
    addwarehouse(){
    this.AddCk = true;
    },
    //窗口关闭确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.AddCk = false
        })
        .catch(_ => {});
    },
    //接受子组件的事件调用
    success(res){
      this.AddCk=res;
      this.queryallck();
    },
    AddWHouse(formName){
      this.$refs.awhref.addcka(formName);
    }
  },

  created() {
    this.queryallck();
  }
}
</script>

<style scoped>

</style>
