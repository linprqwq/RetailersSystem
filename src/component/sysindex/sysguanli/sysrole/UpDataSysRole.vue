<template>
  <div >
    <el-form :model="editformsysrle">
      <!--<el-form-item label="id">
        <el-input v-model="editformsysrle.id"></el-input>
      </el-form-item>-->
      <el-form-item label="角色">
        <el-input v-model="editformsysrle.roleName"></el-input>
      </el-form-item>
      <!--<el-form-item label="状态">
        <el-input v-model="editformsysrle.remark" autocomplete="off"></el-input>
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "UpDataSysRole",
      data() {
        return {
          fileList: [],
          editformsysrle: {} //编辑页面保存的数据，提交用
        }
      },
      methods:{
        submitUpdataloadsysrole(){
          var formData = new FormData();
          //先组装表单简单数据
          formData.append('id', this.editformsysrle.id)
          formData.append('roleName', this.editformsysrle.roleName)
          formData.append('remark', this.editformsysrle.remark)
         /* this.fileList.forEach(item => {
            console.log(item.raw)
            if(item.raw==''){
              formData.append('filenames', item.name)  //db中保存的文件数据
            }else{
              formData.append('file', item.raw)  //新选择的文件
            }
          })*/
          //将组装好的数据 进行下一步 异步提交
          this.sendFile(formData)
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
            url: '/updatasysrole.action',
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
              message: '修改成功',
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
      /*  //每次文件改变选择，都将最新的选择文件 更新到data中的头像数组中
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
        },*/
        formReset() { // 重置
          this.editformsysrle = {
            roleName:"",
            remark:"",
          }
          this.fileList = [];  //清空文件列表
        },
        //根据id，查询当前数据  显示在编辑页面
        getdataByide(id){
          this.fileList=[];
          this.$axios.get("quersysrolebyid.action/"+id).then(response=>{
            //普通数据显示
            this.editformsysrle = response.data;
          }).catch();
        }
      }
    }
</script>

<style scoped>

</style>
