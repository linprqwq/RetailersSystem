<template>
  <div>
    <el-form :model="editformsysmenus">
      <el-form-item label="id">
        <el-input v-model="editformsysmenus.id"></el-input>
      </el-form-item>
      <el-form-item label="parentId">
        <el-input v-model="editformsysmenus.parentId" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="editformsysmenus.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="linkUrl">
        <el-input v-model="editformsysmenus.linkUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="iconUrl">
        <el-input v-model="editformsysmenus.iconUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="status">
        <el-input v-model="editformsysmenus.status" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "UpDataMenus",
      data() {
        return {
          fileList: [],
          editformsysmenus: {} //编辑页面保存的数据，提交用
        }
      },
      methods:{
        submitUpdataloadsysmenusupdata(){
          //将组装好的数据 进行下一步 异步提交
          this.sendFile(this.editformsysmenus)
        },
        //真正进行异步，保存数据的方法
        sendFile(data) {
          //等待效果
          const loading = this.$loading({
            lock: true,
            text: '修改中，请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          //异步提交
          this.$axios({
            method: 'post',
            url: '/updatasysmenus.action',
            data: this.editformsysmenus
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
          this.editformsysmenus = {
            parentId:"",
            name:"",
            linkUrl:"",
            iconUrl:"",
            status:"",

          }
          this.fileList = [];  //清空文件列表
        },
        //根据id，查询当前数据  显示在编辑页面
        getdataByide(id){
          this.fileList=[];
          this.$axios.get("quersysmenusbyid.action/"+id).then(response=>{
            //普通数据显示
            this.editformsysmenus = response.data;
          }).catch();
        }
      }
    }
</script>

<style scoped>

</style>
