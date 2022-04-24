<template>
  <div>
    <h3>寻找附近有无自提点</h3>
  <el-select  v-model="sheng" @change="fun1" placeholder="----请选择---">
    <el-option  v-for="p in provice" :value="p.id" :label="p.name" @click.native="queryshsheng(shenglabel=p.name)">{{p.name}}</el-option>
  </el-select>
  <el-select v-model="shi"  @change="fun2" placeholder="----请选择---">
    <el-option  v-for="c in ctiy" :value="c.id" :label="c.name" @click.native="queryshshi(shilabel=c.name)">{{c.name}}</el-option>
  </el-select>
  <el-select v-model="qq" placeholder="----请选择---">
    <el-option v-for="d in district" :value="d.id" :label="d.name" @click.native="queryshqu(qqlabel=d.name)">{{d.name}}</el-option>
  </el-select>
    <br>
  <el-radio-group v-model="redio">
    <el-radio-button   v-for="po in pos"  style="margin-top: 20px"   :label="po.shaddress"></el-radio-button> <!--<img v-for="po in pos" :src="'/src/'+po.shimag" style="width: 50px;height: 50px" alt="商户头像未上传">-->
  </el-radio-group>
    <span v-show="pos=='' ">你选的地方暂时没有商户入驻请换个地方吧</span>
  </div>
</template>

<script>
export default {
  name: "Addrsh",
  data(){
    return{
      provice:[],
      ctiy:[],
      district:[],
      sheng:"",
      shi:"",
      qq:"",
      redio:"",
      pos:null
    }
  },
  methods:{
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
    //寻找商户地址按省
    queryshsheng(){
      var _this=this
      var params=new URLSearchParams()
      params.append("shaddress",_this.shenglabel)
      this.$axios.post("querylikesh.action",params).then(val=>{
          _this.pos=val.data
          _this.pos.forEach(item=>{
            console.log(item.shaddress)
          })
        }
      ).catch()
    },
    //寻找商户地址按市
    queryshshi(){
      var _this=this
      var params=new URLSearchParams()
      if(_this.shenglabel==null){
        _this.shenglabel=null
      }
      if(_this.shilabel==null){
        _this.shilabel=null
      }
      var stqwq=[_this.shenglabel,_this.shilabel]
      var str=stqwq.join("")
      params.append("shaddress",str)
      // params.append("shaddress",_this.shilabel)
      this.$axios.post("querylikesh.action",params).then(val=>{
          _this.pos=val.data
          _this.pos.forEach(item=>{
            console.log(item.shaddress)
          })
        }
      ).catch()
    },
    //寻找商户地址按区
    queryshqu(){
      var _this=this
      var params=new URLSearchParams()
      if(_this.shenglabel==null){
        _this.shenglabel=null
      }
      if(_this.shilabel==null){
        _this.shilabel=null
      }
      if(_this.qqlabel==null){
        _this.qqlabel==null
      }
      var stqwq=[_this.shenglabel,_this.shilabel,_this.qqlabel]
      var str=stqwq.join("")
      params.append("shaddress",str)
      // params.append("shaddress",_this.shilabel)
      this.$axios.post("querylikesh.action",params).then(val=>{
          _this.pos=val.data
          _this.pos.forEach(item=>{
            console.log(item.shaddress+"204行")
          })
        }
      ).catch()
    },
  },
  created() {
    var _this=this
    this.$axios.post("queryAllSheng.action").then(val=>{
      _this.provice=val.data;
    }).catch()
  }
}
</script>

<style scoped>

</style>
