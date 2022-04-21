<template>
<div>
  <top></top>
</div>
</template>

<script>
import IndexTop from "../User/IndexTop";
export default {
  name: "CommodityClass",
  data(){
    return{
      classid:null,
      classarr:[]
    }
  },
  components:{
    top:IndexTop
  },
  methods:{

  },
  created() {
    var _this=this;
   _this.classid=_this.$route.query.csid
    this.$nextTick(yy=>{
      var params=new URLSearchParams()
      params.append("shoptype",_this.classid)
      this.$axios.post("queryIdIsClass.action",params).then(val=>{
        _this.classarr=val.data
        _this.classarr.forEach(item=>{
          console.log(item)
        })
      }).catch()
    })
    console.log(_this.classid)
  }
}
</script>

<style scoped>

</style>
