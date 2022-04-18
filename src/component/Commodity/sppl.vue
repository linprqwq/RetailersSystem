<template>
<div>
  <el-row type="flex" class="row-bg" v-for="a in plall">
    <el-col :span="6">
      <span>评论时间:{{a.commenttime}}</span>

    </el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "sppl",
  data(){
    return{
      plall:[],
    }
  },
  methods:{
    plallbyid(){

      var params = new URLSearchParams();
      params.append("cid",this.$route.query.comid)
      this.$axios.post("plallbyid.action",params).then(res=>{
        this.plall = res.data.records;
        console.log(this.plall);
      }).catch()
    }
  },
  created() {
    this.plallbyid();
  }


}
</script>

<style scoped>

</style>
