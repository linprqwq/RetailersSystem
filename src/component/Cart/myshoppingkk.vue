<template>
  <div>
    <top></top>
    <div id="app">
      <div class="top">
        <div class="logo">
          <img src="images/logo-mi2.png" alt="">
        </div>
        <span class="myziti">我的购物车</span>

      </div>
      <div class="cart-recomd">
        <div class="cart-dady">
          <div class="cart-ts">
            <img src="src/image/shopping.jpg" alt="">
          </div>
          <div class="cart-ts2">
            <h1>您的购物车还是空的！</h1>
            <div class="cart-btu">
              <button class="a2"><a href="#" @click="$router.push('/')">马上去购物</a></button>
            </div>
          </div>
        </div>
      </div>
      <div class="wenzitiao">
        <div class="wenzitiaoxia">
          <a href="#"><img class="img1" src="images/字1.png" alt="图片出错" width="24px" height="24px">预约维修服务
          </a>
          <a href="#"><img class="img2" src="images/字2.png" alt="图片出错" width="24px" height="24px">7天无理由退货
          </a>
          <a href="#"><img class="img3" src="images/字3.png" alt="图片出错" width="24px" height="24px">15天免费换货
          </a>
          <a href="#"><img class="img4" src="images/字4.png" alt="图片出错" width="24px" height="24px">满69包邮（米粉节特惠） </a>
          <a href="#" class="shebian"><img class="img5" src="images/字5.png" alt="图片出错" width="24px"
                                           height="24px">520余家售后网点
          </a>
        </div>
        <div class="wenzixiaxia">
          <div class="f1">
            <div class="xiada">
              帮助中心
            </div>
            <div class="xiali">
              <ul>
                <li><a href="#">账号管理</a></li>
                <li><a href="#">购物指南</a></li>
                <li><a href="#">订单操作</a></li>
              </ul>
            </div>
          </div>
          <div class="f2">
            <div class="xiada2">
              服务支持
            </div>
            <div class="xiali2">
              <ul>
                <li><a href="#">售后政策</a></li>
                <li><a href="#">自助服务</a></li>
                <li><a href="#">相关下载</a></li>
              </ul>
            </div>
          </div>
          <div class="f3">
            <div class="xiada3">
              线下门店
            </div>
            <div class="xiali3">
              <ul>
                <li><a href="#">小米之家</a></li>
                <li><a href="#">服务网点</a></li>
                <li><a href="#">授权体验店</a></li>
              </ul>
            </div>
          </div>
          <div class="f4">
            <div class="xiada4">
              关于小米
            </div>
            <div class="xiali4">
              <ul>
                <li><a href="#">了解小米</a></li>
                <li><a href="#">加入小米</a></li>
                <li><a href="#">投资者关系</a></li>
                <li><a href="#">企业社会责任</a></li>
                <li><a href="#">廉洁举报</a></li>
              </ul>
            </div>
          </div>
          <div class="f5">
            <div class="xiada5">
              关注我们
            </div>
            <div class="xiali5">
              <ul>
                <li><a href="#">新浪微博</a></li>
                <li><a href="#">官方微信</a></li>
                <li><a href="#">联系我们</a></li>
                <li><a href="#">公益基金会</a></li>
              </ul>
            </div>
          </div>
          <div class="f6">
            <div class="xiada6">
              特色服务
            </div>
            <div class="xiali6">
              <ul>
                <li><a href="#">F码通道</a></li>
                <li><a href="#">礼物码</a></li>
                <li><a href="#">防伪查询</a></li>
              </ul>
            </div>
          </div>
          <div class="f7">
            <div class="xiada7">
              <span>400-100-5678</span>
            </div>
            <div class="xiali7">
              <ul>
                <li>8：00-18：00（仅收市花费）</li>
                <li><a href="#" class="diyia"><img src="images/客服.png" alt="图片出错">人工客服</a></li>
                <li class="diera">关注小米：<a href="#"><img class="dd" src="images/微博.png" alt="图片出错"
                                                        height="22px" width="22px
                                "></a><a href="#"><img class="tt" src="images/微信.png" alt="图片出错" height="22px"
                                                       width="22px"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="zuihouxiaozi">
        <div class="zuihouxiaozitu">
          <img src="images/logo-mi2.png" alt="图片出错" height="70px" width="70px">
        </div>
        <div class="zuihouxiaozizi">
          <a href="#">小米商城 |</a>
          <a href="#">MIUI |</a>
          <a href="#">米家 |</a>
          <a href="#">米聊 |</a>
          <a href="#">多看 |</a>
          <a href="#">游戏 |</a>
          <a href="#">政企服务 |</a>
          <a href="#">小米天猫店 |</a>
          <a href="#">小米集团隐私政策 |</a>
          <a href="#">小米公司儿童信息保护规则 |</a>
          <a href="#">小米商城隐私政策 |</a>
          <a href="#">小米商城用户协议 |</a>
          <a href="#">问题反馈 |</a>
          <a href="#">Select Location</a>
          <br>
          <a href="#">北京互联网法院法律服务工作站 |</a>
          <a href="#">中国消费者协会 |</a>
          <a href="#">北京市消费者协会</a>
          <br>
          <span>@</span>
          <a href="#">mi.com</a>
          <span>京ICP备10046444号</span>
          <a href="#">京公网安备11010802020134号</a>
          <a href="#">京网文[2020]027-042号</a>
          <br>
          <a href="#">（京）网械平台备字（2018）第00005号</a>
          <a href="#">互联网药品信息服务资格证 (京)-非经营性-2014-0090</a>
          <a href="#">营业执照</a>
          <a href="#">医疗器械质量公告</a>
          <br>
          <a href="#">增值电信业务许可证</a>
          <span>网络食品经营备案</span>
          <span>京食药网食备202010048</span>
          <a href="#">食品经营许可证</a>
          <br>
          <span>违法和不良信息举报电话：171-5104-4404</span>
          <a href="#">知识产权侵权投诉</a>
          <span>本网站所列数据，除特殊说明，所有数据均出自我司实验室测试</span>
          <br>
          <a href="#"><img src="images/底图1.png" alt="图片出错"></a>
          <a href="#"><img src="images/底图2.png" alt="图片出错"></a>
          <a href="#"><img src="images/底图3.png" alt="图片出错"></a>
          <a href="#"><img src="images/底图4.png" alt="图片出错"></a>
          <a href="#"><img src="images/底图5.png" alt="图片出错"></a>
        </div>
      </div>
      <div class="dibuzi">
        <p>让全球每个人都能享受到科技带来的美好生活</p>
      </div>
    </div>
  </div>
