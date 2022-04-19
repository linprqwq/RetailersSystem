<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
  import * as echarts from 'echarts';


    export default {
        name: "Shys",

      data(){
          return{
            arr1:[],
            arr2:[],
            useridd:sessionStorage.getItem('id'),

          }
      },
      methods:{
      shys(){
        console.log("2")
        var params=new URLSearchParams();
        params.append("uid",1)
        this.$axios.post("qeruyshys.action",params).then(res=>{

          this.$nextTick(item=>{
            this.arr1.push(res.data[0].mm);
            this.arr2.push(res.data[0].smoney);
          })
          this.getdata();


        }).catch()
      },

        getdata() {
          console.log("1")
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
          var _this =this;
          var option ={
            tooltip: {
              trigger: 'axis',
                axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: _this.arr1,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
              yAxis: [
              {
                type: 'value'
              }
            ],
              series: [
              {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: _this.arr2
              }
            ]
          }
          this.$nextTick(item=>{
            myChart.setOption(option);
          })

        }
      },
      created() {

      },
      //注意：我们要在mounted生命周期函数中实例化echarts对象。因为我们要确保dom元素已经挂载到页面中
      mounted() {
        this.shys()//this.getdata();
      }


    }
</script>

<style scoped>

</style>
