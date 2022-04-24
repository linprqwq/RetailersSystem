<template>
  <div>

    <el-input v-model="ckmName" placeholder="请输入您要查询的仓库名" style="width: 200px;"></el-input>
    <el-button type="primary" @click="queryallck()">查询</el-button>
    <br><br>
    <el-button type="primary" @click="addwarehouse()" style="position: relative;left: -500px">添加仓库</el-button>

    <el-button icon="el-icon-refresh-left" circle @click="queryallck"
               style="position: relative;left: 600px"></el-button>
    <el-table
      :data="ckall"
      style="width: 100%">
      <el-table-column
        label="仓库名"
        prop="warName">
      </el-table-column>
      <el-table-column
        label="仓库最大库存"
        prop="warMaxStock">
      </el-table-column>

      <el-table-column label="仓库分类" width="180">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.shoptypename }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看分类详情</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updatewarehoures(scope.$index, scope.row)">修改仓库
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="querywarexqbyid(scope.$index, scope.row)">查看仓库详情
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--  添加页面-->
    <el-dialog
      title="新增仓库"
      :visible.sync="AddCk"
      width="30%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="awhref" is="AddWareHouse" v-on:success="qx(1)"></component>
      <el-button type="primary" @click="AddWHouse('awhref')">确 定</el-button>
      <el-button @click="qx(1)">取 消</el-button>
    </el-dialog>
    <!--  修改页面-->
    <el-dialog
      title="修改仓库"
      :visible.sync="UpdateCk"
      width="30%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="updateckref" is="UpdateCk" v-on:success="qx(2)"></component>
      <el-button type="primary" @click="UpdateWareHouse('updateckref')">确 定</el-button>
      <el-button @click="qx(2)">取 消</el-button>

    </el-dialog>
    <!--  仓库详情页面-->
    <el-dialog
      title="仓库详情"
      :visible.sync="CkDetails"
      width="90%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="ckdetailsref" is="CkDetails" v-on:success="qx(3)"></component>
      <el-button type="primary" @click="UpdateWareHouse('ckdetailsref')">确 定</el-button>
      <el-button @click="qx(3)">取 消</el-button>

    </el-dialog>
  </div>
</template>

<script>
import AddWareHouse from "./AddWareHouse";
import UpdateCk from "./UpdateCk";
import CkDetails from "./CkDetails";

export default {
  name: "CkView",
  data() {
    return {
      ckall: [],
      pageno: 1,   //页码
      pagesize: 5,   //页size
      total: 1,   //查询到的总记录数量
      search: '',
      ckmName: '',
      AddCk: false,
      UpdateCk: false,
      CkDetails:false,
    }
  },
  components: {
    AddWareHouse,
    UpdateCk,
    CkDetails,
  },
  methods: {
    //查询仓库
    queryallck() {
      var params = new URLSearchParams();
      params.append("pageno", this.pageno);
      params.append("pagesize", this.pagesize);
      //仓库名
      params.append("warName", this.ckmName);
      params.append("isCheck", 1);

      this.$axios.post("queryallck.action", params).then(res => {
        this.total = res.data.total; //总记录数量
        this.ckall = res.data.records;

      }).catch();
    },
    //分页控件
    handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
      this.pagesize = val;
      this.queryallck();
    },
    //页码发生改变
    handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
      this.pageno = val;
      this.queryallck();

    },
    //修改仓库
    updatewarehoures(index, wh) {
      //模态框展示
      this.UpdateCk = true;
      this.$nextTick(item => {
        this.$refs.updateckref.warehousemtkzs(wh);
      })

    },
    //查看商品详情
    querywarexqbyid(index,row) {
      //模态框展示
      this.CkDetails = true;
      this.$nextTick(item => {
        this.$refs.ckdetailsref.querywaredetails(row);
      })
    },
    //打开添加模态框
    addwarehouse() {
      this.AddCk = true;
    },
    //窗口关闭确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {

          this.CkDetails= false;
          this.$refs.ckdetailsref.ckdetails = [];

          this.AddCk = false;
          this.$refs.awhref.AddWhouse = {};
          this.$refs.awhref.fl = [];
          this.UpdateCk = false;

          this.$refs.updateckref.value = [];
          this.$refs.updateckref.mtkwarehouse = {};

        })
        .catch(_ => {});
    },
    //添加仓库
    AddWHouse(formName) {
      this.$refs.awhref.addcka(formName);
    },
    //修改仓库
    UpdateWareHouse(formName) {
      this.$refs.updateckref.UpdateWareHouse(formName);
    },
    //取消模态框
    qx(boole) {
      if (boole==1) {
        this.AddCk = false;
        this.$refs.awhref.AddWhouse = {};
        this.$refs.awhref.fl = [];
        this.queryallck();
      } else if(boole==2) {
        this.UpdateCk = false;
        this.$refs.updateckref.value = [];
        this.$refs.updateckref.mtkwarehouse = {};
        this.queryallck();
      }else if (boole==3){
        this.CkDetails =false;
        this.$refs.ckdetailsref.ckdetails = [];
      }
    }
  },

  created() {
    this.queryallck();
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
