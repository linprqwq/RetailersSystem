<template>
  <div >

    <el-form :model="addform" >
      <el-form-item label="退货商品">
        <el-input v-model="addform.proname" style="width: 200px" disabled></el-input>
      </el-form-item>
      <el-form-item label="退货原因">
        <el-select v-model="addform.thyy" placeholder="请选择退货原因" style="width: 200px">
          <el-option label="收到商品破损" value="收到商品破损"></el-option>
          <el-option label="商品错发、漏发" value="商品错发、漏发"></el-option>
          <el-option label="收到商品与描述不符" value="收到商品与描述不符"></el-option>
          <el-option label="商品质量问题" value="商品质量问题"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品总价格" >
        <el-input v-model="addform.totalpirce" style="width: 200px" :min="1" label="商品价格" disabled></el-input>

      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :before-remove="beforeRemove"
          :limit="3"
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
  name: "returngoods",
  data() {
    return {
      fileList: [], //选择的头像列表
      addform: {} //编辑页面保存的数据，提交用
    }
  },
  methods: {
    //添加按钮按下
    submitUpload() {

      //将需要提交的文件，和附带的数据，append  FormData中 然后提交
      var formData = new FormData();
      //先组装表单简单数据
      formData.append("orddid",this.addform.id)
      formData.append("tmoney",this.addform.totalpirce)
      formData.append("thyy",this.addform.thyy)
      Object.keys(this.addform).forEach(item=>{
        formData.append(item, this.addform[item])
      })
      //循环文件数组   将多个文件保存入formdata中
      this.fileList.forEach(item => {
        formData.append('file', item.raw)
      })
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
        url: 'addgoods.action',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
    this.$message.success(response.data.msg);
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
      this.addform = {
        proname: '',
        thyy: '',
        totalpirce: ''
      }
      this.fileList = [];  //清空文件列表
    },
    //根据id，查询当前数据  显示在编辑页面
    getdata(orderid,orddid){
      var params = new URLSearchParams();
      params.append("orderid",orderid);
      params.append("id",orddid);
      this.$axios.post("queryordd.action",params).then(res=>{
        //普通数据显示
        this.addform = res.data;
        console.log(res.data);
      }).catch();
    }


  }
}
</script>

<style scoped>

</style>
