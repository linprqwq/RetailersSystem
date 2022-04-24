<template>
  <div>
  商户地址图片 <el-upload
  class="avatar-uploader"
  action="#"
  :limit="1"
  :file-list="fileList"
  :on-change="changeFile"
  :auto-upload="false"
  list-type="picture-card">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

  <br><br>

    <el-select  v-model="sheng" @change="fun1" placeholder="----请选择---">
      <el-option  v-for="p in provice" :value="p.id" :label="p.name" >{{p.name}}</el-option>
    </el-select>
    <el-select v-model="shi"  @change="fun2" placeholder="----请选择---">
      <el-option  v-for="c in ctiy" :value="c.id" :label="c.name" >{{c.name}}</el-option>
    </el-select>
    <el-select v-model="qq" placeholder="----请选择---">
      <el-option v-for="d in district" :value="d.id" :label="d.name" >{{d.name}}</el-option>
    </el-select><br>
  详细地址: <el-input type="text" v-model="xxaddr"></el-input><br>
  <el-button type="primary" @click="zc">注册</el-button>
  </div>
</template>

<script>
    export default {
        name: "Zcsh",
      data(){
        return{
          useridd:sessionStorage.getItem('id'),
          imageUrl:"",
          shi:"",
          sheng:"",
          qq:"",
          provice:[],
          ctiy:[],
          district:[],
          fileList:[],
          xxaddr:"",
          ssqid:""
        }
      },
      methods:{
        zc(){
          var formData = new FormData();
          formData.append("id",this.useridd);
          this.fileList.forEach(item => {
            formData.append('file', item.raw)  //新选择的文件
          })
          for(let a=0;a<this.provice.length;a++){
            if(this.sheng==this.provice[a].id){
              this.shaddress=this.provice[a].name;
            }
          }
          for(let a=0;a<this.ctiy.length;a++){
            if(this.shi==this.ctiy[a].id){
              this.shaddress+=this.ctiy[a].name;
            }
          }
          for(let a=0;a<this.district.length;a++){
            if(this.qu==this.district[a].id){
              this.shaddress+=this.district[a].name;
            }
          }
          this.shaddress+=this.xxaddr
          this.ssqid=this.sheng+"-"+this.shi+"-"+this.qq;
          formData.append("ssqid",this.ssqid);
          formData.append("shaddress",this.shaddress);
          this.$axios({
            method: "post",
            url: "zcsh.action",
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {

            this.$message.success(res.data.msg);

          }).catch(err=>{
            this.$message.warning(err);
          })
        },
        open(){
          //选择省
          var _this=this;
          this.$nextTick(jj=>{
            this.$axios.post("queryAllSheng.action").then(val=>{
              _this.provice=val.data;
            }).catch()
          })
        },
        fun1(){
          var _this = this;
          var params=new URLSearchParams();
          params.append("id",this.sheng)
          this.$axios.post("queryChinaByShi.action",params).then(val=>{
              _this.ctiy=val.data
            }
          ).catch()

        },
        fun2(){
          var _this = this;
          var params=new URLSearchParams();
          params.append("id",this.shi)
          this.$axios.post("queryChinaByQu.action",params).then(val=>{
              _this.district=val.data
            }
          ).catch()

        },
        //每次文件改变选择，都将最新的选择文件 更新到data中的头像数组中
        changeFile(file, fileList) {

          this.fileList = fileList;
        }
      },
      created(){
        this.open();
      }
    }
</script>

<style scoped>

</style>
