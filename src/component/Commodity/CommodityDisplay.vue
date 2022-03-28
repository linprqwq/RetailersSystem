<template>
<button @click="querysp()">按钮</button>
</template>

<script>
export default {
  name: "CommodityDisplay",

  data(){
    return{

    }
  },
  methods:{
    querysp(){
      var params = new URLSearchParams();
      params.append("id",1)
      this.$axios.post("queryspid.action",params).then(res=>{
          alert(res.data)
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
