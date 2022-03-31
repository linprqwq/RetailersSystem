<template>
  <div id="div1">
    <span>还没登录哦 请登录以后再进行操作</span><br>
    <img :src="require('../../image/请登录.svg')" alt="">
  </div>
</template>

<script>
export default {
  name: "ShoppingFalst"
}
</script>

<style scoped>
#div1{
  position: relative;
  top: 70px;
  left:30%;
  width: 300px;
}
img{
  height: 500px;
  width: 500px;
}
span{
  position: relative;
  left: 100px;
  font-size: 19px;
  font-family: "微软雅黑 Light";
  color: #b61d1d;
}
</style>
