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
          prop="uid"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sid"
          label="商户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="payment"
          label="实付金额"
          width="180">
        </el-table-column>
        <!--<el-table-column
          prop="paymenttime"
          label="支付时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sendtime"
          label="发货时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endtime"
          label="订单完成时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="colsetime"
          label="交易关闭时"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          width="180">
        </el-table-column>-->
        <el-table-column
          prop="status"
          label="订单状态"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary"
              @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
      <el-dialog title="角色编辑" :visible.sync="editmodalVisible">
        <el-form >


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editmodalVisible = false">取 消</el-button>
          <el-button type="primary" @click="editmodalVisible = false">确 定</el-button>
        </div>
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
        name: "Allorder",
      data(){
        return{
          tableData:[],
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1
        }
      },
      methods:{
          getdata(){
            var params=new URLSearchParams();
            params.append("sid",2);
            params.append("pageno",this.pageno);
            params.append("pagesize",this.pagesize);
            this.$axios.post("queryshorder.action",params).then(res=>{
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
        this.editform=row;  //简易方式  直接获取页面数据展示
        //TODO 课后  接收id，数据库查询 ，展示在页面
      }

      },
      created() {
          this.getdata();
      }
    }
</script>

<style scoped>

</style>
