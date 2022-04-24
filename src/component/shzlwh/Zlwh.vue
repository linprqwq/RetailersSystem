<template>
   <div>
     用户名: <el-input type="text" v-model="uname"></el-input><br>
     登录名: <el-input type="text" v-model="loginname"></el-input><br>
     密码: <el-input type="text" v-model="pwd"></el-input><br>
     手机号:<el-input type="text" v-model="phone"></el-input><br>
    商户地址图片 <el-upload
       class="avatar-uploader"
       action="#"
       :file-list="fileList"
       :limit="1"
       :on-change="changeFile"
       :auto-upload="false"
       list-type="picture-card">
       <img v-if="imageUrl" :src="imge" class="avatar">
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     </el-upload>

     <br><br>

     <el-select  v-model="sheng" @change="fun1" placeholder="----请选择---">
       <el-option  v-for="p in provice" :value="p.id+''" :label="p.name" >{{p.name}}</el-option>
     </el-select>
     <el-select v-model="shi"  @change="fun2" placeholder="----请选择---">
       <el-option  v-for="c in ctiy" :value="c.id+''" :label="c.name" >{{c.name}}</el-option>
     </el-select>
     <el-select v-model="qq" placeholder="----请选择---">
       <el-option v-for="d in district" :value="d.id+''" :label="d.name" >{{d.name}}</el-option>
     </el-select><br>
     详细地址: <el-input type="text" v-model="xxaddr"></el-input><br>
     <el-button type="primary" @click="update">修改</el-button>
   </div>
</template>

<script>
    export default {
        name: "zlwh",
      data(){
        return{
          useridd:sessionStorage.getItem('id'),
          imageUrl:"",
          uname: "",
          loginname: "",
          pwd: "",
          phone: "",
          imge: "",
          shaddress: "",
          xxaddr:"",
          shi:"",
          sheng:"",
          qq:"",
          provice:[],
          ctiy:[],
          district:[],
          fileList:[],
          ssqid:""

        }
      },
      methods:{

          selsid(){
            var params=new URLSearchParams()
            params.append("id",this.useridd);
            this.$axios.post("shzlwh.action",params).then(res=>{
            this.uname=res.data.username;
              this.loginname=res.data.loginname;
              this.pwd=res.data.password;
              this.phone=res.data.phone;
              this.imge=res.data.shimag;
              this.shaddress=res.data.shaddress;
              this.sheng=res.data.ssq.sheng
              this.shi=res.data.ssq.shi
              this.qq=res.data.ssq.qu
              this.open();
              this.fun1();
              this.fun2();
            }).catch()
          },
        update(){
          var formData = new FormData();
          formData.append("id",this.useridd);
          formData.append("username",this.uname);
          formData.append("loginname",this.loginname);
          formData.append("password",this.pwd);
          formData.append("phone",this.phone);
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
            if(this.qq==this.district[a].id){
              this.shaddress+=this.district[a].name;
            }
          }
          this.shaddress+=this.xxaddr
           this.ssqid=this.sheng+"-"+this.shi+"-"+this.qq;
          console.log(this.ssqid)
          console.log(this.shaddress);
          formData.append("shaddress",this.shaddress);
          formData.append("ssqid",this.ssqid);
          this.$axios({
            method: "post",
            url: "updatesh.action",
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
        //等vue中 data和事件 函数都初始化了 调用该方法
        //1.给data中的roles数组赋值
        //2.怎么样异步实现获取数据
        this.selsid();

      }

    }

</script>

  <style scoped>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
