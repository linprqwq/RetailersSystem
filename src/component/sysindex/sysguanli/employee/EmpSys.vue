<template>
  <div >

    <el-form :model="editform" status-icon :rules="rules" ref="editform" >
      <el-form-item label="编号">
        <el-input v-model="editform.id"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="empName" >
        <el-input v-model="editform.empName"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="empLoginname" >
        <el-input v-model="editform.empLoginname"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="empPassword"  >
        <el-input  type="password" v-model="editform.empPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="empPhone" >
        <el-input v-model="editform.empPhone"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="empLoginname" >
        <el-input v-model="editform.empMoney" prop="empLoginname"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="empAddress" >
        <el-input v-model="editform.empAddress" autocomplete="off"></el-input>
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
  </div>
</template>

<script>
    export default {
        name: "EmpSys",
      data() {
        return {
          rules: {
            empPassword: [
              {  required: true, message: '请输入密码', trigger: 'blur' }
            ],
            empName:[
              {  required: true, message: '用户名不为空', trigger: 'blur' }
            ],
            empLoginname:[
              {  required: true, message: '账号不能为空',trigger: 'blur' }
            ],
            empMoney:[
              { required: true, message: 'money不能为空', trigger: 'blur'}
            ],
            empAddress:[
              { required: true, message: '地址不能为空', trigger: 'blur'}
            ]
          },
          fileList: [], //选择的头像列表
          editform: {} //编辑页面保存的数据，提交用
        }
      },
      methods: {
        //提交修改
        submitUpload() {
          this.$refs.editform.validate((valid) =>{
            if(valid){
              //将需要提交的文件，和附带的数据，append  FormData中 然后提交
              var formData = new FormData();
              //先组装表单简单数据
              formData.append('id', this.editform.id)
              formData.append('empName', this.editform.empName)
              formData.append('empLoginname', this.editform.empLoginname)
              formData.append('empPassword', this.editform.empPassword)
              formData.append('empPhone', this.editform.empPhone)
              formData.append('empMoney', this.editform.empMoney)
              formData.append('empAddress', this.editform.empAddress)
              formData.append('empImg', this.editform.empImg)
              this.fileList.forEach(item => {
                console.log(item.raw)
                if(item.raw==''){
                  formData.append('filenames', item.name)  //db中保存的文件数据
                }else{
                  formData.append('file', item.raw)  //新选择的文件
                }
              })
              /* console.log(this.fileList);
               formData.append("file",this.fileList[0].raw);*/


              //将组装好的数据 进行下一步 异步提交
              this.sendFile(formData)
            }else {
              console.log('error submit!!');
              return false;
            }
          })
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
            url: '/updateemployees.action',
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
          this.$message.warning(`当前限制选择  1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
        },
        //移除文件 更新头像数组数据
        beforeRemove(file, fileList) {
          if (this.$confirm(`确定移除`)) {
            this.fileList = fileList;
          }
        },
        formReset() { // 重置
          this.editform = {
            empName:"",
            empLoginname:"",
            empPassword:"",
            empPhone:"",
            empMoney:"",
            empAddress:"",
            empImg:"",
          }
          this.fileList = [];  //清空文件列表
        },
        //根据id，查询当前数据  显示在编辑页面
        getdataByid(id){
          this.fileList=[];
          this.$axios.get("quersysemployeesbyid.action/"+id).then(response=>{
            //普通数据显示
            this.editform = response.data;
            //图片数据显示
            this.fileList.push({name:response.data.empImg.url,raw:'',url:"http://127.0.0.1:9090/RetailersBackSystem/"+response.data.empImg})
          }).catch();
        }

      }
    }
</script>

<style scoped>

</style>
