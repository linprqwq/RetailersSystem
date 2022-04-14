<template>
  <div>
    <el-button class="addbtn" type="warning" @click="openaddwin">添加</el-button>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getdata">查询</el-button>
      </el-form-item>
    </el-form>

      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="编号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="loginname"
            label="登录名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="80">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="umoney"
            label="用户余额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="imgpath"
            label="用户头像"
            width="100">
            <template slot-scope="scope">
              <img :src="scope.row.imgpath" style="width: 40px;height: 40px">
            </template>
          </el-table-column>
          <el-table-column
            prop="ustate"
            label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.ustate==0">正常</span>
              <span v-else-if="scope.row.ustate==1">冻结</span>
              <span v-else-if="scope.row.ustate==2">注销</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定要冻结此用户吗？"
                @confirm="dongjie(scope.row)"
              >
                <el-button
                  size="mini"
                  type="warning"
                  slot="reference">冻结</el-button>
              </el-popconfirm>
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
      </el-main>

    <!--  添加页面-->
    <el-dialog
      title="添加用户信息"
      :visible.sync="adddialogVisible"
      width="40%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="addView" is="AddView"></component>

      <el-button type="primary" @click="addUser">确 定</el-button>
      <el-button @click="adddialogVisible = false">取 消</el-button>

    </el-dialog>
    <!--  编辑页面-->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editdialogVisible"
      width="40%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="editUser" is="EditUserView"></component>

      <el-button type="primary" @click="editUser">确 定</el-button>
      <el-button @click="editdialogVisible = false">取 消</el-button>

    </el-dialog>
  </div>
</template>

<script>
  import AddView from "./AddView";
  import EditUserView from "./EditUserView";
  export default {
    name: "UserView",
    data(){
      return{
        tableData:[],
        adddialogVisible:false,
        editdialogVisible:false,
        useraddFrom:{},
        useredittFrom:{},
        pageno:1,   //页码
        pagesize:5,   //页size
        total:1,   //查询到的总记录数量页面 显示标志
        editform:{},   //编辑页面数据 对象
        path:"http://127.0.0.1:9090/RetailersBackSystem/",
        img:null,
        username:""
      }

    },
    components:{
      AddView,EditUserView
    },
    methods:{
      dongjie(row){
        this.$axios.put("updstateuser.action",{"ustate":1,"id":row.id})
          .then(response=>{
          if(response.data.code=="1"){
            alert(response.data.msg)
            this.getdata()
          }else{
            alert(response.data.msg)
          }
        }).catch();
      },
      editUser(){
        this.$refs.editUser.submitUpload("editform");
      },
      addUser(){
        this.$refs.addView.submitUpload("addform");

      },
      openaddwin(){
        this.adddialogVisible=true;
      },
      //窗口关闭确认
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.editdialogVisible = false
            this.adddialogVisible = false
            this.$refs.editUser.fileList=[];

          })
          .catch(_ => {});
      },
      getdata(){   //获取数据的方法

        var params = new URLSearchParams();
        params.append("pageno",this.pageno);
        params.append("pagesize",this.pagesize);
        params.append("username",this.username);

        this.$axios.post("queryallUser.action",params)
          .then(response=>{
            console.log(response)
            this.tableData = response.data.rows;//获取所有要展示的数据
            this.total = response.data.total; //总记录数量
            console.log(response);
            this.tableData.forEach((item)=> {
              item.imgpath = this.path+item.imgpath;
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
      },
      handleEdit(row){
        this.editdialogVisible=true
        //根据id查询数据
        this.$nextTick(item=>{
          this.$refs.editUser.getdata(row.id);
        })

      },
      handleDelete(id){
        this.$axios.delete("delUser.action/"+id)
          .then(response=>{
            if(response.data.code=="1"){
              alert(response.data.msg)
              this.getdata();
            }else{
              alert(response.data.msg)
            }

          }).catch();
      }
    },
    created(){
      this.getdata()
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .addbtn{
    float: left;
  }
  .el-table-column{
    height: 30px;
  }
</style>
