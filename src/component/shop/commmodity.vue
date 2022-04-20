<template>
  <div>
    <el-table :data="shops">
      <el-table-column prop="proname" label="商品名称"></el-table-column>
      <el-table-column prop="prodetails" label="商品描述"></el-table-column>
      <el-table-column prop="shopTypeInfo.name" label="商品类型"></el-table-column>
      <el-table-column prop="prosprice" label="商品价格"></el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.proimage" style="width: 50px;height: 40px">
        </template>
      </el-table-column>

      <el-table-column label="操作" width="350">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="shop.proname"
            size="mini"
            @blur="search"
            placholder="请输入商品名去搜索"/>
        </template>

        <template slot-scope="scope">

          <el-button type="primary" size="mini" v-if="scope.row.status==0"
                     @click="sj(scope.row.id,1)">
            上架
          </el-button>

          <el-button type="primary" size="mini" v-if="scope.row.status==1"
                     @click="sj(scope.row.id,0)">
            下架
          </el-button>

          <el-button type="warning" size="mini" icon="el-icon-edit"
                     @click="editsp(scope.row.id)">
            编辑
          </el-button>

          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="deshop(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div>
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


    <el-dialog title="编辑"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <component ref="editcomm" is="editcommtity"></component>
    </el-dialog>

        <upcommtity ref="upcommtity"></upcommtity>
  </div>
</template>

<script>

  import editcommtity from "./editcommtity";
  import upcommtity from "./upcommtity";

  export default {
    name: "commmodity",
    data() {
      return {
        shops: [],
        shop: {id:"",proname: "", prodetails: "", proimage: "", status: ""},
        pageno: 1,
        pagesize: 5,
        total: 1,
        dialogVisible: false,
        path: "http://localhost:9090/RetailersBackSystem/"
      }
    },
    methods: {
      getmsg(code, msg) {
        if (code > 0) {
          this.$message({
            type: "success",
            message: msg,
          });
          this.getdata();
        } else {
          this.$message({
            type: "error",
            message: msg,
          });
        }
      },
      getdata() {
        //组装数据
        var params = new URLSearchParams();
        params.append("pageno", this.pageno);
        params.append("pagesize", this.pagesize);
        Object.keys(this.shop).forEach(item => {
          params.append(item, this.shop[item]);
        })
        this.$axios.get("/querysp.action", {params: params})
          .then(res => {
            this.shops = res.data.records;
            this.total = res.data.total;
            this.shops.forEach(item => {
              item.proimage = this.path + item.proimage;
            })
          }).catch(err => {
          alert(err)
        })
      },
      search() {  //去根据商品名去搜索
        this.getdata();
      },
      handleSizeChange(val) {
        //每页范围
        this.pagesize = val;
        this.getdata();
      },
      handleCurrentChange(val) {
        //当前页
        this.pageno = val;
        this.getdata();
      },
      //编辑
      editsp(id) {
        this.dialogVisible = true;
        //根据商品id 去查询数据
        this.$nextTick(item => {
          this.$refs.editcomm.getData(id);
        })
      },
      handleClose(done) {
        //模态框关闭
        this.$confirm("确认关闭？").then((_) => {
          this.$refs.editcomm.resetForm();

        }).catch((_) => {

        })
      },
      //删除
      deshop(id) {
        this.$confirm('确认删除该商品吗?', '警告', {
          confirmButtonText: '确定',
          showConfirmButton: '取消',
          type: "warning"
        }).then(() => {
          this.$axios.put("delid.action", {"id": id, "isDelete": 1}).then(res => {
            if (res.data.code > 0) {
              this.$message.success(res.data.msg);
              this.getdata();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(error => {
            this.$message.error(error);   //去添加错误捕获
          })
        }).catch(error => {     //去添加错误捕获

        });
      },
      sj(id,state) {
        //上架
        if (state==1) {
          this.$refs.upcommtity.shop.id=id;
          this.$refs.upcommtity.shop.status = state;
          this.$refs.upcommtity.dialogVisible = true;
        } else {
          //去下架
          var shop = {id: id, status: state}
          this.$axios.put("xgstatus.action", shop).then(res => {
            this.getmsg(res.data.code, res.data.msg);
          }).catch(err => {
            alert(err)
          })
        }

      },
    },
    components: {
      editcommtity, upcommtity
    },
    created() {
      this.getdata();
    }
  }
</script>

<style scoped>

</style>
