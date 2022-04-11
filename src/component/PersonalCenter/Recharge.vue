<template>
  <el-card class="box-card">
    <ul class="msg-box">
      <li>
        <h4>我要充值</h4>
      </li>
      <li>
        <h4 style="margin-bottom: 15px">充值金额</h4>
        <el-radio-group v-model="amountVal" @change="amountChange">
          <el-radio border :label="'' + 50">充值50</el-radio>
          <el-radio border :label="'' + 100">充值100</el-radio>
          <el-radio border :label="'' + 200">充值200</el-radio>
          <el-radio border :label="'' + 300">充值300</el-radio>
          <el-radio border :label="'' + 500">充值500</el-radio>
          <el-radio border :label="''">自定义</el-radio>
        </el-radio-group>
      </li>

      <li>
        <h4 style="margin-bottom: 15px">充值方式</h4>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio border :label="'' + 0">微信</el-radio>
          <el-radio border :label="'' + 1">支付宝</el-radio>
        </el-radio-group>
      </li>

      <li>
        <h4 style="margin-bottom: 15px">充值金额</h4>
        <!-- <img src="{:url('qrcode',['text'=>$text])}" /> -->
        <el-input
          :disabled="disabled"
          clearable
          v-model="rechargeParams.umoney"
          placeholder="请输入金额"
          style="width: 150px"
        ></el-input>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="surePay">确认支付</el-button>
    </div>
  </el-card>
</template>

<script>
import qs from 'qs'
export default {
  name: "Recharge",
  data() {
    return {
      amountVal: "",
      disabled: false,
      //充值参数
      rechargeParams: {
        id:sessionStorage.getItem('id'),
        umoney: "", //金额
        paymentType: "0", //支付方式[0:微信,1:支付宝,2:余额,3:活动]
        // transType: "0", //交易类型[0:充值,1:消费]
      },
      code: "",
    };
  },

  methods: {
    //充值金额
    amountChange(val) {
      this.rechargeParams.umoney = val;
      if (val == "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    //支付方式

    paymentTypeChange(val) {
      this.rechargeParams.paymentType = val;
    },

    //确认支付

    surePay() {
      if (this.rechargeParams.umoney == "") {
        this.$message.warning("请输入金额");
        return;
      }
      // this.$router.push({path: '/code'});

      this.$axios.post("usreinforecharge.action", qs.stringify(this.rechargeParams)).then((res) => {
        this.$message.success(res.data.msg);
      });
    },




  },
  // },
};
</script>

<style scoped>
/* 信息列表样式 */
.msg-box > li {
  list-style: none;
  border-bottom: 1px solid #c5c5c5;
  padding: 20px 10px;
}
</style>
