<template>

  <!--  供应商首页crud-->
  <div>
    <!--模糊查询-->
    <el-form :inline="true" :model="shop" class="demo-form-inline">
      <el-form-item label="商品名">
        <el-input v-model="shop.proname"></el-input>
      </el-form-item>
      <el-button type="danger"  @click="querysp">查询</el-button>
    </el-form>

    <el-table
      :data="shops"
      style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <!--  <el-table-column prop="date" label="商品编号" width="180"></el-table-column>-->
      <el-table-column prop="proname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="prodetails" label="商品详情" width="180"></el-table-column>
      <!--<el-table-column prop="prosprice" label="商品价格" width="180"></el-table-column>-->
      <el-table-column prop="createtime" label="日期" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="opensupplier(scope.row.id)">供应该商品</el-button>
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
    >
    </el-pagination>

<!--  供应商对话框-->
<el-dialog title="供应信息填写" :visible.sync="dialogVisible"
width="35%" center>
<!--弹出对话框组件-->
<component ref="Supplierdialog"  is="Supplierdialog"></component>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false">取消</el-button>
    <el-button type="primary" @click="supply_true()">提交</el-button>
</span>
</el-dialog>

</div>

</template>

<script>
  //导入弹出组件
  import Supplierdialog from "./Supplierdialog";

    export default {
        name: "Supplierindex",
      data(){
          return{
            shop:{
              proname:""
            },
            shop_add_id:"",
            shops:[],
            dialogVisible: false,//供应模态框开关状态
            pageno:1,
            pagesize:5,
            total:1
          }
      },

      methods:{
        getData(){
            let params={
              id:sessionStorage.getItem("id"),
            };
        Object.keys(this.shop).forEach(item=>{
              params[item]=this.shop[item];
        })

        //调用异步 ，根据当前用户,查询供应商目前可以添加到供应商维护商品表里面的商品
        this.$axios.get("goodsSupplied/selelctcomodity.action",
          {params: params}).then((response) => {  //异步调用后成功执行
          //去将查询到的数据放入到数组中去getObject
          this.shops = response.data.records;
        this.total=response.data.total;

        }).catch(function (error) {  //异步调用失败去执行
          alert(error)
        })

      },
      //去打开对话框
        opensupplier(id) {
        /*  alert(id)*/
        console.log(id)
        this.dialogVisible = true;
        this.shop_add_id = id;
        //延迟加载，等待对话框完全加载完成时去执行
          this.$nextTick(()=>{
            this.$refs.Supplierdialog.getObject(id);
          })
        },
        querysp(){
               this.name=name;
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
        },

        //提交
        supply_true(){
        //去调用对话框组件的方法
          this.$refs.Supplierdialog.submit();
          //关闭模态框
          this.dialogVisible=false;
          //重新刷新页面
          this.getData();
        }
      },
    created() {
          this.getData();
        },
      components:{
        Supplierdialog
      }
    }
</script>

<style scoped>

</style>
