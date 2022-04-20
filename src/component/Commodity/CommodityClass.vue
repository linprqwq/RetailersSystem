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
    classid:null
    return{

    }
  },
  components:{
    top:IndexTop
  },
  created() {
    var _this=this;
    _this.classid=this.$router.query.classidd
    console.log(_this.classid)
  }
}
</script>

<style scoped>

</style>
