<template>
  <div>
    菜单名字：<el-input type="text" v-model="menus" style="width: 50%"></el-input>
    <el-button type="danger"  @click="querysysmenuslike">查询</el-button>
    <el-button type="success" @click="openeditwinsysmenus()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="父编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parentId"
        label="子编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="菜单地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="iconUrl"
        label="图标地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini" type="success"
            @click="openeditwinupdatasymenus(scope.row.id)">编辑</el-button>

          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeletesysmenus(scope.row.id)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加角色-->
    <el-dialog
      title="添加菜单"
      :visible.sync="editdialogVisiblesysmenus"
      width="30%">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="addsysmenus" is="AddSysMenus"></component>

      <el-button type="primary" @click="editgoodsysmenus">确 定</el-button>
      <el-button @click="editdialogVisiblesysmenus = false">取 消</el-button>
    </el-dialog>

    <!--修改角色-->
    <el-dialog
      title="编辑角色"
      :visible.sync="updatadialogVisiblemenus"
      width="30%">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="updatamenus" is="UpDataMenus"></component>
      <el-button type="primary" @click="updatatgoodmenus">确 定</el-button>
      <el-button @click="updatadialogVisiblemenus = false">取 消</el-button>

    </el-dialog>


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
  import AddSysMenus from "./AddSysMenus";
  import UpDataMenus from "./UpDataMenus";
    export default {
        name: "SysMenus",
      data(){
        return {
          menus:'',
          updatadialogVisiblemenus : false,
          formLabelWidth:'100px',
          tableData:[],
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1,   //查询到的总记录数量
        /*  editmodalVisible:false,  //编辑页面 显示标志*/
          /* editmodalVisible02:false,*/
          editformsysmenus:{},   //编辑页面数据 对象
          /*/!* addform: {}, //添加页面保存的数据，提交用*!/*/
         addformmenus:{
           parentId:"",name:"",linkUrl:"",iconUrl:"",status:""
          },//添加页面数据对象
          path:"http://127.0.0.1:9090/RetailersBackSystem/",
          editdialogVisiblesysmenus:false
        }
      },
      methods: {
        getdata() {   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("name",this.menus)
         /* params.append("roleName",this.role)*/
          this.$axios.get("querysysmenus.action", {params:params})
            .then(response => {
              this.tableData = response.data.rows;//获取所有要展示的数据
              this.total = response.data.total; //总记录数量
            }).catch();
        },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          /*alert(1111);*/
          console.log(`每页 ${val} 条`);
          this.pagesize = val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          /*alert(2222222);*/
          console.log(`当前页: ${val}`);
          this.pageno = val;
          this.getdata()
        },

        /*添加角色*/
        openeditwinsysmenus(){
          this.editdialogVisiblesysmenus=true;
        },
        editgoodsysmenus(){
          this.$refs.addsysmenus.submitUploadsysmenusadd();
          this.$refs.addsysmenus.fileList=[];
          //关闭模态框
          this.editdialogVisiblesysmenus=false;
        },

        /*编辑角色*/
        openeditwinupdatasymenus(id){
         /* alert(id)*/
          this.updatadialogVisiblemenus=true;
          this.$nextTick(item=>{
            this.$refs.updatamenus.getdataByide(id);
          })
        },
        updatatgoodmenus(){
          this.$refs.updatamenus.submitUpdataloadsysmenusupdata();
          this.$refs.updatamenus.fileList=[];
          this.updatadialogVisiblemenus=false;
        },

        /*删除角色*/
        handleDeletesysmenus(id){
          this.$axios.post("deletesysmenus.action/"+id).then(response=>{
            //刷新
            this.getdata();
          }).catch();


        },
        /*/!*查询*!/*/
        querysysmenuslike(){
          alert(this.menus)
         /* alert(11111111)*/
        /*  alert(this.menus)*/
          this.menus=this.menus;
          this.getdata();
        }

      },
      components:{
        AddSysMenus,UpDataMenus
      },

      created() {
        this.getdata()
      }
    }
</script>

<style scoped>

</style>
