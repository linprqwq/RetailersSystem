<template>
  <!--采购单历史记录-->
  <div>
    <el-table :data="purchase">
      <el-table-column label="采购单编号" prop="buyNumber"></el-table-column>
      <el-table-column label="供应商" prop="userinfo.username"></el-table-column>
      <el-table-column label="采购时间" prop="ptime"></el-table-column>
      <el-table-column label="采购数量" prop="totalNum"></el-table-column>
      <el-table-column label="采购总价" prop="totalMoney"></el-table-column>
      <el-table-column label="发货状态">
        <template slot-scope="scope">
          <el-tag  type="warring" v-if="scope.row.isShipments==0&&scope.row.isAudit==2">未发货</el-tag>
          <el-tag type="success" v-if="scope.row.isShipments==1">已发货</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="cgdetiles(scope.row.id)">采购详情</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <div>
      <!--去显示采购详情表里面的数据-->
      <el-dialog
        title="采购单详情"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <component ref="cgshde" is="CgShDetails"></component>
        <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
      </el-dialog>

    </div>


  </div>
</template>

<script>

  import CgShDetails from "../procurement/CgShDetails";
    export default {
        name: "selectgyorder",
      data(){
          return{
            purchase:[],
            cg:{
              buyNumber:"",
              supplyId:sessionStorage.getItem("id"),//供应商id
            },
            pageno:1 ,  //页码
            pagesize:5,  //每一页显示的数量
            total:1,
            dialogVisible:false   //状态
          }
      },
      methods:{

        handleClose(){
          this.dialogVisible=false;
          this.$refs.cgshde.purchaseDetails=[];
        },
          getData(){
          var params=new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);
          Object.keys(this.cg).forEach(item=>{
            params.append(item,this.cg[item]);
          })
          this.$axios.get("purchaseInfo/selectgyorder.action",{params:params}).
          then(res=>{
           this.purchase=res.data.records;
           this.total=res.data.total;
          }).catch(err=>{
            this.$message.error(err);
          })
          },
        //去查看详情
        cgdetiles(pid){
          this.dialogVisible=true;
          this.$nextTick(item=>{
            this.$refs.cgshde.purchaseDetail.pid=pid;
            this.$refs.cgshde.getData();
          })
        },
        handleSizeChange(val){
          //每页范围
          this.pagesize=val;
          this.getData();
        },
        handleCurrentChange(val){
          //当前页
          this.pageno=val;
          this.getData();
        }

      },components:{
        CgShDetails
      },
      created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
