<template>

  <el-form :model="editform" status-icon :rules="rules" ref="editform">
    <el-form-item label="编号">
      <el-input v-model="editform.id" style="width: 200px" disabled></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editform.username" style="width: 200px" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="登录名" prop="loginname">
      <el-input v-model="editform.loginname" style="width: 200px" placeholder="请输入登录名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input  v-model="editform.password" style="width: 200px"
                placeholder="请输入密码"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="repassword">
      <el-input  v-model="editform.repassword" style="width: 200px"
                placeholder="请输入重复密码"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="editform.phone" style="width: 200px" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="editform.address" style="width: 200px" placeholder="请输入地址"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="#"
        :before-remove="beforeRemove"
        :limit="1"
        :on-change="changeFile"
        :on-exceed="handleExceed"
        :file-list="fileList"
        list-type="picture-card"
        :auto-upload="false"
        multiple>
        <el-button slot="trigger" size="small" type="primary">选取头像</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "EditUserView",
      data(){
        var checkUname = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }else{
            callback();
          }
        };
        var checkloginname = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('登录名不能为空'));
          }else{
            callback();
          }
        };
        var mobile_mode=/^1[34578]\d{10}$/;
        var checkphone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }
          else if(mobile_mode.test(value)){
            return callback(new Error('请输入正确的手机号'));
          }else{
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.editform.repassword != '') {
              this.$refs.editform.validateField('repassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value != this.editform.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
          return{
            repassword:"",
            password:"",
            fileList: [], //选择的头像列表
            editform: {
              username: '',
              loginname: '',
              password: '',
              repassword: '',
              phone: '',
              address:''
            }, //添加页面保存的数据，提交用
            rules: {
              password: [
                { validator: validatePass, trigger: 'blur' }
              ],
              repassword: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              username: [
                { validator: checkUname, trigger: 'blur' }
              ],
              loginname: [
                { validator: checkloginname, trigger: 'blur' }
              ],
              phone: [
                { validator: checkphone, trigger: 'blur' }
              ]
            }
          }
      },
      methods:{
        //添加按钮按下
        submitUpload(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //将需要提交的文件，和附带的数据，append  FormData中 然后提交
              var formData = new FormData();
              //先组装表单简单数据
              formData.append('id', this.editform.id)
              formData.append('username', this.editform.username)
              formData.append('loginname', this.editform.loginname)
              formData.append('password', this.editform.password)
              formData.append('phone', this.editform.phone)
              formData.append('address', this.editform.address)
              /*  Object.keys(this.editform).forEach(item=>{
                  formData.append(item, this.editform[item])
                })*/
              //循环文件数组   将多个文件保存入formdata中
              this.fileList.forEach(item => {
                if(item.raw==''){
                  formData.append('filenames', item.name)  //db中保存的文件数据
                }else{
                  formData.append('file', item.raw)  //新选择的文件
                }
              })
              //将组装好的数据 进行下一步 异步提交
              this.sendFile(formData)
              this.$parent.$parent.editdialogVisible = false;

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //真正进行异步，保存数据的方法
        sendFile(data) {
          //等待效果
          const loading = this.$loading({
            lock: true,
            text: '添加中，请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          //异步提交
          this.$axios({
            method: 'post',
            url: 'updUser.action',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            //结束等待效果
            loading.close()
            //弹出结果消息
            this.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            })
            this.formReset()// 上传成功清空
            //更新父页面数据
            this.$parent.$parent.getdata();

          }).catch(error => {
            console.log(error)
            alert("错误")
            loading.close()
          });
        },
        //每次文件改变选择，都将最新的选择文件 更新到data中的头像数组中
        changeFile(file, fileList) {
          console.log(file.raw)
          this.fileList = fileList;
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
        },
        //移除文件 更新头像数组数据
        beforeRemove(file, fileList) {
          if (this.$confirm(`确定移除 ${file.name}？`)) {
            this.fileList = fileList;
          }
        },
        formReset() { // 重置
          this.editform = {
            username: '',
            loginname: '',
            password: '',
            repassword: '',
            phone: '',
            address:''
          }
          this.fileList = [];  //清空文件列表
        },
        //根据id，查询当前数据  显示在编辑页面
        getdata(id){
          this.fileList=[];
          this.$axios.get("queryUsersbyid.action/"+id).then(response=>{
            //普通数据显示

            this.editform.id = response.data.id;
            this.editform.username = response.data.username;
            this.editform.loginname = response.data.loginname;
            this.editform.password = response.data.password;
            this.editform.repassword = response.data.password;
            this.editform.phone = response.data.phone;
            this.editform.address = response.data.address;
            //
            //图片数据显示
            this.fileList.push({name: response.data.imgpath,raw:'',url:"http://127.0.0.1:9090/RetailersBackSystem/"+response.data.imgpath})
          }).catch();
        }

      }
    }
</script>

<style scoped>

</style>
