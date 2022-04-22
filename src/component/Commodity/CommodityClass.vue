<template>
<div>
  <top></top>
  <div id="select">
    <h2>所有商品</h2>
    <el-input type="text" v-model="sp"  clearable placeholder="X一下"></el-input>
    <el-button plain round class="ebt" @click="querysp">确定</el-button>
  </div>
      <div id="memunav">
       <div class="menudiv" v-for="cs in classarr" @click="dianji(cs.id)">
         <a href="#"><img :src="'/src/'+cs.prozimg" alt="" alt="图片出错" height="196px" width="233px"></a>
         <p>{{cs.proname}}</p>
         <span>{{cs.prosubtitle}}</span>
         <div class="nei1">
           <p>{{cs.prosprice}}元</p>
         </div>
       </div>
      </div>
<!--  <el-pagination-->
<!--    @size-change="handleSizeChange"-->
<!--    @current-change="handleCurrentChange"-->
<!--    :current-page="pageno"-->
<!--    :page-sizes="[5, 10, 15, 20]"-->
<!--    :page-size="pagesize"-->
<!--    layout="total, sizes, prev, pager, next, jumper"-->
<!--    :total="total">-->
<!--  </el-pagination>-->
  <div v-if="tips!=''" class="tips">
    <span>{{tips}}</span>
  </div>
  <span id="di">已经到底了！</span>
</div>
</template>

<script>
import IndexTop from "../User/IndexTop";
import {showLoading,hideLoading} from "../../config/Loading";

export default {
  name: "CommodityClass",
  data(){
    return{
      classid:null,
      classarr:[],
      sp:"",
      tips:'',
      pageno: 1,   //页码
      pagesize: 5,   //页size
      total: 1,   //查询到的总记录数量
    }
  },
  components:{
    top:IndexTop
  },
  methods:{
    querysp(){
      showLoading()
      var params=new URLSearchParams()
      params.append("shopType",this.classid)
      params.append("proname",this.sp)
      this.$axios.post("queryIdIsClass.action",params).then(val=>{
        this.classarr=val.data.records;
        hideLoading()
        if(this.classarr.length==0){
          var ts="暂时没有这个商品捏 可以反馈给我们 尽快上你需要的商品"
          this.tips=ts
        }
      }).catch(val=>{
        console.log(val.data)
      })
    },
    dianji(id){
      this.$router.push({
        path: '/CommodityDisplay',
        query: {
          comid: id
        }
      })
    },
    // //分页控件
    // handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
    //   this.pagesize = val;
    //   this.querysp()
    // },
    // //页码发生改变
    // handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
    //   this.pageno = val;
    //   this.querysp()
    //
    // }
  },
  created() {
    var _this=this;
   _this.classid=_this.$route.query.csid
    this.$nextTick(yy=>{
      showLoading()
      var params=new URLSearchParams()
      params.append("shopType",_this.classid)
      this.$axios.post("queryIdIsClass.action",params).then(val=>{
        _this.classarr=val.data.records;
        if(this.classarr.length==0){
          var ts="这个分类暂时没有商品捏 可以反馈给我们 尽快上你需要的商品"
          this.tips=ts
        }
        hideLoading()
      }).catch(val=>{
        console.log(val.data)
      })
    })
    console.log(_this.classid)
  }
}
</script>

<style scoped>
#memunav{

  height: 1200px;
  width: 1300px;
  position: relative;
  left: 227px;
  margin-top: 20px;

}
#memunav .menudiv{
  text-align: center;
  background-color: transparent;
  float: left;
  width: 233px;
  height: 298px;
  margin-bottom: 100px;
  margin-right: 80px;
 position: relative;
  left: 5%;
  /*display: grid;*/
  /*grid-gap: 1rem;*/
  /*grid-template-columns: repeat(auto-fit,minmax(150px,1fr));*/
}
#select{
  position: relative;
  left: 227px;
  width: 500px;
}
.ebt{
  position: relative;
  left: 510px;
  top: -40px;
}
#memunav .menudiv p{
  text-align: center;
   font-size: 14px;
}
#memunav .menudiv span{
  font-size: 10px;
  color: #BDBDBD;
}
#memunav .menudiv .nei1 {
  display: inline-block;
  color: orange;
  font-size: 14px;

}
.menudiv:hover{
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 3px 50px;
  transition-duration: 0.2s
}
.tips{
  z-index: 100;
  position: relative;
  top: -1000px;
  left: 300px;
  width: 1000px;
}
.tips span{
  color: orange;
  font-size: 50px;
}
#di{
  color: #9f9f9f;
  font-size: 14px;
  position: relative;
  left: 50%;
}
</style>
