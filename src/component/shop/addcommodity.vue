<template>
  <!--去添加商品-->
  <div>
    <el-row :gutter="20">
      <el-col :span="13" :offset="4">
        <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px">

          <el-form-item label="商品名称" prop="proname">
            <el-input v-model="addForm.proname"></el-input>
          </el-form-item>

          <el-form-item label="商品类型" prop="shopType">
            <el-select v-model="addForm.shopType" placeholder="请选择商品类型">
            <el-option v-for="i in shoptypes" :key="i.id" :label="i.name" :value="i.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品标题" prop="prosubtitle">
            <el-input v-model="addForm.prosubtitle"></el-input>
          </el-form-item>

          <el-form-item label="上传图片">
            <el-upload list-type="picture-card"
                       action="#"
                       :limit="1"
                       :auto-upload="false"
                       :accept="accept"
                       :on-change="changImage"
                       :on-exceed="handleExced"
                       :file-list="fileList"
                       :before-remove="beforRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品详情" prop="prodetails">
            <el-input v-model="addForm.prodetails"></el-input>
          </el-form-item>

          <el-form-item label="商品价格" prop="prosprice">
            <el-input v-model="addForm.prosprice"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('addForm')" type="primary" size="mini">添加</el-button>
            <el-button @click="resetForm('addForm')" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    name: "addcommodity",
    data() {
      return {
        accept: ".jpg,.png",//上传格式限制
        //商品数据
        addForm: {
          proname: "",
          shopType: "",
          prosubtitle: "",
          prodetails: "",
          prosprice: ""
        },
        fileList: [], //图片
        shoptypes: [], // 商品分类，

        rules: {
          proname: [
            {required: true, message: "请输入商品名称", trigger: "blur"}
          ], shopType: [
            {required: true, message: "请输入商品类型", trigger: "change"}
          ], prosubtitle: [{
            required: true, message: "请输入商品副标题", trigger: "blur"
          }], prodetails: [{
            required: true, message: "请输入商品详情", trigger: "blur"
          }], prosprice: [{
            required: true, message: "请输入商品的价格", trigger: "blur"
          },
            {
              pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
              message: '请输入正确金额格式,可保留两位小数'
            }
          ]
        },
      }
    },
    methods: {
      getshops() {
        //去获取商品类别
        this.$axios.get("shopinfo.action/queryallshoptype.action").
        then(res => {
          this.shoptypes = res.data;
          console.log(this.shoptypes)
        }).catch(err => {
          this.message.warning(err);
          alert(err);
        })
      },
      changImage(file, fileList) {
        //去获取文件信息
        this.fileList = fileList;
      },
      submitForm(forName) {
        //去提交表单
        this.$refs[forName].validate((valid) => {
          if (valid) {
            var formData = new FormData();
            //去组装普通数据
            Object.keys(this.addForm).forEach((key) => {
              formData.append(key, this.addForm[key]);
            });
            //组装文件数据
            this.fileList.forEach(item => {
              formData.append("image", item.raw);
            });
            this.sendFile(formData)
          } else {
            this.message.error("error  submit")
            return false;
          }
        })
      },
      sendFile(data) {
        //提交等待
        this.$axios({
          method: "post",
          url: "addsp.action",
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          },

        }).then(res => {
          if (res.data.code > 0) {
            this.$message.success(res.data.msg);
            this.resetForm("addForm");//去重置表单
            this.fileList=[];

          }else {
          this.$message.error(res.data.msg);
          }
        }).catch(err=>{
            this.$message.warning(err);
        })

      },
      resetForm(forName){
            //去重置表单
        this.$refs[forName].resetFields();
        this.addForm.prodetails="";
      },
      handleExced(files,fileList){
        this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
      },
      beforRemove(file,fileList){
        if (this.$confirm(`确定移除 ${file.name}？`)) {
          this.fileList = fileList;
        }
      }
    },
    created(){
      this.getshops();
    }
  }
</script>

<style scoped>

</style>
