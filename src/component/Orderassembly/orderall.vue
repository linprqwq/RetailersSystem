<template>

<div>
  <div>
    <!--  <div>-->
    <!--    <el-tabs v-model="activeName" @tab-click="queryorderdfk">-->
    <!--      <el-tab-pane label="全部订单" ></el-tab-pane>-->
    <!--      <el-tab-pane label="待付款订单" name="2"></el-tab-pane>-->
    <!--      <el-tab-pane label="待收货订单" name="4"></el-tab-pane>-->
    <!--      <el-tab-pane label="已提货订单" name="5"></el-tab-pane>-->
    <!--      <el-tab-pane label="已取消订单" name="1"></el-tab-pane>-->
    <!--    </el-tabs>-->

    <!--    <el-table-->
    <!--      :data="list"-->
    <!--      border-->
    <!--      style="width: 100%;height: 100%"  >-->
    <!--      <el-table-column-->
    <!--        prop="orderid"-->
    <!--        label="订单编号"-->
    <!--        width="180">-->
    <!--      </el-table-column>-->

    <!--      <el-table-column label="商品信息">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-table border :data='scope.row.ordderdetails' :span-method="objectspanmethod">-->
    <!--            <el-table-column label="头像" style="height: 50px;width: 50px;">-->
    <!--              <template slot-scope="scope" style="height: 50px;width: 50px;">-->
    <!--                <img :src="'/src/'+scope.row.proimage" style="height: 50px;width: 50px;">-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column prop='proname' label="订单商品"></el-table-column>-->
    <!--            <el-table-column prop='quantity' label="数量"></el-table-column>-->
    <!--            <el-table-column v-if="scope.row.status==1" label="操作">-->
    <!--              <template  slot-scope="scope1">-->
    <!--                <el-button-->
    <!--                  size="mini"-->
    <!--                  type="danger"-->
    <!--                  @click="addspingcart(scope1.$index, scope1.row.proid)" v-if="scope.row.status==1">加入购物车</el-button>-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column v-if="scope.row.status==5" label="操作">-->
    <!--              <template slot-scope="scope3" >-->
    <!--                <el-button-->
    <!--                  size="mini"-->
    <!--                  type="danger"-->
    <!--                  @click="sqtuikuan(scope3.$index, scope3.row)" v-if="scope3.row.refund==0">申请退货</el-button>-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column v-if="scope.row.status==5&&scope.row.ordderdetails.length>1">-->
    <!--              <template  slot-scope="scope2">-->
    <!--                <el-button-->
    <!--                  size="mini"-->
    <!--                  type="danger"-->
    <!--                  @click="pingjia(scope2.$index, scope2.row)" v-if="scope2.row.evaluatea==2">待评价</el-button>-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--          </el-table>-->

    <!--        </template>-->
    <!--      </el-table-column>-->

    <!--      <el-table-column-->
    <!--        prop="zprice"-->
    <!--        label="总价"-->
    <!--      >-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="操作">-->
    <!--        <template slot-scope="scope5">-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            @click="qxddorder(scope5.$index, scope5.row,true)" v-if="scope5.row.status==2">取消订单</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            @click="qxddorder(scope5.$index, scope5.row,false)" v-if="scope5.row.status==3">取消订单</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="danger"-->
    <!--            @click="confirmorder(scope5.$index, scope5.row)" v-if="scope5.row.status==4">确认收货</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="danger"-->
    <!--            @click="fk(scope5.$index, scope5.row)" v-if="scope5.row.status==2">付款</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="danger"-->
    <!--            @click="pingjia(scope5.$index, scope5.row)" v-if="scope5.row.ordderdetails.length<=1&&scope5.row.ordderdetails.evaluatea==2">待评价</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="danger"-->
    <!--            @click="deleteorderbyid(scope5.$index, scope5.row)" v-if="scope5.row.status==1">删除订单</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="danger"-->
    <!--            @click="addgwc(scope5.$index, scope5.row)" v-if="scope5.row.status==5">加入购物车</el-button>-->

    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->
    <!--    <el-pagination-->
    <!--      @size-change="handleSizeChange"-->
    <!--      @current-change="handleCurrentChange"-->
    <!--      :current-page="pageno"-->
    <!--      :page-sizes="[5, 10, 15, 20]"-->
    <!--      :page-size="pagesize"-->
    <!--      layout="total, sizes, prev, pager, next, jumper"-->
    <!--      :total="total">-->
    <!--    </el-pagination>-->

    <!--    &lt;!&ndash;  退货页面&ndash;&gt;-->
    <!--    <el-dialog-->
    <!--      title="退货申请表"-->
    <!--      :visible.sync="editdialogVisible"-->
    <!--      width="30%"-->
    <!--      :before-close="handleClose">-->
    <!--      &lt;!&ndash; 动态组件   指定添加vue页面在模态框显示&ndash;&gt;-->
    <!--      <component ref="eds" is="returngoods"></component>-->

    <!--      <el-button type="primary" @click="qdreturngoods">确 定</el-button>-->
    <!--      <el-button @click="editdialogVisible = false">取 消</el-button>-->

    <!--    </el-dialog>-->
    <!--    &lt;!&ndash;  评价页面&ndash;&gt;-->
    <!--    <el-dialog-->
    <!--      title="评价商品"-->
    <!--      :visible.sync="editdialogVisible1"-->
    <!--      width="30%"-->
    <!--      :before-close="handleClose">-->
    <!--      &lt;!&ndash; 动态组件   指定添加vue页面在模态框显示&ndash;&gt;-->
    <!--      <component ref="eds" is="Pj"></component>-->

    <!--      <el-button type="primary" @click="pjtijiao">确 定</el-button>-->
    <!--      <el-button @click="editdialogVisible1 = false">取 消</el-button>-->

    <!--    </el-dialog>-->
    <!--  </div>-->

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
          <el-tab-pane label="全部订单" ></el-tab-pane>
          <el-tab-pane label="待付款订单" name="2"></el-tab-pane>
          <el-tab-pane label="待收货订单" name="4"></el-tab-pane>
          <el-tab-pane label="已提货订单" name="5"></el-tab-pane>
          <el-tab-pane label="已取消订单" name="1"></el-tab-pane>
        </el-tabs>
    <div v-for=" o in list">
      <el-table border :data="o.ordderdetails" :span-method="objectspanmethod">
        <el-table-column width="250">
          <template slot="header">
            订单号:{{o.orderid}}
          </template>
          <template slot-scope="scope">
            <img :src="'/src/'+scope.row.proimage"
                 width="80px" height="100px" alt="err">
          </template>
        </el-table-column>
        <el-table-column label="商品" prop="proname"></el-table-column>
        <el-table-column label="单价(元)" prop="prosprice"></el-table-column>
        <el-table-column label="数量" prop="quantity"></el-table-column>
        <el-table-column label="商品操作">
