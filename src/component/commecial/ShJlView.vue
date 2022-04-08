<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" :offset="9">
        状态：<el-select v-model="opvalue" clearable placeholder="请选择" @change="getdata()">
          <el-option value="0" label="等待审核"></el-option>
          <el-option value="1" label="审核通过"></el-option>
          <el-option value="2" label="审核未通过"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-container>
      <el-main>
        <el-table
          :data="shjlData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="imgpath"
            label="用户头像">
            <template slot-scope="scope">
              <img :src="scope.row.imgpath" style="width: 80px;height: 80px">
            </template>
          </el-table-column>
          <el-table-column
            prop="ustate"
            label="状态" >
            <template slot-scope="scope">
              <span v-if="scope.row.ustate==0">正常</span>
              <span v-else-if="scope.row.ustate==1">冻结</span>
              <span v-else-if="scope.row.ustate==2">注销</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shState"
            label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.shState==0">等待审核</span>
              <span v-else-if="scope.row.shState==1">审核通过</span>
              <span v-else-if="scope.row.shState==2">审核未通过</span>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "ShJlView",
      data(){
        return{
          shjlData: [],
          pageno: 1,   //页码
          pagesize: 5,   //页size
          total: 1,   //编辑页面数据 对象
          path: "http://127.0.0.1:9090/RetailersBackSystem/",
          opvalue:""
        }
      },
      methods:{
        getdata() {   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("shState",this.opvalue);

          this.$axios.post("queryallShJl.action", params)
            .then(response => {
              this.shjlData = response.data.rows;//获取所有要展示的数据
              this.total = response.data.total; //总记
              this.shjlData.forEach((item) => {
                item.imgpath = this.path + item.imgpath;
              })
            }).catch();
        },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          console.log(`每页 ${val} 条`);
          this.pagesize = val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          console.log(`当前页: ${val}`);
          this.pageno = val;
          this.getdata()
        }
      },
      created(){
          this.getdata();
      }
    }
</script>

<style scoped>

</style>
