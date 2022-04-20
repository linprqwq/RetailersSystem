<template>
  <div>
    <el-form :model="addformmenus">
      <el-form-item label=编号>
        <el-input v-model="addformmenus.id" ></el-input>
      </el-form-item>
      <el-form-item label="父编号">
        <el-input v-model="addformmenus.parentId"></el-input>
      </el-form-item>
      <el-form-item label="菜单名">
        <el-input v-model="addformmenus.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址">
        <el-input v-model="addformmenus.linkUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标地址">
        <el-input v-model="addformmenus.iconUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="addformmenus.status" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "AddSysMenus",
      data() {
        return {
          fileList: [],
          addformmenus: {} //编辑页面保存的数据，提交用
        }
      },
      methods: {
        submitUploadsysmenusadd(){
          var formData = new FormData();

          Object.keys(this.addformmenus).forEach(key=>{
            console.log(key)
            formData.append(key, this.addformmenus[key])
          })
          /* formData.append('file',  this.fileList[0].raw)*/

          //将组装好的数据 进行下一步 异步提交
          this.sendFile(formData)


        },
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
            url: 'addsymenus.action',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            if (response.data.msg=="添加成功"){
              //结束等待效果
              loading.close()
              //弹出结果消息
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.formReset()// 上传成功清空
              //更新父页面数据
              this.$parent.$parent.getdata();
              //关闭模态框
              this.editdialogVisiblesysmenus = false;
            }
          }).catch(error => {
            console.log(error)
            alert("错误")
            loading.close()
          });
        },
        /* //每次文件改变选择，都将最新的选择文件 更新到头像数组中
         changeFile(file, fileList) {
           this.fileList = fileList;
         },
         handleExceed(files, fileList) {
           this.$message.warning("只能选一个头像")
         },
         //移除文件 更新头像数组数据
         beforeRemove(file, fileList) {
           if (this.$confirm(`确定移除 ${file.name}？`)) {
             this.img = file;
           }
         },*/
        formReset() { // 重置
          this.addformmenus = {
            parentId:"",
            name:"",
            linkUrl:"",
            iconUrl:"",
            status:"",
          }
        }

      }
    }
</script>

<style scoped>

</style>
