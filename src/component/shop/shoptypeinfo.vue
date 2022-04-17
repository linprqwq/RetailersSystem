<template>
  <div>
    <el-button  class="addbtn" type="warning" @click="openaddwin">添加</el-button>
    <br><br>
    <el-table :data="shoptyps" style="width: 60%" >
      <el-table-column prop="name" label="分类名"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="shops.name"
            size="mini"
            @blur="search"
            placeholer="请输入分类名去查询">
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="eidt(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--  添加页面-->
    <el-dialog
      title="添加商品分类信息"
      :visible.sync="adddialogVisible"
      width="40%"
      :before-close="handleClose">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="addshoptype" is="addshoptype"></component>

      <el-button type="primary" @click="addtype">确 定</el-button>
      <el-button @click="adddialogVisible = false">取 消</el-button>

    </el-dialog>

  <!--编辑对话框-->
    <el-dialog
    title="=编辑"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    >
      <component ref="eitshoptype" is="eitshoptype"></component>
    </el-dialog>

    <!--//分页-->
    <el-pagination
      class="addbtn"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

  import eitshoptype from "./eitshoptype";
  import addshoptype from "./addshoptype";

    export default {
        name: "shoptypeinfo",
      data(){
          return{
            shoptyps:[],
            shops:{
              name:""
            },
            pageno: 1,
            pagesize: 5,
            total: 1,
            dialogVisible:false,
            adddialogVisible:false
        }
      },
      methods:{
          getTypes(){
                var params={}
                params["pageno"]=this.pageno;
                params["pagesize"]=this.pagesize;
                Object.keys(this.shops).forEach(item=>{
                  params[item]=this.shops[item];
                })
            this.$axios.get("shopinfo.action/queryfyshop.action",{params:params})
              .then(res=>{
                  this.shoptyps=res.data.records;
                  this.total=res.data.total;
              }).catch(err=>{
                this.$message.error(err);
            })

          },
        search(){
          this.getTypes();
        },
        openaddwin(){
          this.adddialogVisible=true;
        },
        addtype(){
          this.$refs.addshoptype.submitUpload("addForm");
          this.adddialogVisible=false;
          this.getTypes();
        },
        eidt(id){
            this.dialogVisible=true;
          this.$nextTick(item=>{
          this.$refs.eitshoptype.getdata(id);
          })

        },
        handleClose(done){
          //模态框关闭
          this.$confirm("确认关闭").then((_)=>{
          done();
          }).catch((_)=>{

          });
        },
        //去根据id去删除
        del(id){
     this.$confirm('确认删除该分类吗?','提示',{
      confirmButtonText:'确定',
       showConfirmButton:'取消',
       type:"warning"
     }).then(()=>{
        this.$axios.delete("shopinfo.action/delshopid.action/"+id).
        then(res=>{
            if(res.data.code>0){
              this.$message.success(res.data.msg);
              this.getTypes();
            }else{
              this.$message.error(res.data.msg);
            }
        }).catch(error=>{
          this.$message.error(error);   //去添加错误捕获
       })
     }).catch(error=>{     //去添加错误捕获

     });

        },
        handleSizeChange(val){
            console.log(this.pagesize)
            //每页范围
          this.pagesize=val;
          this.getTypes();

        },
        handleCurrentChange(val){
            //当前页
          console.log(this.pageno);
          this.pageno=val;
          this.getTypes();
        }

      },
      created() {
          this.getTypes();
      },
      components:{
        eitshoptype,
        addshoptype
      }
    }
</script>

<style scoped>

  .addbtn{
    float: left;
  }

</style>