<!--          <template slot-scope="scope">-->
<!--            <el-button v-if="scope.row.isReturn==0 &&o.orderState=='o-6'" @click="openWindow(scope.row.id)" round>退货</el-button>-->
<!--            <el-tag type="warning" v-if="o.orderState=='o-1'">等待付款</el-tag>-->
<!--            <el-tag v-if="scope.row.isReturn==1">待商家确认退货</el-tag>-->
<!--            <el-tag type="success" v-if="scope.row.isReturn==2">待退款</el-tag>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column label="实付款">
          {{o.payment}}元
        </el-table-column>
        <el-table-column label="交易状态">
          <template>
            <el-tag type="warning" v-if="o.status=='2'">待付款</el-tag>
            <el-tag type="success" v-if="o.status=='4'">待提货</el-tag>
            <el-tag type="success" v-if="o.status=='5'">已提货</el-tag>
            <el-tag type="success" v-if="o.status=='1'">已取消</el-tag>
            <el-tag type="success" v-if="o.status=='3'">已付款</el-tag>
<!--            <el-tag type="success" v-if="o.status=='6'">已付款</el-tag>-->
<!--            <el-tag type="success" v-if="o.status=='7'">交易关闭</el-tag>-->
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <div v-if="o.status=='2'">
              <el-button size="mini" type="primary" @click="fk(o.orderid,2)">立即付款</el-button>
              <br>
              <el-button size="mini" @click="qxddorder(o.orderid,2,true)">取消订单</el-button>
            </div>
            <div>
              <el-button type="mini" v-if="o.status=='5'" @click="pay(o.orderid,'5')">确认收货</el-button>
              <br>
              <el-button size="mini" type="danger" v-if="o.status=='3' "
                         @click="qxddorder(o.orderid,5,false)">删除订单
              </el-button>

            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    <el-row class="mytop" v-if="orders.length>0">-->
