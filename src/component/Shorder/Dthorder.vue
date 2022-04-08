<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="支付时间">
              <span>{{ props.row.paymenttime }}</span>
            </el-form-item>
            <el-form-item label="发货时间">
              <span>{{ props.row.sendtime }}</span>
            </el-form-item>
            <el-form-item label="订单完成时间">
              <span>{{ props.row.endtime }}</span>
            </el-form-item>
            <el-form-item label="交易关闭时间">
              <span>{{ props.row.colsetime }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createtime }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updatetime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户id"
        width="180">
        <template slot-scope="scope">
          <span v-for="a in tableData3" v-if="a.id==scope.row.uid">{{a.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商户id"
        width="180">
        <template slot-scope="scope">
          <span v-for="a in tableData3" v-if="a.id==scope.row.sid">{{a.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payment"
        label="实付金额"
        width="180">
      </el-table-column>
      <el-table-column
        label="订单状态"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='4'">待提货</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.row)">查看详情</el-button>
          <el-button
            size="mini" type="success"
            @click="uptsaatus(scope.row)">确认提货</el-button>
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
    <el-dialog title="订单详情" :visible.sync="editmodalVisible"  width="90%">
      <el-form >
        <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="订单详情编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="proid"
            label="商品id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="proname"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="proimag"
            label="商品图片">
          </el-table-column>
          <el-table-column
            prop="prosprice"
            label="商品单价">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="商品数量">
          </el-table-column>
          <el-table-column
            prop="totalpirce"
            label="商品总价">
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="updatetime"
            label="跟新时间">
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 250px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 70%;
  }
  </style>

<script>
    export default {
        name: "Dthorder",

  data(){
  return{
    tableData:[],
    tableData2:[],
    tableData3:[],
    pageno:1,   //页码
    pagesize:5,   //页size
    total:1,
    editmodalVisible:false
  }
  },
  methods:{
  getdata(){
    var params=new URLSearchParams();
    params.append("sid",2);
    params.append("status",4);
    params.append("pageno",this.pageno);
    params.append("pagesize",this.pagesize);

  this.$axios.post("queryshdshorder.action",params).then(res=>{
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
  handleEdit(row){  //编辑按钮
  //打开边界模态框
  this.editmodalVisible=true;
    var params=new URLSearchParams();
    params.append("orderid",row.orderid);
  this.$axios.post("ordderdetails/queryshorderdetails.action",params).then(res=>{
                                                                                 this.tableData2=res.data;//获取所有要展示的数据
                                                                               }).catch()
  },
  uptsaatus(row){
    var params=new URLSearchParams();
    params.append("orderid",row.orderid);
    params.append("status",5);
  this.$axios.post("uptorderdsh.action",params).then(res=>{
                                                         alert(res.data.msg)
                                                         this.getdata()
                                                         }).catch()
  },
  alluser(){
  this.$axios.post("queryallusername.action").then(res=>{
                                                         this.tableData3=res.data;
                                                       }).catch()
  }
  },
  created() {
    this.getdata();
    this.alluser();
  }
  }
  </script>

<style scoped>

</style>
