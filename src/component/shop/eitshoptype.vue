<template>
  <!--修改商品管理-->
  <div>
    <el-form ref="editTypeForm" :rules="relus" :model="editTypeForm" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="editTypeForm.name"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit('editTypeForm')">确认修改</el-button>
      <el-button @click="reset">取消</el-button>
    </span>
  </div>

</template>

<script>
  export default {
    name: "eitshoptype",
    data() {
      return {
        editTypeForm: {id: 0, name: ""},
        dialogVisible: false, //模态框状态
        relus: {
          name: [{
            required: true, message: "请输入商品分类名", trigger: 'blur'
          }]
        }
      }
    }, methods: {
      getdata(id) {
        //打开编辑
        this.$axios.get("shopinfo.action/selectid.action/" + id)
          .then((res => {
            this.$nextTick(item => {
              this.editTypeForm.id = res.data.id;
              this.editTypeForm.name = res.data.name;
            })
          })).catch(err => {
          this.$message.error(err);
        })
      },
      //去进行修改操作
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put("shopinfo.action/updatashop.action", this.editTypeForm).then(res => {
              if (res.data.code > 0) {
                this.$parent.$parent.getTypes();
                this.$message.success(res.data.msg);
                this.$parent.$parent.dialogVisible=false;
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(error => {
              this.$message.error(error);
            })

          } else {
            this.$message.error('error submit!!!');
            return false;
          }
        })

      }, reset() {
        this.editform = [];
        this.$parent.$parent.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
