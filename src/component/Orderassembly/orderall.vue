<template>

  <div>
    <div>

      <!--  退货页面-->
      <el-dialog
        title="退货申请表"
        :visible.sync="thVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 动态组件   指定添加vue页面在模态框显示-->
        <component ref="thref" is="returngoods" v-bind:thVisible="thVisible" v-on:success="success(res)"></component>
        <el-button type="primary" @click="qdreturngoods('thref')">确 定</el-button>
        <el-button @click="thVisible = false">取 消</el-button>
      </el-dialog>
      <!--  评价页面-->
      <el-dialog
        title="评价商品"
        :visible.sync="pjVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 动态组件   指定添加vue页面在模态框显示-->
        <component ref="pjref" is="Pj" v-on:success="success(res)"></component>

        <el-button type="primary" @click="pjtijiao('pjref')">确 定</el-button>
        <el-button @click="pjVisible = false">取 消</el-button>

      </el-dialog>


    </div>
    <div>
      <el-row align="middle" class="mytop" v-if="list.length>0">
        <el-col :span="4">
          <el-input v-model="list.orderid" placeholder="请输入订单号">
            <el-button slot="append" @click="queryorderdfk" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="queryorderdfk">
        <el-tab-pane label="全部订单"></el-tab-pane>
        <el-tab-pane label="待付款订单" name="2"></el-tab-pane>
        <el-tab-pane label="待收货订单" name="4"></el-tab-pane>
        <el-tab-pane label="已提货订单" name="5"></el-tab-pane>
        <el-tab-pane label="已取消订单" name="1"></el-tab-pane>
      </el-tabs>
      <div v-for=" o in list">
        <el-table border :data="o.ordderdetails" :span-method="objectspanmethod">
          <el-table-column width="250">
            <template slot="header">
              订单号:{{ o.orderid }}
            </template>
            <template slot-scope="scope">
              <img :src="'/src/'+scope.row.proimage"
                   width="80px" height="100px" alt="err" @click="dianji(scope.row.proid)">
            </template>
          </el-table-column>
          <el-table-column label="商品" prop="proname"></el-table-column>
          <el-table-column label="单价(元)" prop="prosprice"></el-table-column>
          <el-table-column label="数量" prop="quantity"></el-table-column>
          <el-table-column label="商品操作">

            <!--          </template>-->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="sqtuikuan(o, scope.row)" v-if="scope.row.refund==0&&o.status==5">申请退货
              </el-button>
              &nbsp;&nbsp;&nbsp;
              <el-button
                size="mini"
                type="danger"
                @click="pingjia(scope.$index, scope.row)" v-if="scope.row.evaluatea==2&&o.status==5">待评价
              </el-button>
              <br><br>
              <el-button
                size="mini"
                type="danger"
                @click="addgwc(scope.$index, scope.row)" v-if="o.status==5 || o.status==1">加入购物车
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="实付款">
            {{ o.payment }}元
          </el-table-column>
          <el-table-column label="交易状态">
            <template>
              <el-tag type="warning" v-if="o.status=='2'">待付款</el-tag>
              <el-tag type="success" v-if="o.status=='4'">待提货</el-tag>
              <el-tag type="success" v-if="o.status=='5'">已提货</el-tag>
              <el-tag type="success" v-if="o.status=='1'">已取消</el-tag>
              <el-tag type="success" v-if="o.status=='3'">已付款</el-tag>

            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope2">
              <div>
                <el-button size="mini" type="primary" v-if="o.status=='2'" @click="fk(scope2.$index, scope2.row)">立即付款
                </el-button>
                <br>
                <el-button size="mini" v-if="o.status=='3'" @click="qxddorder(o.orderid,false)">取消订单</el-button>
                <br>
                <el-button size="mini" v-if="o.status=='2'" @click="qxddorder(o.orderid,true)">取消订单</el-button>
              </div>
              <div>
                <el-button type="mini" v-if="o.status=='4'" @click="confirmorder(scope2.$index, scope2.row)">确认收货
                </el-button>
                <br>
                <el-button size="mini" type="danger" v-if="o.status=='5'|| o.status=='1' "
                           @click="deleteorderbyid(o.orderid)">删除订单
                </el-button>

              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
  </div>
</template>

<script>
import Pj from "../Cart/Pj";
import returngoods from "../Commodity/returngoods";

