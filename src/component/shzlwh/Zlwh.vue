<template>
   <div>
     用户名: <el-input type="text" v-model="uname"></el-input><br>
     登录名: <el-input type="text" v-model="loginname"></el-input><br>
     密码: <el-input type="text" v-model="pwd"></el-input><br>
     手机号:<el-input type="text" v-model="phone"></el-input><br>
     余额: <el-input type="text" v-model="umoney"></el-input><br>
     头像:<el-input type="text" v-model="img"></el-input><br>
     <span>省</span>
     <el-select @change="fun1" v-model="sheng" placeholder="请选择" >
       <el-option v-for="p in provice"  :value="p.id" :label="p.name"></el-option>
     </el-select>
     <span>市</span>
     <el-select @change="fun2" v-model="shi"  placeholder="请选择">
       <el-option  v-for="c in ctiy" :value="c.id" :label="c.name"></el-option>
     </el-select>
     <span>区</span>
     <el-select  placeholder="请选择" v-model="qu" >

       <el-option  v-for="d in district" :value="d.id" :label="d.name"></el-option>
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
          uname: "",
          loginname: "",
          pwd: "",
          phone: "",
          umoney: "",
          img: "",
          shaddress: "",
          xxaddr:"",
          shi:"",
          sheng:"",
          qu:"",
          provice:[],
          ctiy:[],
          district:[]
        }
      },
      methods:{

          selsid(){
            var params=new URLSearchParams()
            params.append("id",2);
            this.$axios.post("selsid.action",params).then(res=>{
            this.uname=res.data.username;
              this.loginname=res.data.loginname;
              this.pwd=res.data.password;
              this.phone=res.data.phone;
              this.umoney=res.data.umoney;
              this.img=res.data.img;
              this.shaddress=res.data.shaddress;
            }).catch()
          },
        update(){
          var params=new URLSearchParams();
          params.append("id",2);
          params.append("username",this.uname);
          params.append("loginname",this.loginname);
          params.append("password",this.pwd);
          params.append("phone",this.phone);
          params.append("umoney",this.umoney);
          params.append("img",this.img);
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
          console.log(this.shaddress);
          params.append("shaddress",this.shaddress);
          this.$axios.post("updatesh.action",params).then(res=>{
            alert(res.data.msg)
          }).catch()
        },
        fun1(){
          var _this = this;
          var params=new URLSearchParams();
          params.append("pid",this.sheng)
          this.$axios.post("queryChinaByPid.action",params).then(
            function (val){
              _this.ctiy=val.data
            }
          ).catch(

          )
        },
        fun2(){
          var _this = this;
          var params=new URLSearchParams();
          params.append("pid",this.shi)
          this.$axios.post("queryChinaByshi.action",params).then(
            function (val){
              _this.district=val.data
            }
          ).catch(

          )
        }
        },
      created(){
        //等vue中 data和事件 函数都初始化了 调用该方法
        //1.给data中的roles数组赋值
        //2.怎么样异步实现获取数据
        this.selsid();
        var _this=this;
        var params=new URLSearchParams();
        params.append("pid",0);
        this.$axios.post("queryAllChina.action",params).then(
          function (val){

              _this.provice=val.data;

          }
        ).catch(
          function (err){
            alert(err)
          }
        )
      }

    }

</script>

<style scoped>

</style>
