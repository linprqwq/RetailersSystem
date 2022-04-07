<template>
  <!-- 去申请成为供销商-->
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="我要成为供应商">
        <el-form :inline="true" class="demo-form-inline">
          <!--分类组件-->
          <goods_category ref="goods_category"></goods_category>

        <el-form-item label="去上传营业执照">
          <el-upload
            :limit="1"
            list-type="picture-card"
            action=""
            :on-change="changImage"
            :auto-upload="false"
            :accept="accept"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <br>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交申请</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>


  </div>

</template>

<script>
  import Goods_category from "./goods_category";

  export default {
    name: "Supplier_registration",
    data() {
      return {
        accept: ".jpg,.png",      //上传图片格式限制,
        addForm: {
          id:sessionStorage.getItem("id"),
          img: null
        }
      }
    },
    methods: {
      submitForm() {
        //取进行提交
        //数据组装
        //获取选择的商品分类数组、
        var  formData=new FormData();
       /* formData.append("id",1);//this.addForm.id);*/

        formData.append("id",this.addForm.id);
        Object.keys(this.$refs["goods_category"].ShopTypeInfos).forEach(index=>{
        formData.append("supplierGoodsCategoryIds",this.$refs["goods_category"].ShopTypeInfos[index]);
        })

          formData.append("img",this.addForm.img.raw)
        //调用异步申请
        this.$axios({
          method: "post",
          url: "apply_supplier.action",
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
                if(res.data.x){
                this.$message.success(res.data.msg);
                }else{
                  this.$message.error(res.data.msg);
                }
        }).catch(err=>{
            this.$message.warning(err);
        })
      },
      //去重置表单
          resetForm(forName){
          this.$refs[forName].resetFields();
          },
      handlePictureCardPreview(file){
          //显示图片
            this.dialogVisible=true;
      },
      changImage(file){
          //去获取文件的信息
            this.addForm.img=file;
      },handleRemove(file,fileList){
          //去移除图片
        console.log(file,fileList);
      }
    },
    components: {Goods_category}
  }
</script>

<style scoped>

</style>