export default {
  name: "orderall",
  data() {
    return {
      activeName: '',
      useridd: sessionStorage.getItem('id'),
      list: [],
      search: '',
      pageno: 1,   //页码
      pagesize: 5,   //页size
      total: 1,   //查询到的总记录数量
      gwcall: [],
      rowspan: 0,
      //退货
      thVisible: false,
      //评价
      pjVisible: false,
      res: false,
    }
  },
  components: {
    returngoods,
    Pj,
  },

  method: {},
  methods: {
    //接受子组件的事件调用
    success(res) {
      this.thVisible = res;
      this.pjVisible = res;
      this.queryorderdfk();
    },
    objectspanmethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 5) {
        if (rowIndex === 0) {
          let o1 = this.list.find(item => item.orderid == row.orderid);
          return {
            rowspan: o1.ordderdetails.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 6) {
        if (rowIndex === 0) {
          let o1 = this.list.find(item => item.orderid == row.orderid);
          return {
            rowspan: o1.ordderdetails.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 7) {
        if (rowIndex === 0) {
          let o1 = this.list.find(item => item.orderid == row.orderid);
          return {
            rowspan: o1.ordderdetails.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //根据当前登录id查询订单
    queryorderdfk() {
      var params = new URLSearchParams();
      params.append("pageno", this.pageno);
      params.append("pagesize", this.pagesize);
      params.append("uid", this.useridd);
      params.append("status", this.activeName);
      this.pjVisible = false;
      this.thVisible = false;

      this.$axios.post("queryuserorder.action", params).then(res => {
        this.total = res.data.total; //总记录数量
        this.list = res.data.records;
        console.log(this.list)

      }).catch()
    },
    //付款
    fk(a, b) {
      var params = new URLSearchParams();

      params.append("orderid", b.orderid);
      params.append("uid", b.uid);
      this.$axios.post("fkorder.action", params).then(res => {

        if (res.data.code == 0) {
          this.$message.error(res.data.msg);
          this.$emit("event-name")
        } else {
          this.$message.success(res.data.msg);
        }
        this.queryorderdfk();
      }).catch();
    },
    //分页控件
    handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
      this.pagesize = val;
      this.queryorderdfk()
    },
    //页码发生改变
    handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
      this.pageno = val;
      this.queryorderdfk()

    },
    //删除当前订单
    deleteorderbyid(orderid) {
      console.log(orderid);
      var orderallparams = new URLSearchParams();

      orderallparams.append("orderid", orderid)

      this.$axios.post("delorder.action", orderallparams).then(res => {
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },

    //多个购物车添加
    addgwc(a, b) {
      this.gwcall.push(b.proid)
      var params = new URLSearchParams();

      params.append("arr", this.gwcall);
      params.append("uid", this.useridd);
      this.$axios.post("addgwc.action", params).then(res => {
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //单个购物车添加
    addspingcart(a, b) {
      console.log(b);
      var params = new URLSearchParams();
      // 加入购物车  商品id 用户id 商品数量默认为1   如果购物车已有 购物车商品数量加1
      params.append("uid", this.useridd)
      params.append("cid", b)

      this.$axios.post("addspingcart.action", params).then(res => {
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //确认收货
    confirmorder(a, b) {
      console.log(b)
      var params = new URLSearchParams();
      params.append("orderid", b.orderid);

      this.$axios.post("cofirmorder.action", params).then(res => {
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch()
    },
    //取消订单
    qxddorder(a, boolea) {

      var params = new URLSearchParams();
      params.append("orderid", a);
      params.append("status", 1);
      params.append("boolea", boolea);
      this.$axios.post("qxddorder,action", params).then(res => {
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch()
    },
    //打开退货窗口
    sqtuikuan(a, b) {

      this.thVisible = true;

      //根据id查询数据
      this.$nextTick(item => {
        this.$refs.thref.thgetdata(a.orderid, b.id);
      })

    },
    //评价
    pingjia(a, b) {
      this.pjVisible = true;
      console.log(b)
      this.$nextTick(item => {
        this.$refs.pjref.pjgetdata(b);
      })

    },
    //评价提交
    pjtijiao(pjName) {
      this.$refs.pjref.pjtijiao(pjName);
      this.$router.go(0);
    },
    //窗口关闭确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.thVisible = false
          this.pjVisible = false;
          this.$refs.pjref.fileList = [];

        })
        .catch(_ => {
        });
    },
    //退货提交
    qdreturngoods(formName) {
      this.$refs.thref.thtj(formName);
      this.$router.go(0);
    },
    dianji(id) {
      this.$router.push({
        path: '/CommodityDisplay',
        query: {
          comid: id
        }
      })
    },
  },

  mounted() {
    this.queryorderdfk();
  }

}
</script>

<style scoped>

</style>
