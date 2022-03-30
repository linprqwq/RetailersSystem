<template>
<div>
  <el-tree
    :data="authcdata"
    show-checkbox
    node-key="id"
    accordion
    :default-expanded-keys="[1, 1]"
    :default-checked-keys="[0]"
    :props="defaultProps">
  </el-tree>
</div>
</template>

<script>
    export default {
        name: "AuthcView",
      data(){
          return{
            // data: [{
            //   id: 1,
            //   label: '系统管理',
            //   children: [{
            //     id: 2,
            //     label: '员工管理',
            //     children: [{
            //       id: 3,
            //       label: '员工列表'
            //     }]
            //   },
            //     {
            //       id: 4,
            //       label: '角色管理',
            //       children: [{
            //         id: 5,
            //         label: '角色列表'
            //       }]
            //     },
            //     {
            //       id: 6,
            //       label: '授权管理',
            //       children: [{
            //         id: 7,
            //         label: '授权列表'
            //       }]
            //     }]
            // }]
            // ,
            authcdata:[],
            defaultProps: {
              children: 'childMenu',
              label: 'name'
            }
          }
      },
      methods:{
          getmenudata(){
            this.$axios.get("querymenuforleft.action/"+1)
              .then(response => {
                // this.data.push(response.data)
                console.log(response.data)
                this.authcdata=response.data;
              }).catch();
          }
      },
      created() {
        this.getmenudata()
      }
    }
</script>

<style scoped>

</style>
