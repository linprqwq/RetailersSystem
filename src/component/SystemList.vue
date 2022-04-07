<template>
  <div id="app" class="homeWrap">
    <el-container style="height:100%">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          菜单
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="black"
            active-text-color="#ffd04b">
            <el-submenu :index="menu.id+''" v-for="menu in menudata">
              <template slot="title">
                <i :class="menu.iconUrl"></i>
                <span>{{menu.name}}</span>  <!--一级-->
              </template>
              <el-menu-item-group>
                <div v-for="cmenu in menu.childMenu">
                  <!--二级  下面还有三级-->
                  <el-submenu :index="cmenu.id+''" v-if="cmenu.childMenu.length>0">
                    <template slot="title">
                      <i :class="cmenu.iconUrl"></i>{{cmenu.name}}
                    </template>
                    <el-menu-item-group>
                      <!--  三级 循环二下的childMenu-->
                      <el-menu-item :index="cmenu3.id+''"   v-for="cmenu3 in cmenu.childMenu"
                                    @click="addTab(cmenu3.name,cmenu3.linkUrl)">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i :class="cmenu.iconUrl"></i>{{cmenu3.name}}
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <!--二级  结束了-->
                  <el-menu-item :index="cmenu.id+''"  v-else
                                @click="addTab(cmenu.name,cmenu.linkUrl)">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i :class="cmenu.iconUrl"></i>{{cmenu.name}}
                  </el-menu-item>

                </div>


              </el-menu-item-group>

            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <!--  选项卡控件-->

          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <!-- {{item.content}}-->
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>

        </el-main>
      </el-container>
    </el-container>
  </div>




</template>

<script>
  import Welcome from "./Welcome";
  import EmpView from "./sysindex/sysguanli/employee/EmpView";
  import AuthcView from "./sysindex/sysguanli/authcs/AuthcView";
  import UserView from "./User/UserView";
    export default {
        name: "SystemList",
      components:{
        Welcome,EmpView,AuthcView,UserView
      },
      data(){
        return {
          menudata:[],
          editableTabsValue:"1",
          editableTabs: [{
            title: '首页',
            name: '1',
            content: 'Welcome'
          }],
          tabIndex: 1
        }
      },
      methods:{
        addTab(targetName,vuename) {
          //数组找有没有
          var obj= this.editableTabs.find(item=>item.title == targetName);
          if(obj!=null){
            this.editableTabsValue=obj.name;  //选中
            return;
          }

          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: targetName,
            name: newTabName,
            content: vuename
          });
          this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        } ,
        getdata() {   //获取数据的方法

          this.$axios.post("querymenuspidandrid.action")
            .then(response => {
              this.menudata = response.data;//获取所有要展示的数据

            }).catch();
        }
      },
      created(){   //钩子函数   对象创建好 后执行此方法
        this.getdata()
      }
    }
</script>

<style scoped>
  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
