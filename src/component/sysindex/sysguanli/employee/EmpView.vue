<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empPassword"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="empPhone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="empMoney"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="empImg"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.empImg" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column
        prop="empAddress"
        label="状态">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
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


  </div>
</template>

<script>
    export default {
        name: "EmpView",
      data(){
        return {
          tableData:[],
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1,   //查询到的总记录数量
          editmodalVisible:false,  //编辑页面 显示标志
          editform:{},   //编辑页面数据 对象
          path:"http://127.0.0.1:9090/RetailersBackSystem/"
        }
      },
      methods:{
        getdata(){   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);

          this.$axios.post("queryallsysemp.action",params)
            .then(response=>{
              console.log(response)
              this.tableData = response.data.rows;//获取所有要展示的数据
              this.total = response.data.total; //总记录数量
              console.log(response);
              this.tableData.forEach( (item)=> {
                item.empImg = this.path+item.empImg;
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
        }
      },
      created(){
          this.getdata()
      }
    }
</script>

<style scoped>

</style>