<!--&lt;!&ndash;      <el-col :span="4">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-pagination&ndash;&gt;-->
<!--&lt;!&ndash;          @size-change="handleSizeChange"&ndash;&gt;-->
<!--&lt;!&ndash;          @current-change="handleCurrentChange"&ndash;&gt;-->
<!--&lt;!&ndash;          :current-page="pageno"&ndash;&gt;-->
<!--&lt;!&ndash;          :page-sizes="[5, 10, 15, 20]"&ndash;&gt;-->
<!--&lt;!&ndash;          :page-size="pagesize"&ndash;&gt;-->
<!--&lt;!&ndash;          layout="total, sizes, prev, pager, next, jumper"&ndash;&gt;-->
<!--&lt;!&ndash;          :total="total"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;        </el-pagination>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--    </el-row>-->
<!--    <div>-->
<!--      <el-dialog-->
<!--        :show-close="false"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="25%">-->
<!--        <pay-money2 ref="payMoney2"></pay-money2>-->
<!--      </el-dialog>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-dialog-->
<!--        :visible.sync="dialogVisible2"-->
<!--        :before-close="handleClose"-->
<!--        width="50%">-->
<!--        <add-return-shop ref="addReturnShop"></add-return-shop>-->
<!--      </el-dialog>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-dialog-->
<!--        :visible.sync="dialogVisible3"-->
<!--        :before-close="handleClose3"-->
<!--        width="50%">-->
<!--        <evaluate-view ref="evaluateView"></evaluate-view>-->
<!--      </el-dialog>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-empty v-if="orders.length==0" description="暂无数据"></el-empty>-->
<!--    </div>-->
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
  data(){
    return{
      activeName: '',
      useridd:sessionStorage.getItem('id'),
      list:[],
      search: '',
      pageno:1,   //页码
      pagesize:5,   //页size
      total:1,   //查询到的总记录数量
      gwcall:[],
      rowspan: 0,
      //退货
      editdialogVisible:false,
      //评价
      editdialogVisible1:false,
    }
  },
  components:{
    returngoods,
    Pj,
  },

  method:{

  },
  methods: {
    objectspanmethod({row, column, rowIndex, columnIndex}){
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
    },
    //根据当前登录id查询订单
    queryorderdfk(){
      var params = new URLSearchParams();
      params.append("pageno",this.pageno);
      params.append("pagesize",this.pagesize);
      params.append("uid",this.useridd);
      params.append("status",this.activeName);

      this.$axios.post("queryuserorder.action",params).then(res=>{
        this.total = res.data.total; //总记录数量
        this.list = res.data.records;
        console.log(this.list)

      }).catch()
    },
    //付款
    fk(a,b){
        var params = new URLSearchParams();

        params.append("orderid",b.orderid);
        params.append("uid",b.uid);
        this.$axios.post("fkorder.action",params).then(res=>{

          if (res.data.code==0){
            this.$message.error(res.data.msg);
            this.$emit("event-name")
          }else{
            this.$message.success(res.data.msg);
          }
          this.queryorderdfk();
        }).catch();
    },
    //分页控件
    handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
      this.pagesize= val;
      this.queryorderdfk()
    },
    //页码发生改变
    handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
      this.pageno=val;
      this.queryorderdfk()

    },
    //删除当前订单
    deleteorderbyid(index,row){
      console.log(row);
      var orderallparams  = new URLSearchParams();

      orderallparams.append("orderid",row.orderid)

      this.$axios.post("delorder.action",orderallparams).then(res=>{
        this.$message.success(res.data.msg);
          this.queryorderdfk();
      }).catch();
    },

    //多个购物车添加
    addgwc(a,b){
    b.ordderdetails.forEach(item=>{
      this.gwcall.push(item.proid)
    })
      var  params = new URLSearchParams();

      params.append("arr",this.gwcall);
      params.append("uid",b.uid);
      this.$axios.post("addgwc.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //单个购物车添加
    addspingcart(a,b){
      console.log(b);
      var params = new URLSearchParams();
      // 加入购物车  商品id 用户id 商品数量默认为1   如果购物车已有 购物车商品数量加1
      params.append("uid",this.useridd)
      params.append("cid",b)

      this.$axios.post("addspingcart.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch();
    },
    //确认收货
    confirmorder(a,b){
      console.log(b)
      var params = new URLSearchParams();
      params.append("orderid",b.orderid);

      this.$axios.post("cofirmorder.action",params).then(res=>{
        this.$message.success(res.data.msg);
        this.queryorderdfk();
      }).catch()
    },
    //取消订单
    qxddorder(a,b,boolea){

        var params = new URLSearchParams();
        params.append("orderid",b.orderid);
        params.append("status",1);
      params.append("boolea",boolea);
        this.$axios.post("qxddorder,action",params).then(res=>{
          this.$message.success(res.data.msg);
          this.queryorderdfk();
        }).catch()
      },
    //打开退货窗口
    sqtuikuan(a,b){
      var id;
      this.editdialogVisible=true;
      console.log(b.ordderdetails);
      b.ordderdetails.forEach(item=>{
        id = item.id;
      })
      //根据id查询数据
      this.$nextTick(item=>{
        this.$refs.eds.getdata(b.orderid,id);
      })

    },
    //评价
    pingjia(a,b){
      this.editdialogVisible1=true;
      console.log(b)
      this.$nextTick(item=>{
        this.$refs.eds.getdata(b);
      })

    },
    //评价提交
    pjtijiao(){

        this.editdialogVisible = false;
        this.editdialogVisible1=false;
        this.$refs.eds.pjtijiao();

    },
    //窗口关闭确认
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editdialogVisible = false
          this.editdialogVisible1=false;
          this.$refs.eds.fileList=[];

        })
        .catch(_ => {});
    },
    //退货提交
    qdreturngoods(){
      this.editdialogVisible = false;
      this.editdialogVisible1=false;
      this.$refs.eds.submitUpload();
    },
    },

  mounted(){
    this.queryorderdfk();
  }

}
</script>

<style scoped>

</style>
