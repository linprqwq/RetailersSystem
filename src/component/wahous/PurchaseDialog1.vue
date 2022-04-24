<template>
  <div>
    <el-table :data="purchaseDetails">
      <el-table-column prop="goodsupplied.commodity.proname" label="商品名称"></el-table-column>
      <el-table-column prop="shopPrice" label="采购价格(元)"></el-table-column>
      <el-table-column prop="shopNum" label="采购数量"></el-table-column>
      <el-table-column prop="totalPrice" label="小计价格(元)"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.isDesign==0">
            <el-button size="mini" type="primary" @click="config(scope.row.id,false)">选择仓库</el-button>
          </div>
          <div v-if="scope.row.isDesign==1">
            <el-button size="mini" type="danger" @click="config(scope.row.id,true)" disabled>已指定仓库</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageno"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <div v-if="purchaseDetails.length>count">
        <el-button size="medium" type="danger" disabled>最终提交</el-button>
      </div>
      <div v-if="purchaseDetails.length==count">
        <el-button size="medium" type="danger" @click="submit">最终提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "PurchaseDialog1",
      data(){
        return{
          test:"",
          id:null,
          count:0,
          purchaseDetails: [],
          pageno: 1,
          pagesize: 5,
          total: 1
        }
      },
      methods: {
        getData(id) {
          this.id=id;
          var params = {}
          params["pageno"] = this.pageno;
          params["pagesize"] = this.pagesize;
          params["pid"] = id;
          this.$axios.get("purchaseDetailInfo/purchaseDetail.action", {params: params})
            .then(res => {
              this.purchaseDetails = res.data.records;
              this.total = res.data.total;
              this.count=0;
              //当查询结束时，查询是否全部商品都指定了仓库
              this.purchaseDetails.forEach(item=>{
                if(item.isDesign==1){
                  this.count++;
                }
              });
              console.log(this.purchaseDetails.length);
              console.log(this.count);
            })
            .catch(err => {
              this.$message.error(err)
            })
        },
        config(id,specifiedState){
          //将采购单详情id存入sessionStorage中，
          sessionStorage.setItem("purchaseInfoId",id);
          this.purchaseInfoId=id;
          //调用父组件函数，打开对话框，并且传入仓库选择状态
          this.$parent.$parent.openPurchasedialog2(id,specifiedState);
        },
        submit(){
          //最终提交
          this.$axios.get("gatherInfo/changeDetailInfoState.action/"+this.id,null)
            .then(res=>{
              if(res.data.x){
                this.$message.success(res.data.msg);
                //重新刷新数据
                this.$parent.$parent.getPurchases();
              }else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err=>{
              this.$message.warning(err);
              alert(err);
            })
        },
        handleSizeChange(val) {
          //每页范围
          this.pagesize = val;
          this.getData(this.id);
        },
        handleCurrentChange(val) {
          //当前页
          this.pageno = val;
          this.getData(this.id);
        }
      }
    }
</script>

<style scoped>

</style>