</template>

<script>
import IndexTop from "../User/IndexTop";
export default {
  name: "myshoppingkk",

  components: {
    top: IndexTop,
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.top {
  background-color: #ffffff;
  width: 100%;
  height: 102px;
  border-bottom: 2px solid #FF7529;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  position: absolute;
  left: 60px;
}

.logo img {
  width: 48px;
  height: 48px;
}

.myziti {
  position: relative;
  left: -450px;
  font-size: 25px;
  font-family: 新宋体;
}

.enter {
  font-size: 5px;
  position: absolute;
  right: 80px;
}

.enter a:link {
  color: #757575;
  text-decoration: none;
}

.enter a:hover {
  color: #FF7529;
}

.cart-recomd {
  background-color: #f5f3f3;
  width: 100%;
  height: 500px;
}

.cart-ts {
  float: left;
  margin: 50px;

}

h1 {
  color: #b0b0b0;
  font-size: 37px;
  margin-bottom: 5px;
}

.cart-dady {
  position: relative;
  top: 40px;
  left: -120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

price {
  color: #b0b0b0;
  margin-top: 10px;
}

.cart-btu {
  position: absolute;
}

.cart-btu button {
  margin-top: 10px;
  margin-right: 10px;
  height: 48px;
  width: 140px;
}

.cart-btu a {
  text-decoration: none;
  color: #ffffff;
}

.cart-btu .a2 a {
  color: #FF6700;
}

.cart-btu .a1 {
  background-color: #FF6700;
  border: 1px solid #FF6700;
}

.cart-btu .a2 {
  border: 1px solid #FF6700;
  background-color: #ffffff;
}

.wenzitiao {
  height: 308px;
  background-color: white;
  margin-top: 30px;
  padding-top: 20px;

}

.wenzitiaoxia {
  width: 1227px;
  height: 40px;
  margin: 0 auto;
  background-color: white;


}

.wenzitiaoxia a {
  display: block;
  float: left;
  color: black;
  text-decoration: none;
  border-right: 1px solid #E0E0E0;
  width: 240px;
  height: 40px;
  margin-left: 2px;
  line-height: 40px;
  text-align: center;
  position: relative;
}

.wenzitiaoxia .shebian {
  border-right: 0px;
}

.wenzitiaoxia a:hover {
  color: rgba(255, 0, 0, 0.336);
}

.wenzitiaoxia a .img1 {
  position: absolute;
  top: 7px;
  left: 46px;
}

.wenzitiaoxia a .img2 {
  position: absolute;
  top: 7px;
  left: 42px;
}

.wenzitiaoxia a .img3 {
  position: absolute;
  top: 7px;
  left: 46px;
}

.wenzitiaoxia a .img4 {
  position: absolute;
  top: 7px;
  left: 4px;
}

.wenzitiaoxia a .img5 {
  position: absolute;
  top: 7px;
  left: 32px;
}

.wenzixiaxia {
  width: 1227px;
  height: 190px;
  background-color: white;
  border-top: 1px solid #E0E0E0;
  margin: 30px auto;
  padding: 20px;
}

li {
  list-style: none;
}

.xiali, .xiali2, .xiali3, .xiali4, .xiali5, .xiali6 {

  height: 100px;
  width: 100px;
  background-color: white;
  text-align: center;
  line-height: 30px;
  font-size: 10px;
  color: #E0E0E0;
  margin-top: 10px;
  margin-left: 30px;
}

.xiali7 {

  height: 100px;
  width: 170px;
  background-color: white;
  text-align: center;
  line-height: 30px;
  font-size: 10px;
  color: #757575;
  margin-top: -5px;
  margin-left: 20px;
  border-left: 1px solid #E0E0E0;
}

.xiada7 {
  margin-left: 20px;
  height: 40px;
  width: 150px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  color: #FF7529;
  font-size: 14px;
  border-left: 1px solid #E0E0E0;

}

.xiada, .xiada2, .xiada3, .xiada4, .xiada5, .xiada6 {
  margin-left: 9px;
  height: 40px;
  width: 150px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.f1, .f2, .f3, .f4, .f5, .f6, .f7 {
  float: left;
}

.wenzixiaxia a {
  text-decoration: none;
}

.wenzixiaxia .f1 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f2 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f3 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f4 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f5 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f6 ul li a:link {
  color: #333333;
}

.wenzixiaxia .f1 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f2 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f3 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f4 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f5 ul li a:hover {
  color: #FF7529;
}

.wenzixiaxia .f6 ul li a:hover {
  color: #FF7529;
}

.xiali7 .diyia {
  border: 1px solid #FF7529;
  display: block;
  width: 100px;
  margin: 0 auto;
  position: relative;
  color: #FF7529;
}

.xiali7 .diyia:hover {
  background-color: #FF7529;
  color: white;
}

.xiali7 .diyia img {
  position: absolute;
  top: 7px;
  left: 8px;
}

.diera {
  width: 150px;
  height: 50px;
  background-color: white;
  position: relative;
}

.diera .dd {
  position: absolute;
  top: 2px;
  right: 25px;
}

.diera .tt {
  position: absolute;
  top: 2px;
  right: 2px;
}

.zuihouxiaozi {
  height: 140px;
  width: 1227px;
  margin: 20px auto;
  background-color: #FAFAFA;
}

.zuihouxiaozitu {
  float: left;
  background-color: #FAFAFA;
  height: 140px;
  width: 70px;
}

.zuihouxiaozizi {
  float: left;
  height: 160px;
  width: 1157px;
  margin-top: 10px;
}

.zuihouxiaozizi a {
  font-size: 10px;
  color: #757575;
  text-decoration: none;
}

.zuihouxiaozizi a:hover {
  color: #FF6A00;
}

.zuihouxiaozizi span {
  font-size: 10px;
  color: #757575;
}

.dibuzi {
  margin-top: 70px;
  height: 50px;
}

.dibuzi p {
  text-align: center;
  font-size: 16px;
  color: #CBCBCB;
  font-weight: 200;
}

.xiali7 ul {
  position: relative;
  left: 25px;
}

.xiada7 span {
  position: relative;
  left: 25px;
}

.gt {
  background-color: transparent;
  position: relative;
  top: 230px;
  border: 0px;
  width: 50px;
  font-size: 25px;
}

.lt {
  background-color: transparent;
  float: right;
  position: relative;
  top: -250px;
  border: 0px;
  width: 50px;
  font-size: 25px;
}
</style>
