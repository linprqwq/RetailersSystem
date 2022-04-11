<template>
  <div>
    <top></top>
    <div class="bj1">
      <div class="topd">
        <div class="tu">
          <a href="#"><img :src="require('../image/logo-mi2.png')" alt="图片出错"></a>
        </div>
        <div class="topdzh">
          <a href="#shuiguo" id="xm">水果</a>
          <a href="#haixiang" id="hm">海鲜</a>
          <a href="#roulei" id="ds">肉类</a>
          <a href="#" id="bjbb">冷饮</a>
          <a href="#" id="jd">速食</a>
          <a href="#" id="lyq">蔬菜</a>
          <a href="#">选购</a>
          <a href="#">服务</a>
          <a href="#">社区</a>
        </div>
        <!--      //搜索-->
      </div>
      <div class="tope">
        <div class="zuozi">
          <a href="#" class="top-left1">手机 电话卡</a>
          <a href="#" class="top-left1">电视 盒子</a>
          <a href="#" class="top-left2">笔记本 显示器</a>
          <a href="#" class="top-left3">家电 插线板</a>
          <a href="#" class="top-left4">出行 穿戴</a>
          <a href="#">智能 路由器</a>
          <a href="#">电源 配件</a>
          <a href="#">健康 儿童</a>
          <a href="#">耳机 音响</a>
          <a href="#">生活 箱包</a>
        </div>
        <div class="youtu">
          <div class="qwq">
            <el-carousel height="460px">
              <el-carousel-item v-for="item in carouseData">
                <img class="small" :src="item.url ">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="zhongxia">
        <div class="zhongxiazuo">
          <div class="quanjin">
            <a href="#">
              <div>
                <img :src="require('../image/小1.png')" alt="图片出错">
                <p>兴盛秒杀</p>
              </div>
            </a>
            <a href="#">
              <div>
                <img :src="require('../image/小2.png')" alt="图片出错">
                <p>企业团购</p>
              </div>
            </a>
            <a href="#">
              <div>
                <img :src="require('../image/小3.png')" alt="图片出错">
                <p>绿色通道</p>
              </div>
            </a>
            <a href="#">
              <div>
                <img :src="require('../image/小4.png')" alt="图片出错">
                <p>兴盛粉</p>
              </div>
            </a>
            <a href="#">
              <div>
                <img :src="require('../image/小5.png')" alt="图片出错">
                <p>无理由退换</p>
              </div>
            </a>
            <a href="#">
              <div>
                <img :src="require('../image/小6.png')" alt="图片出错">
                <p>账号充值</p>
              </div>
            </a>
          </div>
        </div>
        <div class="zhongxiayou">
          <div class="xia1">
            <a href="#"><img :src="require('../image/广告3.jpg')" alt="图片出错" height="169px" width="316px"></a>

          </div>
          <div class="xia2">
            <a href=""><img :src="require('../image/时令生鲜.jpg')" alt="图片出错" height="169px" width="316px"></a>

          </div>
          <div class="xia3">
            <a href=""><img :src="require('../image/潮流肉蛋.jpg')" alt="图片出错" height="169px" width="316px"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="bj2">
      <div class="xiaxia" id="shuiguo">
        <div class="xiazi">
          <p>水果</p>
        </div>
        <div class="xiatu">
          <div class="xiatu1">
            <a href="#"><img :src="require('../image/商品左边背景图2.png')" alt="图片出错" height="298px" width="233px"></a>
          </div>
          <div class="xiatu2" @click="$router.push('/CommodityDisplay')">
            <a href="#"><img :src="require('../image/百香果1.jpg')"  alt="图片出错" height="196px" width="233px"></a>
            <p>小米全面屏电视65英寸 E65X</p>
            <span>全面屏设计</span>
            <div class="nei1">
              <p>2888元</p>
              <span>3299元</span>
            </div>
          </div>
          <div class="xiatu3">
            <a href="#"><img :src="require('../image/石榴1.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>全面屏电视 E43K</p>
            <span>全面屏设计，海量内容</span>
            <div class="nei2">
              <p>1288元</p>
              <span>1599元</span>
            </div>
          </div>
          <div class="xiatu4">
            <a href="#"><img :src="require('../image/芒果1.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>小米电视4A 70英寸</p>
            <span>大屏更享受</span>
            <div class="nei3">
              <p>3388元</p>
              <span>3999元</span>
            </div>
          </div>
          <div class="xiatu5">
            <a href="#"><img :src="require('../image/荔枝11.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>米家互联网对开门冰箱 540L</p>
            <span>重磅新品福利特惠</span>
            <div class="nei4">
              <p>2888元</p>
              <span>3699元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ditu">
        <a href="#"><img :src="require('../image/底图.png')" alt="图片出错" width="1227px"></a>
      </div>
      <div class="xiaxia" id="haixiang">
        <div class="xiazi">
          <p>海鲜</p>
        </div>
        <div class="xiatu">
          <div class="xiatu1">
            <a href="#"><img :src="require('../image/商品左边背景图3.png')" alt="图片出错" height="298px" width="233px"></a>
          </div>
          <div class="xiatu2">
            <a href="#"><img :src="require('../image/火龙果1.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p>Note 10 Pro</p>
            <span>天玑1100年度旗舰芯，VC液冷散热</span>
            <div class="nei1">
              <p>1699元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu3">
            <a href="#"><img :src="require('../image/猕猴桃27.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p> Redmi Note 10 5G</p>
            <span>5G小金刚，旗舰长续航</span>
            <div class="nei2">
              <p>1099元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu4">
            <a href="#"><img :src="require('../image/蟠桃1.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p>小米MIX FOLD</p>
            <span>大屏更享受</span>
            <div class="nei3">
              <p>9999元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu5">
            <a href="#"><img :src="require('../image/血橙1.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p>小米11 Ultra</p>
            <span>1/1.12''GN2｜2K四微曲屏</span>
            <div class="nei4">
              <p>5999元起</p>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="xiaxia">
        <div class="xiatu">
          <div class="xiatu1">
            <a href="#"><img :src="require('../image/商品左边背景图3.png')" alt="图片出错" height="298px" width="233px"></a>
          </div>
          <div class="xiatu2">
            <a href="#"><img :src="require('../image/西瓜2.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p> 小米11 Pro</p>
            <span>1/1.12''GN2｜骁龙888</span>
            <div class="nei1">
              <p>4999元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu3">
            <a href="#"><img :src="require('../image/车厘子6.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p> Redmi Note 10 5G</p>
            <span>5G小金刚，旗舰长续航</span>
            <div class="nei2">
              <p>2299元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu4">
            <a href="#"><img :src="require('../image/释迦果1.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p>K40 游戏增强版</p>
            <span>轻薄电竞设计</span>
            <div class="nei3">
              <p>1999元起</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu5">
            <a href="#"><img :src="require('../image/青梅1.jpg')" alt="图片出错" height="160px" width="160px"></a>
            <p>小米11 Ultra</p>
            <span>1/1.12''GN2｜2K四微曲屏</span>
            <div class="nei4">
              <p>3999元</p>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="ditu2">
        <a href="#"><img :src="require('../image/mensuo2.jpg')" alt="图片出错" width="1227px"></a>
      </div>
      <div class="xiaxia" id="roulei">
        <div class="xiazi">
          <p>肉类</p>
        </div>
        <div class="xiatu">
          <div class="xiatu1">
            <a href="#"><img :src="require('../image/商品左边背景图1.png')" alt="图片出错" height="298px" width="233px"></a>
          </div>
          <div class="xiatu2">
            <a href="#"><img :src="require('../image/橘子.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>小米真无线蓝牙耳机Air 2 Pro</p>
            <span> 主动降噪/持久续航/无线充</span>
            <div class="nei1">
              <p>649元</p>
              <span>699元</span>
            </div>
          </div>
          <div class="xiatu3">
            <a href="#"><img :src="require('../image/干杏2.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p> 高速无线充套装</p>
            <span>快速无线闪充，Qi充电标准</span>
            <div class="nei2">
              <p>149元</p>
              <span></span>
            </div>
          </div>
          <div class="xiatu4">
            <a href="#"><img :src="require('../image/哈密瓜18.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>小米真无线蓝牙耳机Air 2s</p>
            <span>全面升级，智慧真无线</span>
            <div class="nei3">
              <p>359元</p>
              <span>399元</span>
            </div>
          </div>
          <div class="xiatu5">
            <a href="#"><img :src="require('../image/榴莲2.jpg')" alt="图片出错" height="196px" width="233px"></a>
            <p>Redmi AirDots 2真无线蓝牙耳机</p>
            <span>支持蓝牙5.0，自动秒连，拿起就能用</span>
            <div class="nei4">
              <p>89元</p>
              <span>99元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ditu3">
        <a href="#"><img :src="require('../image/ywwq2.jpg')" alt="图片出错" width="1227px"></a>
      </div>
      <div class="wenzitiao">
        <div class="wenzitiaoxia">
          <a href="#"><img class="img1" :src="require('../image/字1.png')" alt="图片出错" width="24px" height="24px">送货上门服务
          </a>
          <a href="#"><img class="img2" :src="require('../image/字2.png')" alt="图片出错" width="24px" height="24px">1天无理由退货
          </a>
          <a href="#"><img class="img3" :src="require('../image/字3.png')" alt="图片出错" width="24px" height="24px">2天免费换货
          </a>
          <a href="#"><img class="img4" :src="require('../image/字4.png')" alt="图片出错" width="24px" height="24px">满69包邮（兴盛节特惠）
          </a>
          <a href="#" class="shebian"><img class="img5" :src="require('../image/字5.png')" alt="图片出错" width="24px"
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
                <li><a href="#">兴盛之家</a></li>
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
                <li><a href="#">了解兴盛</a></li>
                <li><a href="#">加入兴盛</a></li>
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
                <li><a href="#">S码通道</a></li>
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
                <li><a href="#" class="diyia"><img :src="require('../image/客服.png')" alt="图片出错">人工客服</a></li>
                <li class="diera">关注小米：<a href="#"><img class="dd" :src="require('../image/微博.png')" alt="图片出错"
                                                        height="22px" width="22px
                                "></a><a href="#"><img class="tt" :src="require('../image/微信.png')" alt="图片出错"
                                                       height="22px"
                                                       width="22px"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="zuihouxiaozi">
        <div class="zuihouxiaozitu">
          <img :src="require('../image/logo-mi2.png')" alt="图片出错" height="70px" width="70px">
        </div>
        <div class="zuihouxiaozizi">
          <a href="#">兴盛商城 |</a>
          <a href="#">XISI |</a>
          <a href="#">兴盛家 |</a>
          <a href="#">兴盛聊 |</a>
          <a href="#">多看 |</a>
          <a href="#">游戏 |</a>
          <a href="#">政企服务 |</a>
          <a href="#">兴盛线下店 |</a>
          <a href="#">兴盛集团隐私政策 |</a>
          <a href="#">兴盛公司儿童信息保护规则 |</a>
          <a href="#">兴盛商城隐私政策 |</a>
          <a href="#">兴盛商城用户协议 |</a>
          <a href="#">问题反馈 |</a>
          <a href="#">Select Location</a>
          <br>
          <a href="#">北京互联网法院法律服务工作站 |</a>
          <a href="#">中国消费者协会 |</a>
          <a href="#">北京市消费者协会</a>
          <br>
          <span>@</span>
          <a href="#">xs.com</a>
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
          <a href="#"><img :src="require('../image/底图1.png')" alt="图片出错"></a>
          <a href="#"><img :src="require('../image/底图2.png')" alt="图片出错"></a>
          <a href="#"><img :src="require('../image/底图3.png')" alt="图片出错"></a>
          <a href="#"><img :src="require('../image/底图4.png')" alt="图片出错"></a>
          <a href="#"><img :src="require('../image/底图5.png')" alt="图片出错"></a>
        </div>
      </div>
      <div class="dibuzi">
        <p>让全球每个人都能享受到科技带来的美好生活</p>
      </div>
    </div>
  </div>
