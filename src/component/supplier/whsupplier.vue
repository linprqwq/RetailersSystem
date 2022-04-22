<template>
  <!--供应商品表-->
  <div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        :data="supply" style="width: 100%">>
        <el-table-column prop="id" label="序号" width="120"></el-table-column>
        <el-table-column prop="commodity.proname" label="商品名称"></el-table-column>
        <el-table-column prop="shopTypeInfo.name" label="商品类型"></el-table-column>
        <el-table-column prop="supplierPrice" label="供应价格"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="warning"
              round
              @click="update(scope.row.id)"
            >修改
            </el-button>
            <el-button  type="primary" size="mini" v-if="scope.row.isDelete==1" @click="gy(scope.row.id,0)">恢复供应</el-button>
            <el-button type="success" size="mini" v-if="scope.row.isDelete==0" @click="gy(scope.row.id,1)">取消供应</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>


    <div>
      <component ref="editwhsupplie" is="editwhsupplier"></component>
    </div>

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

  import editwhsupplier from "./editwhsupplier";

  export default {
    name: "whsupplier",
    data() {
      return {
        loading: true,
        pageno: 1,
        pagesize: 5,
        total: 1,
        supply: [],
      }
    },
    methods: {
      getData() {
        var obj = {
          pId: sessionStorage.getItem("id"),
          pageno: this.pageno,
          pagesize: this.pagesize,
          isCheck: 1
        }
        //去查询供应商维护表里面的数据
        this.$axios.get("goodsSupplied/queryALlPage.action",
          {params: obj}).then(res => {
          this.supply = res.data.records;
          pageno:this.pageno;
          pagesize:this.pagesize;
          this.loading = false;
        }).catch(error => {
          this.$message.error(error);
        })
      },
      update(id) {
        this.$refs.editwhsupplie.editVisible = true;

        this.$nextTick(item => {
          this.$refs.editwhsupplie.supply.id = id;
          this.$refs.editwhsupplie.getData();
        })

      },
      gy(id,state){
        console.log(state)
        let supplierSupplyOfGoods={
          id:id,
          isDelete:state
        }
        this.$axios.put("goodsSupplied/updatadelte.action",supplierSupplyOfGoods).
        then(res=>{
          if (res.data.x==true){
            this.$message.success(res.data.msg);
            this.value=false;
          }else {
            this.$message.success(res.data.msg);
            this.value=true;
          }
          this.getData();
        }).catch(error=>{
          this.$message.success(error);
        })

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
    components: {
      editwhsupplier
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
