<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
  import * as echarts from 'echarts';


    export default {
        name: "Shys",
      data(){
          return{
            useridd:sessionStorage.getItem('id'),
          }
      },
      methods:{
        getdata() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
          var option;
          option = {
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                data: [10, 52, 200, 334, 390, 330, 220]
              }
            ]
          };
          myChart.setOption(option);
          var params=new URLSearchParams()
          params.append("uid",this.useridd)
          this.$axios.post("qeruyshys.action",params).then(res=>{


            }
          )
        }
      },
      //注意：我们要在mounted生命周期函数中实例化echarts对象。因为我们要确保dom元素已经挂载到页面中
      mounted() {
        this.getdata();
      }
    }
</script>

<style scoped>

</style>
