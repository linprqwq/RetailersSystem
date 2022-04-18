<template>

  <div>
    角色：<el-input type="text" v-model="role" style="width: 50%"></el-input>
    <el-button type="danger"  @click="querysysrolelike">查询</el-button>
    <el-button type="success" @click="openeditwinsysrole()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
        <!--  <el-button
            size="mini" type="success"
            @click="openeditwinsysrole(scope.row)">添加</el-button>-->

          <el-button
            size="mini" type="success"
            @click="openeditwinupdatasysrole(scope.row.id)">编辑</el-button>

          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeletesysrole(scope.row.id)"
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
      title="添加角色"
      :visible.sync="editdialogVisiblesysrole"
      width="30%">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="emdsysrole" is="EmdSysRole"></component>

      <el-button type="primary" @click="editgoodsysrole">确 定</el-button>
      <el-button @click="editdialogVisiblesysrole = false">取 消</el-button>
    </el-dialog>

    <!--修改角色-->
    <el-dialog
      title="编辑角色"
      :visible.sync="updatadialogVisible"
      width="30%">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="updatasysrole" is="UpDataSysRole"></component>

      <el-button type="primary" @click="updatatgood">确 定</el-button>
      <el-button @click="updatadialogVisible = false">取 消</el-button>

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
  import EmdSysRole from "./EmdSysRole";
  import UpDataSysRole from "./UpDataSysRole";
    export default {
        name: "SysRole",
      data(){
        return {
          role:'',
          updatadialogVisible : false,
          formLabelWidth:'100px',
          tableData:[],
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1,   //查询到的总记录数量
          editmodalVisible:false,  //编辑页面 显示标志
         /* editmodalVisible02:false,*/
          editformsysrle:{},   //编辑页面数据 对象
          /*/!* addform: {}, //添加页面保存的数据，提交用*!/*/
          addform:{
            roleName:"",remark:""
          },//添加页面数据对象
          path:"http://127.0.0.1:9090/RetailersBackSystem/",
          editdialogVisiblesysrole:false
        }
      },
      methods: {
        getdata() {   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("roleName",this.role)


          this.$axios.get("/querysysrole.action", {params:params})
            .then(response => {
              this.tableData = response.data.rows;//获取所有要展示的数据
              this.total = response.data.total; //总记录数量
            }).catch();
        },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          alert(1111);
          console.log(`每页 ${val} 条`);
          this.pagesize = val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          alert(2222222);
          console.log(`当前页: ${val}`);
          this.pageno = val;
          this.getdata()
        },

       /*添加角色*/
        openeditwinsysrole(){
          this.editdialogVisiblesysrole=true;

        },
        editgoodsysrole(){
          this.$refs.emdsysrole.submitUploadsysrole();
          this.$refs.emdsysrole.fileList=[];
          //关闭模态框
          this.editdialogVisiblesysrole=false;
        },

        /*编辑角色*/
        openeditwinupdatasysrole(id){
          alert(id)
          this.updatadialogVisible=true;
          this.$nextTick(item=>{
            this.$refs.updatasysrole.getdataByide(id);
          })
        },
        updatatgood(){
          this.$refs.updatasysrole.submitUpdataloadsysrole();
          this.$refs.updatasysrole.fileList=[];
          this.updatadialogVisible=false;
        },

        /*删除角色*/
        handleDeletesysrole(id){
          this.$axios.post("deletesysrole.action/"+id).then(response=>{
            //刷新
            this.getdata();
          }).catch();


        },
        /*查询*/
        querysysrolelike(){
          this.role=this.role;
          this.getdata();
        }

      },
      components:{
        EmdSysRole,UpDataSysRole
      },

      created() {
        this.getdata()
      }
    }
</script>

<style scoped>

</style>
