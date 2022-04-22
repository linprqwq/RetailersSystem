<template>
  <div >

    <el-form :model="pjsp" :rules="pjrules" ref="pjref">
      <el-form-item label="评价商品" prop="proname">
        <el-input v-model="pjsp.proname" style="width: 200px" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品图" prop="proimage">
        <img :src="'/src/'+pjsp.proimage" style="height: 50px;width: 50px;">
      </el-form-item>
      <el-form-item label="服务评价" prop="value">
        <el-rate
          v-model="pjsp.value"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="商品评价" prop="value1">
        <el-rate
          v-model="pjsp.value1"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="时效评价" prop="value2">
        <el-rate
          v-model="pjsp.value2"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="评价内容" prop="textarea">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="pjsp.textarea"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Pj",
  data(){
    return{
      pjsp:{value:null,value1:null,value2:null,textarea:"",},
      reviews:{},
      pjrules:{
        pjsp:[
          { required: true, message: '请选择退货原因', trigger: 'click' }
        ],
        value:[
          { required: true, message: '服务评价', trigger: 'click' }
        ],
        value1:[
          { required: true, message: '商品评价', trigger: 'click' }
        ],
        value2:[
          { required: true, message: '时效评价', trigger: 'click' }
        ],
        textarea:[
          { required: true, message: '请填写评价内容', trigger: 'blur' }
        ]
      },

    }
  },
  methods:{
    pjgetdata(b){

      this.pjsp = b;
    },
    pjtijiao(pjName){

      this.$refs[pjName].validate((valid) => {
        if (valid) {
//将需要提交的文件，和附带的数据，append  FormData中 然后提交

          var pamram = new URLSearchParams();
          pamram.append("content",this.pjsp.textarea)
          pamram.append("cscore",this.pjsp.value)
          pamram.append("sscore",this.pjsp.value1)
          pamram.append("pscore",this.pjsp.value2)
          pamram.append("orddid",this.pjsp.id);
          pamram.append("cid",this.pjsp.proid);
          pamram.append("uid",sessionStorage.getItem('id'));
          this.$axios.post("orderpj.action",pamram).then(res=>{
            if (res.data.code==0){
              this.$message.error(res.data.msg);
              this.$emit('success',false);
            }else{
              this.$message.success(res.data.msg);
              this.$emit('success',false);
            }
          }).catch()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
