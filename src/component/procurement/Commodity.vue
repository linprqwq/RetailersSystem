<template>
     <div>
         <el-table
           :data="commoData"
           tooltip-effect="dark"
           @selection-change="handleSelectionChange"
           style="width: 100%">
           <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column prop="id" label="编号" width="100"></el-table-column>
           <el-table-column prop="proname" label="商品名称" width="100"></el-table-column>
           <el-table-column prop="prodetails" label="商品详情" width="180"></el-table-column>
           <el-table-column prop="prozimg" label="商品图片" width="100">
             <template slot-scope="scope">
               <img :src="scope.row.prozimg" style="width: 40px;height: 40px">
             </template>
           </el-table-column>
           <el-table-column prop="prosprice" label="商品价格" width="180"></el-table-column>
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
     </div>
</template>

<script>
    export default {
        name: "Commodity",
      data(){
          return{
            commoData:[],
            pageno:1,   //页码
            pagesize:5,   //页size
            total:1,
            path:"http://127.0.0.1:9090/RetailersBackSystem/",
            multipleSelection:[],
            cids:[]
          }
      },
      methods:{
        handleSelectionChange(val){
          this.multipleSelection=val;
        },
          getData(){
            var params = new URLSearchParams();
            params.append("pageno",this.pageno);
            params.append("pagesize",this.pagesize);
            this.$axios.post("queryAllCommodity.action",params)
              .then(response=>{
                this.commoData = response.data.records;
                this.total = response.data.total; //获取所有要展示的数据
                this.commoData.forEach((item)=> {
                  item.prozimg = this.path+item.prozimg;
                  console.log(item.prozimg)
                })
              }).catch();
          },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          console.log(`每页 ${val} 条`);
          this.pagesize= val;
          this.getData();
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          console.log(`当前页: ${val}`);
          this.pageno=val;
          this.getData();
        }
      },
      created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
