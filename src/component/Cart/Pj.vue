<template>
  <div >

    <el-form :model="pjsp" >
      <el-form-item label="评价商品">
        <el-input v-model="pjsp.proname" style="width: 200px" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品图">
        <img :src="'/src/'+pjsp.proimage" style="height: 50px;width: 50px;">
      </el-form-item>
      <el-form-item label="服务评价">
        <el-rate
          v-model="value"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="商品评价" prop="name">
        <el-rate
          v-model="value1"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="时效评价" prop="name">
        <el-rate
          v-model="value2"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="评价内容" prop="name">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Pj",
  data(){
    return{
      value:null,
      value1:null,
      value2:null,
      pjsp:{},
      textarea:"",
      reviews:{},
    }
  },
  methods:{
    getdata(b){

      this.pjsp = b;
    },
    pjtijiao(){
      var pamram = new URLSearchParams();
      pamram.append("content",this.textarea)
      pamram.append("cscore",this.value)
      pamram.append("sscore",this.value1)
      pamram.append("pscore",this.value2)
      pamram.append("orddid",this.pjsp.id);
      pamram.append("cid",this.pjsp.proid);
      this.$axios.post("orderpj.action",pamram).then(res=>{
        if (res.data.code==0){
          this.$message.error(res.data.msg);
        }else{
          this.$message.success(res.data.msg);
        }
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
