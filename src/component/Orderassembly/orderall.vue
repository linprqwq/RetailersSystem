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
          <el-table-column v-if="scope.row.status==1">
<template  slot-scope="scope1">
  <el-button
    size="mini"
    type="danger"
    @click="addspingcart(scope1.$index, scope1.row.proid)" v-if="scope.row.status==1">加入购物车</el-button>
</template>
          </el-table-column>

        </el-table>

      </template>
    </el-table-column>

    <el-table-column
      prop="zprice"
      label="总价"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="qxddorder(scope.$index, scope.row)" v-if="scope.row.status==2">取消订单</el-button>
        <el-button
          size="mini"
          @click="updatestatus(scope.$index, scope.row)" v-if="scope.row.status==3">取消订单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="confirmorder(scope.$index, scope.row)" v-if="scope.row.status==4">确认收货</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="fk(scope.$index, scope.row)" v-if="scope.row.status==2">付款</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="pj(scope.$index, scope.row)" v-if="scope.row.status==5">待评价</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteorderbyid(scope.$index, scope.row)" v-if="scope.row.status==1">删除订单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="addgwc(scope.$index, scope.row)" v-if="scope.row.status==1">加入购物车</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="sqtuikuan(scope.$index, scope.row)" v-if="scope.row.status==5">申请退货</el-button>
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

  <!--  编辑页面-->
  <el-dialog
    title="退货申请表"
    :visible.sync="editdialogVisible"
    width="30%"
    :before-close="handleClose">
    <!-- 动态组件   指定添加vue页面在模态框显示-->
    <component ref="eds" is="returngoods"></component>

    <el-button type="primary" @click="qdreturngoods">确 定</el-button>
    <el-button @click="editdialogVisible = false">取 消</el-button>

  </el-dialog>
</div>
</template>

<script>
import returngoods from "../Commodity/returngoods";
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
      gwcall:[],
      editdialogVisible:false,
    }
  },
  components:{
    returngoods
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
    //付款
    fk(){

    },
    //评价
    pj(){

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
    },

    //多个购物车添加
    addgwc(a,b){
    b.ordderdetails.forEach(item=>{
      this.gwcall.push(item.proid)
    })
      var  params = new URLSearchParams();

      params.append("arr",this.gwcall);
      params.append("uid",b.uid);
      this.$axios.post("addgwc.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //单个购物车添加
    addspingcart(a,b){
      console.log(b);
      var params = new URLSearchParams();
      // 加入购物车  商品id 用户id 商品数量默认为1   如果购物车已有 购物车商品数量加1
      params.append("uid",this.useridd)
      params.append("cid",b)

      this.$axios.post("addspingcart.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //确认收货
    confirmorder(a,b){
      console.log(b)
      var params = new URLSearchParams();
      params.append("orderid",b.orderid);

      this.$axios.post("cofirmorder.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch()
    },
    //取消订单
    qxddorder(a,b){
      var params = new URLSearchParams();
      params.append("orderid",b.orderid);
      params.append("status",1);
      this.$axios.post("qxddorder,action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch()
    },
    //打开退货窗口
    sqtuikuan(a,b){
      var id;
      this.editdialogVisible=true;
      console.log(b.ordderdetails);
      b.ordderdetails.forEach(item=>{
        id = item.id;
      })
      //根据id查询数据
      this.$nextTick(item=>{
        this.$refs.eds.getdata(b.orderid,id);
      })

    },
    //窗口关闭确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editdialogVisible = false
          this.adddialogVisible = false
          this.$refs.eds.fileList=[];

        })
        .catch(_ => {});
    },
    //点击确定按钮，执行returngoods.vue组件中添加添加方法
    qdreturngoods(){
      this.editdialogVisible = false;
      this.$refs.eds.submitUpload();
    },

  },


  mounted(){
    this.queryorderdfk();
  }

}
</script>

<style scoped>

</style>
