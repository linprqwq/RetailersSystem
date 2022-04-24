<template>
    <div>
      <el-table :data="GoodsSuppliedList">
        <el-table-column prop="userinfo.username" label="供应商名称"></el-table-column>
        <el-table-column prop="commodity.proname" label="商品名称"></el-table-column>
        <el-table-column prop="shopTypeInfo.name" label="商品分类"></el-table-column>
        <el-table-column prop="supplierPrice" label="供应商提供的价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="config_t1(scope.row.gid,scope.row.pid)">选择配置仓库</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "CkpzView",
      data(){
        return {
          supplierId:"",
          shopId:"",
          t1_Visible:false,
          t2_Visible:false,
          GoodsSupplied:{
            isCheck:1,//审核通过
            isDelete:0//正常供应中
          },
          GoodsSuppliedList:[],
          pageno: 1,
          pagesize: 5,
          total: 1
        }
      },
      methods:{
        getData(){
          let params=new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          Object.keys(this.GoodsSupplied).forEach(item=>{
            params.append(item,this.GoodsSupplied[item]);
          })
          //异步，查询未被删除的商品
          this.$axios.get("goodsSupplied/queryALlPage.action",{params:this.supplierSupplyOfGoods}).
          then((response)=> {   //异步调用成功执行
            //将查询到的数据存入对象数组中
            this.GoodsSuppliedList=response.data.records;
            this.total = response.data.total;
          }).catch(function (error) {//异步调用失败执行
            alert(error);
          });
        },
        config_t1(id,supplierId){
          //将该商品id存入vue对象内
          this.shopId=id;
          //将该供应商id存入vue对象内
          this.supplierId=supplierId;
          //打开对话框
          this.t1_Visible=true;
          //延迟加载，调用异步，查询出该商品id下的，等待配置到仓库、审核通过的、的供应商商品
          this.$nextTick(item=>{
            this.$refs.designatedWarehouse_T1dialog.getData(id);
          })
        },
        config_t2(id){
          //打开对话框
          this.t2_Visible=true;
          //延迟加载，调用子组件函数
          this.$nextTick(item=>{
            this.$refs.designatedWarehouse_T2dialog.getData(id);
          })
        },
        config_t2_submit(){
          //调用子组件函数
          this.$refs.designatedWarehouse_T2dialog.submit();
          //关闭全部对话框
          this.t1_Visible=false;
          this.t2_Visible=false;
          //重新刷新数据
          this.getData();
        },
        handleSizeChange(val) {
          //每页范围
          this.pagesize = val;
          this.getData();
        },
        handleCurrentChange(val) {
          //当前页
          this.pageno = val;
          this.getData();
        }
      },
      created() {
        this.getData();
      },
      components:{
      }
    }
</script>

<style scoped>

</style>
