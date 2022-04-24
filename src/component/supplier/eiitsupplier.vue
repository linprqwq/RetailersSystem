<template>
  <!--修改供应商信息-->
  <div>
    <el-header>供应商信息修改</el-header>
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
      <el-form-item label="用户名" prop="loginname">
        <el-input v-model="ruleForm.loginname"></el-input>
      </el-form-item>
      <!--商品的分类-->
      <goods_category ref="goods_category"></goods_category>
      <br>
      <el-form-item label="上传图片">
        <el-upload
          list-type="picture-card"
          action="#"
          :limit="1"
          :auto-upload="false"
          :accept="accept"
          :file-list="fileList"
          :on-change="changeFile"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  import Goods_category from "./goods_category";

  export default {
    name: "eiitsupplier",
    data() {
      return {
        img: "",
        fileList: "[]",
        accept: ".jpg,.png",// 上传限制
        ruleForm: {
          id: sessionStorage.getItem("id")   /*根据id去查询数据*/
        },
        rules: {
          loginname: [
            {required: true, message: "请输入用户名", trigger: "blur"}, //提示
          ]
        },
        ShopTypeInfos: []
      }
    },
    methods: {
      getData() {
        //清空图片数组
        this.fileList = [];
        //调用异步,去根据id查询用户
        this.$axios.get("queryUserById.action/"+this.ruleForm.id, null).
        then(response => {
          this.ruleForm = response.data;
          this.ShopTypeInfos=[]   //清空
          response.data.supplierGoodsCategoryList.forEach(item=>{
            this.ShopTypeInfos.push(item.sortId);
          });
          this.fileList.push({
            name: response.data.imgpath,
            raw: '',
            url: "http://localhost:9090/RetailersBackSystem/" + response.data.imgpath
          });
          //调用子组件函数，为商品分类添加数据
          this.$refs.goods_category.getAllshopTypeInfos(this.ShopTypeInfos);
        }).catch()
      },
      submit(){
        //调用异步，将用户名和图片进行修改
        let data = new FormData();
        //当前用户id
        data.append("id",this.ruleForm.id);
        //用户名
        data.append("loginname",this.ruleForm.loginname);
        //获取子组件选择的商品分类数组
        this.$refs.goods_category.ShopTypeInfos.forEach(item=>{
          data.append("ids",item);
        })


        data.append("img",this.img.raw);
        console.log(this.img);
        //调用异步，进行数据修改
        this.$axios({
          method: 'post',
          url: "updateSupplier.action",
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          //修改成功！
          this.$message.success("修改成功！");
          //重新刷新数据
          this.getData();
        }).catch(err => {
          this.$message.warning(err);
        })
      },
      reset(){
          this.ShopTypeInfosp=[];
          //重新刷新数据
        this.getData();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择一个头像`)
      },
      beforeRemove(file, fileList) {
        if (this.$confirm(`确定移除 ${file.name}？`)) {
          this.fileList = fileList;
          this.img = file;
        }
      },
      changeFile(file, fileList) {
        //获取文件信息
        this.fileList = fileList;
        //获取文件信息
        this.img = file;
      }
    },
    created() {
      this.getData();
    },
      components: {Goods_category}

  }
</script>

<style scoped>

</style>
