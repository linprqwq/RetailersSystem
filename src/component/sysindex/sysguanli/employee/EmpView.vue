<template>
  <div>
    姓名：<el-input type="text" v-model="name" style="width: 50%"></el-input>
    <el-button type="danger"  @click="queryemployeelike">查询</el-button>
    <el-button type="success" @click="handleAdd()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empLoginname"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empPassword"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="empPhone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="empMoney"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="empAddress"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="empImg"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.empImg" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini" type="success"
            @click="openeditwin(scope.row.id)">编辑</el-button>
          <!--<el-button
            size="mini"
            @click="handleAdd(scope.row)"
          >添加</el-button>-->
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="用户"
      :visible.sync="editdialogVisible"
      width="30%">
      <!-- 动态组件   指定添加vue页面在模态框显示-->
      <component ref="empsys" is="EmpSys"></component>

      <el-button type="primary" @click="editgood">确 定</el-button>
      <el-button @click="editdialogVisible = false">取 消</el-button>

    </el-dialog>

    <!-- 分页控件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

   <!--&lt;!&ndash; &lt;!&ndash; 添加模态框&ndash;&gt;&ndash;&gt;-->
    <el-dialog title="用户添加" :visible.sync="editmodalVisible02">
      <el-form  :model="addform" status-icon :rules="rules" ref="addform" label-width="100px" class="demo-addform">
        <el-form-item label="用户名" prop="empName" :label-width="formLabelWidth">
          <el-input v-model="addform.empName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="empLoginname" :label-width="formLabelWidth">
          <el-input v-model="addform.empLoginname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="empPassword" :label-width="formLabelWidth">
          <el-input v-model="addform.empPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="empPassword1" :label-width="formLabelWidth">
          <el-input v-model="addform.empPassword1" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="empPhone" :label-width="formLabelWidth">
          <el-input v-model="addform.empPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="empMoney" :label-width="formLabelWidth">
          <el-input v-model="addform.empMoney" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="empAddress" :label-width="formLabelWidth">
          <el-input v-model="addform.empAddress" autocomplete="off"></el-input>
        </el-form-item>
       <template>
          角色:<el-select multiple  v-model="roid" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </template><br><br>
        <el-form-item label="头像">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :before-remove="beforeRemove"
            :limit="1"
            :on-change="changeFile"
            :on-exceed="handleExceed"
            list-type="picture-card"
            :auto-upload="false"
            multiple>
            <el-button slot="trigger" size="small" type="primary">选取头像</el-button>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editmodalVisible02 = false">取 消</el-button>
        <el-button type="primary" @click="add('addform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import EmpSys from "./EmpSys";
    export default {
        name: "EmpView",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {

            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.addform.empPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        var vallidateempname=(rule, value, callback)=>{
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }else{
            callback();
          }
        };
        var vallidateempLoginname=(rule, value, callback)=>{
          if (!value) {
            return callback(new Error('登录名不能为空'));
          }else{
            callback();
          };


        };
        var validateempPhone=(rule,value,callback)=>{
          if (!value) {
            return callback(new Error('手机号码不能为为空'));
          }else{
            callback();
          };
        };
        var validateempMoney=(rule,value,callback)=>{
          if (!value) {
            return callback(new Error('金额不能为为空'));
          }else {
            callback();
          }
        };
        var validateempAddress=(rule,value,callback)=> {
          if (!value) {
            return callback(new Error('地址不能为为空'));
          } else {
            callback();
          }
        };
        return {
          addform:{
            empName:"",empLoginname:"",empPassword:"",empPassword1:"",empPhone:"",empMoney:"",empAddress:"",empImg:"",


          },//添加页面数据对象
          rules: {
            empPassword: [
              { validator: validatePass, trigger: 'blur' }
            ],
            empPassword1: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            empName:[
              { validator: vallidateempname, trigger: 'blur' }
            ],
            empLoginname:[
              { validator: vallidateempLoginname, trigger: 'blur' }
            ],
            empPhone:[
              {validator: validateempPhone, trigger: 'blur'}
            ],
            empMoney:[
              {validator: validateempMoney, trigger: 'blur'}
            ],
            empAddress:[
              {validator: validateempAddress, trigger: 'blur'}
            ]
          },

          roleid:{},
          name:'',
          options:[],//用来存放角色
          formLabelWidth:'100px',
          roid:[],
          tableData:[],
          pageno:1,   //页码
          pagesize:5,   //页size
          total:1,   //查询到的总记录数量
          editmodalVisible:false,  //编辑页面 显示标志
          editmodalVisible02:false,
          editform:{},   //编辑页面数据 对象
         /* addform: {}, //添加页面保存的数据，提交用*/

          path:"http://127.0.0.1:9090/RetailersBackSystem/",
          editdialogVisible:false
        }
      },
      methods:{
        getdata(){   //获取数据的方法
          var params = new URLSearchParams();
          params.append("pageno",this.pageno);
          params.append("pagesize",this.pagesize);
          params.append("empName",this.name)

          this.$axios.get("/queryallsysempd.action",{params:params})
            .then(response=>{
              this.tableData = response.data.records;//获取所有要展示的数据
              this.total = response.data.total; //总记录数量
              this.tableData.forEach( (item)=> {
                item.empImg = this.path+item.empImg;
              })
            }).catch();
        },
        queryemployeelike(){

          this.name = this.name
          this.getdata();
        },
        handleSizeChange(val) { //分页控件  页面size改变 触发  val参数就是选择的条数
          console.log(`每页 ${val} 条`);
          this.pagesize= val;
          this.getdata()
        },
        handleCurrentChange(val) { //页码改变 触发  val  当前准备跳转的页码
          console.log(`当前页: ${val}`);
          this.pageno=val;
          this.getdata()
        },
        handleDelete(id){
         /* alert(id)*/
           this.$axios.post("delesysemployees.action/"+id).then(response=>{
             //刷新
             this.getdata();
           }).catch();


        },
      /*  修改用户*/
        openeditwin(id){
          this.editdialogVisible=true;
          this.$nextTick(item=>{
            this.$refs.empsys.getdataByid(id);
          })
        },
        editgood(){
          //调用异步，进行数据修改
          this.$refs.empsys.submitUpload();
          this.$refs.empsys.fileList=[];
          //关闭模态框
          this.editdialogVisible=false;
        },

       /* 用户添加*/
        handleAdd(row){
         this.$axios.post("queryrolesbyidname.action/").
         then(response=>{
           console.log(response.data)
           this.options = response.data
          }).catch();
          console.log(row)
         this.editmodalVisible02=true;
         this.editform=row;
        },
        add(addform){
          this.$refs[addform].validate((valid) =>{
              if (valid) {
                var formData = new FormData();
                Object.keys(this.addform).forEach(key=>{
                  console.log(key)
                  formData.append(key, this.addform[key])
                })
                formData.append('file',  this.fileList[0].raw)
                this.roid.forEach(item=>{
                  formData.append('rids',  item);
                })
                //将组装好的数据 进行下一步 异步提交
                this.sendFile(formData)
          }else {
              }
          });
        /*  var formData = new FormData();
          Object.keys(this.addform).forEach(key=>{
            console.log(key)
            formData.append(key, this.addform[key])
          })
            formData.append('file',  this.fileList[0].raw)
          this.roid.forEach(item=>{
            formData.append('rids',  item);
          })*/
        /*  //将组装好的数据 进行下一步 异步提交
          this.sendFile(formData)*/


        },
        sendFile(data) {
          //等待效果
          const loading = this.$loading({
            lock: true,
            text: '添加中，请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        /*  //角色异步提交
        this.$axios({
            method: 'post',
            url: 'addroloemp.action',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })*/

          //异步提交
          /*this.$refs[addform].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });*/
        this.$axios({
            method: 'post',
            url: 'addsysemployees.action',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            if (response.data.msg=="添加成功"){
              //结束等待效果
              loading.close()
              //弹出结果消息
              this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
              })


             /* this.$message({

                showClose: true,
                message: '上传成功',
                type: 'success'
              })*/
              this.formReset()// 上传成功清空
              //更新父页面数据
              this.getdata();
              //关闭模态框
              this.editmodalVisible02 = false;
            }
          }).catch(error => {
            console.log(error)
            alert("错误")
            loading.close()
          });
        },

        //每次文件改变选择，都将最新的选择文件 更新到头像数组中
        changeFile(file, fileList) {
          this.fileList = fileList;
        },
        handleExceed(files, fileList) {
          this.$message.warning("只能选一个头像")
        },
        //移除文件 更新头像数组数据
        beforeRemove(file, fileList) {
          if (this.$confirm(`确定移除 ${file.name}？`)) {
            this.img = file;
          }
        },
        formReset() { // 重置
        this.addform = {
            empName:"",
            empLoginname:"",
            empPassword:"",
            empPhone:"",
            empMoney:"",
            empAddress:"",
            empImg:"",
          empPassword1:""
          }
        },
      },
      components:{
        EmpSys
      },
      created(){
          this.getdata()
       /* this.handleAdd()*/
        /*this.sendFile()*/

      }
    }
</script>

<style scoped>

</style>