</template>

<script>
import IndexTop from "./User/IndexTop";

export default {
  name: "Index",
  data() {
    return {
      userid: sessionStorage.getItem('user'),
      useridd: sessionStorage.getItem('id'),
      commodity: [],
      cartcount: 0,
      num: 1,
      carouseData: [
        {url: "src/image/lunbo1.png"},
        {url: "src/image/lunbo2.png"},
        {url: "src/image/lunbo3.jpg"},
        {url: "src/image/lunbo4.jpg"},
      ],
    }
  },
  components: {
    top: IndexTop
  },
  computed: {
    showLoginname() {
      return this.userid
    },
    showlgoinid() {
      return this.useridd
    },
  },
  methods: {
    shopping() {
      if (this.userid == null) {
        this.$router.push("/ShoppingFalst")
      }
    },
    gwc() {
      if (this.userid == null) {
        this.$router.push('/ShoppingFalst');
      } else if (this.cartcount == 0) {
        this.$router.push('/myshoppingkk');
      } else {
        this.$router.push('/shopping2');
      }
    }
  },
  created() {
    var _this = this;
    this.$axios.post("queryAllcom.action").then(val => {
      val.data.forEach(key=>{
        console.log(key.prozimg+"******")
      })
      _this.commodity = val.data
    }).catch()
    if (this.useridd != null) {
      var params = new URLSearchParams();
      params.append("id", this.useridd)
      this.$axios.post("cartcount.action", params).then(
        val => {
          _this.cartcount = val.data
        }
      ).catch()
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.bj1 {
  background-color: white;
  height: 760px;
}

.top {
  height: 41px;
  background-color: #333333;
  font-family: "Microsoft YaHei";
  position: relative;
  top: -11px;
  left: -8px;
  width: auto;
}

.zhong {
  width: 1227px;
  margin: 0 auto;
  height: 41px;
}

.zuo {
  float: left;
}

.zhong .ziti {
  float: left;
  height: 41px;
  line-height: 41px;
  font-size: 12px;
  margin-left: 0px;
}

.bj1 .topd .tu img {
  position: relative;
  top: 20px;
  width: 56px;
  height: 56px;
/ / z-index: 1;
}

.he {
  float: right;
  height: 41px;
}

/*.zhong .ziti a:hover {*/
/*  color: red;*/
/*  background-color: white;*/

/*}*/

.zhong .che {
  float: left;
  height: 41px;
  width: 31px;
  line-height: 41px;
  margin-right: 0px;
}


.zhong a {
  color: #B0B0B0;
  display: inline-block;
  text-decoration: none;
  font-size: 12px;
  margin: 0px 8px;
  height: 41px;
  line-height: 41px;
}

.zhong a:hover {
  color: white;
}

.you {
  float: right;
  height: 41px;
}

.top .zhong .che a:hover {
  background-color: white;
  color: black;
}

.topd {
  height: 100px;
  width: 1227px;
  margin: 0 auto;
  background-color: white;
/ / z-index: 1;
}

.topd .tu {
  float: left;
  height: 100px;
  width: 235px;
  background-color: white;
}

.topdzh {
  float: left;

}

#topdzh_ul li {
  display: inline;
}

.topd .topdzh a {
  color: black;
  display: inline-block;
  text-decoration: none;
  font-size: 16px;
  margin: 0px 10px;
  line-height: 100px;
}

.topdzh a:hover {
  color: red;
}

.topdyou {
  float: right;
  background-color: white;
}

.topdyou input {
  height: 49px;
  width: 244px;
  margin-top: 26px;
}

.topdyou .sousuo {
  float: right;
  width: 50px;
  height: 53px;
  margin-top: 26px;
  background-color: white;
}

.loginname ul {

  background: #ffffff;
  display: block;
  z-index: 20000;
  float: left;
  position: absolute;
  left: -180px;
  top: -5px;
}

.tope {
  height: 460px;
  width: 1227px;
  margin: 0 auto;
  background-color: transparent;
  z-index: -22200;
}

.youtu {
  position: relative;
  top: -29px;
  height: 460px;
  width: 992px;
  float: left;
  z-index: 5000;
}

.zuozi {
  width: 235px;
  height: 460px;
  float: left;
  background-color: #b0b0b0;
}

.zuozi a {
  display: block;
  color: white;
  text-decoration: none;
  height: 45px;
  line-height: 45px;
  padding-left: 17px;
  padding-top: 1px;
}

.zuozi a:hover {
  background-color: orange;
}


.zhongxia {
  height: 169px;
  width: 1227px;
  background-color: rosybrown;
  margin: 14px auto 17px auto;
}

.zhongxiazuo {
  float: left;
  height: 169px;
  width: 233px;
  background-color: #5F5750;
  position: relative;

}

.quanjin {
  height: 160px;
  width: 210px;
  margin: 0 auto;
  background-color: yellowgreen;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0px;
  top: 0px;
  bottom: 0px;
}

.zhongxiayou {
  float: left;
  height: 169px;
  width: 994px;
  background-color: white;
}

.xia1,
.xia2,
.xia3 {
  float: left;
  margin-left: 15px;
}

.xiaxia {
  width: 1227px;
  height: 402px;
  margin: 0 auto;
}

.bj2 {
  overflow: hidden;
  background-color: #FAFAFA;
}

.xiazi {
  height: 63px;
  line-height: 63px;
  font-size: 24px;
  font-weight: 300;
  width: 1227px;

}

.xiatu {
  height: 298px;
  width: 1227px;
  background-color: #F5F5F5;
  text-align: center;
}

.xiatu1 {
  float: left;
}

.xiatu2,
.xiatu3,
.xiatu4,
.xiatu5 {
  float: left;
  margin-left: 14px;
  width: 233px;
  height: 298px;
  background-color: white;
}

.xiatu p {
  font-size: 14px;
}

.xiatu span {
  font-size: 10px;
  color: #BDBDBD;
}

.nei1 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei1 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei2 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei2 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei3 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei3 span {
  text-decoration: line-through;
  font-size: 14px;
}

.nei4 p {
  display: inline-block;
  color: orange;
  font-size: 14px;
}

.nei4 span {
  text-decoration: line-through;
  font-size: 14px;
}

.ditu {
  margin-top: 40px;
  height: 145px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
}

.ditu2 {
  margin-top: 40px;
  height: 120px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
  top: -60px;
}

.ditu3 {
  margin-top: 40px;
  height: 120px;
  width: 1227px;
  background-color: orange;
  margin: 0 auto;
  position: relative;
  box-shadow: 1px 1px 7px darkgray;
}

.zhongxiazuo a {
  display: block;
  float: left;
  width: 70px;
  height: 20px;
  background-color: #5F5750;
  padding: 60px 0 0 0;
  text-decoration: none;
  color: white;
  font-size: 10px;
  position: relative;
  text-align: center;

}

.zhongxiazuo img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
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

.yc {
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}

.yc1, .yc2, .yc3, .yc4, .yc5, .yc6 {
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}

.yc span {
  font-size: 12px;
}

.yc price {
  font-size: 12px;
  color: #FF6A00;
}

.ycleft {
  position: absolute;
  top: 50px;
  z-index: 10;
}

.left1 {
  position: absolute;
  left: 295px;
  z-index: 100;
  display: none;
}

.yans {
  box-shadow: -1px -1px 22px darkgray;
}

.ycyc {
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}

.ycyc1, .ycyc2, .ycyc3, .ycyc4, .ycyc5, .ycyc6 {
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}

.ycyc span {
  font-size: 12px;
}

.ycyc price {
  font-size: 12px;
  color: #FF6A00;
}

.ycyc img {
  height: 110px;
  width: 160px;
}

.ds {
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}

.ds1, .ds2, .ds3, .ds4, .ds5, .ds6 {
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}

.ds span {
  font-size: 12px;
}

.ds price {
  font-size: 12px;
  color: #FF6A00;
}

.ds img {
  height: 110px;
  width: 160px;
}

.bjb {
  text-align: center;
  width: 100%;
  height: 230px;
  box-shadow: 1px 1px 7px darkgray;
  position: absolute;
  top: 141px;
  left: -0px;
  background-color: #ffffff;
  z-index: 10000;
  display: none;
}

.bjb1, .bjb2, .bjb3, .bjb4, .bjb5, .bjb6 {
  float: left;
  height: 230px;
  width: 160px;
  position: relative;
  left: 110px;
  margin: 30px;
}

.bjb span {
  font-size: 12px;
}

.bjb price {
  font-size: 12px;
  color: #FF6A00;
}

.bjb img {
  height: 110px;
  width: 160px;
}

.left1 {
  background: #ffffff;
}

.loginname {
  height: 41px;
  width: 50px;
  position: absolute;
  right: 287px;
  display: none;
  top: 46px;
}

.loginname span {
  color: #ffffff;
  font-size: 12px;
  position: relative;
  top: 8px;
}

.loginname ul {
  box-shadow: 1px 1px 7px darkgray;
}

#top_ul, #top_ul li {
  display: inline;

}

#one, #one li {
  display: block;
}

.topdzh #topdzh_ul li {
  height: 100px;
}

.lxyans {
  color: #FF6A00;
}

img#lunbo {
  position: relative;
  top: 29px;
}

.mzz {
  position: relative;
  top: 0px;
}

.qwq {
  position: relative;
  top: 29px;
}

.small {
  height: 500px;
}
</style>
