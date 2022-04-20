<template>
  <!--供应商品表-->
  <div>
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      :data="supply" style="width: 100%">>
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="shop.shopName" label="商品名称"></el-table-column>
      <el-table-column prop="shop.type.name" label="商品类型"></el-table-column>
      <el-table-column prop="supplierPrice" label="供应价格"></el-table-column>

      <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button
        type="warning"
        round
        @click="update(scope.row)"
      >修改
      </el-button>
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

  </div>

</template>

<script>
    export default {
        name: "whsupplier",
      data(){
        return{
          loading: true,
          pageno: 1,
          pagesize: 5,
          total: 1,
          supply:[],
        }
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
