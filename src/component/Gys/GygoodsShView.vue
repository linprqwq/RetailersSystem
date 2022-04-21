<template>
  <el-main>
    <el-table
      :data="goodsSuppliedData"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column prop="userinfo.username" label="供应商名"></el-table-column>
      <el-table-column prop="commodity.proname" label="商品名"></el-table-column>
      <el-table-column prop="supplierPrice" label="供应商提供的价格"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="audit(scope.row.id,1)">审核通过</el-button>
          <el-button size="mini" type="danger" @click="audit(scope.row.id,2)">不通过</el-button>        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-main>
</template>

<script>
    export default {
        name: "GygoodsShView",
      data(){
          return{
            goodsSuppliedData:[],
            pageno:1,
            pagesize:5,
            total:1,
            goodsupplied:{
              isCheck:0,
              isDelete:0
            }
          }
      },
      methods:{
          getdata(){
            var params = new URLSearchParams();
            params.append("pageno",this.pageno);
            params.append("pagesize",this.pagesize);

            Object.keys(this.goodsupplied).forEach(item=>{
              params.append(item,this.goodsupplied[item]);
            })
            this.$axios.get("/goodsSupplied/queryALlPage.action",{params:this.goodsupplied})
              .then(response=>{
                console.log(response)
                this.goodsSuppliedData = response.data.records;//获取所有要展示的数据
                this.total = response.data.total; //总记录数量
                console.log(response);
                this.goodsSuppliedData.forEach((item)=> {
                  item.imgpath = this.path+item.imgpath;
                })

              }).catch();
          },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          console.log(`每页 ${val} 条`);
          this.pagesize= val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          console.log(`当前页: ${val}`);
          this.pageno=val;
          this.getdata()
        },
        audit(id,isCheck){
          let supplierSupplyOfGoods={
            id:id,
            isCheck:isCheck
          }
          //调用异步，进行审核
          this.$axios.post("/goodsSupplied/checkGoodsupplied.action",supplierSupplyOfGoods)
            .then(res=>{
              if(res.data.code=="1"){
                // this.$message.success(res.data.msg);
                alert(res.data.msg)
                this.getdata();
              }else {
                // this.$message.error(res.data.msg);
                alert(res.data.msg)
              }
              //重新查询一次数据
              this.getdata();
            })
            .catch(err=>{
              this.$message.warning(err);
              alert(err);
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
