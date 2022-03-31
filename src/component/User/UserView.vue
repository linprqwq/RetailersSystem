<template>
  <div>
    <el-container>
      <el-main>
    <el-table
      :data="tableData"
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
        prop="loginname"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="umoney"
        label="用户余额">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="img"
        label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column
        prop="ustate"
        label="状态">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
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
        <el-button type="success" @click="dialogTableVisible=true">添加</el-button>

        <el-dialog title="添加用户" :visible.sync="dialogTableVisible">
          <el-form :model="useraddFrom" ref="userFrom" label-width="80px">
            <el-form-item label="用户名">
              <el-input type="text" v-model="useraddFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input v-model="useraddFrom.loginname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="useraddFrom.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="useraddFrom.address"></el-input>
            </el-form-item>
            <!--            <el-form-item label="图片">-->
            <!--              <el-input type="file" @change="filechange"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="add">添加</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>


        <el-dialog title="修改" :visible.sync="dialogTableUpdate">
          <el-form :model="useredittFrom" ref="ueditFrom" label-width="80px">
            <el-form-item label="用户名">
              <el-input type="text" v-model="useredittFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input v-model="useredittFrom.loginname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="useredittFrom.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="useredittFrom.address"></el-input>
            </el-form-item>
            <!--            <el-form-item label="用户头像">-->
            <!--              <el-input type="file" @change="filechange2"></el-input>-->
            <!--              <el-upload-->
            <!--                class="avatar-uploader"-->
            <!--                action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--                :show-file-list="false"-->
            <!--                :on-success="handleAvatarSuccess"-->
            <!--                :before-upload="beforeAvatarUpload">-->
            <!--                <img v-if="useredittFrom.imgpath" :src="useredittFrom.imgpath" class="avatar">-->
            <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--              </el-upload>-->
            <!--            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="xg(useredittFrom)">修改</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "UserView",
      data(){
        return{
          dialogTableVisible:false,
          dialogTableUpdate:false,
          tableData:[],
          useraddFrom:{},
          useredittFrom:{},
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1,   //查询到的总记录数量
          editmodalVisible:false,  //编辑页面 显示标志
          editform:{},   //编辑页面数据 对象
          path:"http://127.0.0.1:9090/RetailersBackSystem/",
          img:null
        }

      },
      methods:{
        // handleAvatarSuccess(res, file) {
        //   this.imageUrl = URL.createObjectURL(file.raw);
        // },
        // beforeAvatarUpload(file) {
        //   const isJPG = file.type === 'img/jpeg';
        //   const isLt2M = file.size / 1024 / 1024 < 2;
        //   return isJPG && isLt2M;
        // },
        filechange(e){
          //只要发现文件发生改变了，
          //将当前控件的内容赋值给 addform.img
          // this.useraddFrom.imgpath=e.target.files[0];
          // console.log(e.target.files[0])
        },
        filechange2(e){
          //只要发现文件发生改变了，
          //将当前控件的内容赋值给 addform.img
          // this.useredittFrom.imgpath=e.target.files[0];
          // console.log(e.target.files[0])
        },
        getdata(){   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);

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
        add(){
          // //提交的数据 有文件 特殊数据
          // var formData = new FormData();
          // //Object.keys(this.addform)  能够获取addfromjson对象的所有的key
          // Object.keys(this.useraddFrom).forEach((key) => {
          //   formData.append(key, this.useraddFrom[key]);
          // });
          //
          // this.$axios({
          //   method: 'post',
          //   url: 'addUser.action',
          //   data:formData,
          //   headers: {
          //     'Content-Type':'multipart/form-data'
          //   }
          // }).then(response=>{
          //   if(response.data.code=="1"){
          //     alert(response.data.msg)
          //     this.getdata();
          //   }else{
          //     alert(response.data.msg)
          //   }
          // }).catch(error=>alert("错误"));
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
          this.dialogTableUpdate=true
          this.useredittFrom=row
          console.log(this.useredittFrom)
        },
        xg(formdata){

          // //提交的数据 有文件 特殊数据
          // var formData = new FormData();
          // //Object.keys(this.addform)  能够获取addfromjson对象的所有的key
          // Object.keys(formdata).forEach((key) => {
          //   formData.append(key, formdata[key]);
          // });
          //
          // this.$axios({
          //   method: 'post',
          //   url: 'updUser.action',
          //   data:formData,
          //   headers: {
          //     'Content-Type':'multipart/form-data'
          //   }
          // }).then(response=>{
          //   if(response.data.code=="1"){
          //     alert(response.data.msg)
          //     this.getdata();
          //   }else{
          //     alert(response.data.msg)
          //   }
          // }).catch(error=>alert("错误"));
          // axios.put("updUser.action",formdata).
          // then(function (response) {
          //   if(response.data.code=="1"){
          //     alert(response.data.msg)
          //     this.getdata();
          //   }else{
          //     alert(response.data.msg)
          //   }
          // }).catch();
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
    width: 98px;
    height: 98px;
    display: block;
  }
</style>
