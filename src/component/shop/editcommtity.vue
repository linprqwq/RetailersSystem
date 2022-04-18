<template>
  <div>
    <!-- 商品的编辑-->
    <el-form ref="editForm" :rules="rules" :model="editForm" lable-width="80px">

      <el-form-item label="商品名称" prop="proname">
        <el-input v-model="editForm.proname"></el-input>
      </el-form-item>

      <el-form-item label="商品描述" prop="prodetails">
        <el-input v-model="editForm.prodetails"></el-input>
      </el-form-item>

      <el-form-item label="商品类型" prop="shopType">
        <el-select v-model="editForm.shopType" placeholder="请输入商品类型">
          <el-option v-for="i in shopTypes" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品价格" prop="prosprice">
        <el-input v-model="editForm.prosprice"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          list-type="picture-card"
          action="#"
          :auto-upload="false"
          :accept="accept"
          :file-list="fileList"
          :on-change="changeImag"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog__footer">
          <el-button type="primary" @click="submitForm('editForm')">确认修改</el-button>
          <el-button @click="resetForm()">取消</el-button>
    </span>

  </div>
</template>

<script>
  export default {
    name: "editcommtity",
    data() {
      return {
        dialogVisible: false,  //模态框状态
        accept: ".jpg,.png",//图片格式
        editForm: {id: ""},
        fileList: [],//文件集合
        shopTypes: [],//加载商品分类
        rules: {
          proname: [{
            required: true, message: "请输入商品名称", trigger: 'blur'
          }],
          prodetails: [{
            required: true, message: "请输入商品详情", trigger: 'blur'
          }],
          prosprice: [{
            required: true, message: "请输入商品价格", trigger: 'blur'
          }, {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          }
          ],
          shopType: [{
            required: true, message: "请输入商品分类类型", trigger: "blur"
          }]
        }

      }
    },
    methods: {
      getShoptypes() {
        //获取类别
        this.$axios.get("shopinfo.action/queryallshoptype.action").then(res => {
          this.shopTypes = res.data;
        }).catch(error => {
          this.$message.warning(error);
        })
      },
      getData(id) {
        this.$axios.get("queryspid.action/" + id).then((res => {
          this.editForm = res.data;
          console.log(this.editForm);
            this.fileList.push({
              name: res.data.prozimg,
              raw: '',
              url: "http://localhost:9090/RetailersBackSystem/" + res.data.prozimg
            })
        }))
      },
      changeImag(file, fileList) {
        //获取文件信息
        this.fileList = fileList;
      },
      submitForm(forName) {
          //提交修改表单
          this.$refs[forName].validate((valid) => {
          if (valid) {

            var formData = new FormData;
            //组装普通数据
            Object.keys(this.editForm).forEach((key) => {
              if (key != "image" && key != "type" && key != "quantity") {
                formData.append(key, this.editForm[key])
              }
            })

            // //组装文件数据
            this.fileList.forEach(item => {
              if (item.raw == '') {
                formData.append("filenames",item.name)  //保存的文件数据
              } else {
                formData.append("files", item.raws);
              }
            })

            // //真正的提交
            this.sendFile(formData);
          } else {
            this.$message.error('error submit!!!');
            return false;
          }
        })
      },
      sendFile(data) {
        console.log(data)
        this.$axios({
          method: "post",
          url:"editcom.action",
          data: data,
          headers: {
            'Content-Type':'multipart/form-data'
          }
        }).then(res => {
          if (res.data.code > 0) {
            this.$message.success(res.data.msg);
            this.$refs["editForm"].resetFields()
            this.fileList = [];
            this.$parent.$parent.dialogVisible = false;
            this.$parent.$parent.getShopData();
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      resetForm() {
        this.fileList = [];
        this.$refs["editForm"].resetFields();
        this.$parent.$parent.dialogVisible = false;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
      }, beforeRemove(file, fileList) {
        this.fileList = fileList;
      }
    },
    created() {
      this.getShoptypes();
    }
  }
</script>

<style scoped>

</style>
