<template>
  <div>
    <el-select v-model="opvalue" clearable placeholder="请选择" @change="getmenudata(opvalue)">
      <el-option
        v-for="item in roleoptions"
        :key="item.id"
        :label="item.roleName"
        :value="item.id">
      </el-option>
    </el-select>
    <el-tree ref="mytree"
             :data="authcdata"
             show-checkbox
             node-key="id"
             accordion
             :default-expanded-keys="[1, 1]"
             :default-checked-keys="mids"
             :props="defaultProps">
    </el-tree>
    <el-button type="primary" @click="shoquan">授权</el-button>
  </div>
</template>

<script>
  export default {
    name: "AuthcView",
    data() {
      return {
        roleoptions: [],
        opvalue: '',
        authcdata: [],
        defaultProps: {
          children: 'childMenu',
          label: 'name'
        },
        mids: []  //每次角色改变  ，获取这个角色可以操作的菜单id ，放入该数组
      }
    },
    methods: {
      getmenudata(roleId) {
        this.mids=[]
        if (roleId == undefined) {
          roleId = -1;
          this.$axios.get("querymenuforleft.action/" + roleId)
            .then(response => {
              this.authcdata = response.data;
            }).catch();
          return;
        }
        if (roleId == "") {
          roleId = -1;
          this.$axios.get("querymenuforleft.action/" + roleId)
            .then(response => {
              this.authcdata = response.data;
            }).catch();
          return;
        }
        this.$axios.get("querymenuforleft.action/" + roleId)
          .then(response => {
            //循环一级菜单
            response.data.forEach(item=>{
              //检查是否有子菜单
              if(item.childMenu.length>0){
                //有子菜单，循环二级子菜单
                item.childMenu.forEach(citem=>{
                  //检查是否有子菜单
                  if(citem.childMenu.length>0){
                    //有子菜单，循环三级子菜单
                    citem.childMenu.forEach(ccitem=>{
                      //检查状态是否为选中
                      if(ccitem.ischeck){
                        this.mids.push(ccitem.id);
                      }
                    })
                  }else {
                    //没有子菜单，检查状态是否为选中
                    if(citem.ischeck){
                      this.mids.push(citem.id);
                    }
                  }
                })
              }else {
                //没有子菜单，检查状态是否为选中
                if(item.ischeck){
                  this.mids.push(item.id);
                }
              }
            })
            this.authcdata = response.data;
          }).catch();

      },
      getoptions() {
        this.$axios.get("queryroleoption.action")
          .then(response => {
            this.roleoptions = response.data;
          }).catch();
      },
      shoquan() {
        //授权按钮按下
        //获取下拉框的角色id
        let  rid= this.opvalue;
        //获取树形选中的菜单id//则返回目前被选中的节点所组成的数组
        let menuId="";
        this.$refs.mytree.getCheckedNodes().forEach(item=>{
          menuId+=item.id+",";
        })
        var params = new URLSearchParams();
        params.append("menuId", menuId);
        params.append("roleId", rid);
        this.$axios.post("setauthc.action",params)
          .then(response => {
            if(response.data==true){
              alert("授权成功")
            }else{
              alert("授权失败")
            }
          }).catch();
        //axios 传送给后端


      }
    },
    created() {
      this.getmenudata();
      this.getoptions();
    }
  }
</script>

<style scoped>

</style>
