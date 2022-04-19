<template>
 <!-- 商品分类-->
  <div>

    商品分类:<el-select v-model="ShopTypeInfos" multiple placeholder="请选择商品分类">
        <el-option v-for="item in AllshopTypeInfos"
        :key="item.id"
        :label="item.name"
        :value="item.id">

        </el-option>
    </el-select>
  </div>

</template>

<script>
    export default {
        name: "goods_category",
          data(){
          return{
            AllshopTypeInfos:[],
            ShopTypeInfos:[]

          }
      },
      methods:{

        getAllshopTypeInfos(ShopTypeInfos){

          //检查父组件是否传来数据
          if(ShopTypeInfos!=undefined){
            //传来展示数据，存入展示数据内
            this.ShopTypeInfos=ShopTypeInfos;
            //将展示数据设置为锁定项
            this.lockData=ShopTypeInfos;
          }

                  //调用异步 去查询没有被删除的商品的分类
                  this.$axios.get("shopinfo.action/queryallshoptype.action",null).
                  then((respone=>{ //异步调用后成功执行
                  //将查询到的数据放入数组中去
                    console.log(respone.data)
                    this.AllshopTypeInfos=respone.data;

                  })).catch(function (error) {
                    alert(error);
                  });
                }
      },
          created() {
              this.getAllshopTypeInfos();
          }
    }
</script>

<style scoped>

</style>
