<template>
  <div class="cart-group">
    <div class="sellect-all">
      <div class="radio">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
      </div>

      <div class="price">价格</div>
      <div class="quantity">数量</div>
    </div>
    <div class="cart-main">
      <div class="product-item"
           v-for="(item,index) in allgoods"
           :key="index">
        <el-checkbox v-model="item.ck"
                     @change="checkedChange(item.cartid)"></el-checkbox>
        <div class="product-detail">
          <div class="img">
            <img :src="(item.commodity.proimage)" alt="图片出错">
          </div>
          <div class="content">
            <div class="name">{{item.commodity.proname}}</div>
            <div class="specification">商品副标题</div>
          </div>
        </div>
        <div class="product-price">
          ${{item.commodity.prosprice}}
        </div>
        <div class="product-quantity">
          <input type="button" class="btn-add" value="-" @click="jj(item.cartid,true,item.quantity)">
             {{item.quantity}}
          <input type="button" class="btn-sub" value="+" @click="jj(item.cartid,false)">
        </div>
      </div>
    </div>
    <div class="cart-subtotal">
      <div class="radio">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <div class="total">
        Total : <span style="color:#e33333">${{totalPrice}}</span>
      </div>
        <el-button class="btn">结算</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "s",
  data () {
    return {
      quantity: 4,
      checkAll: false,
      isIndeterminate: false,
      totalPrice: 0,
      cartList: [
        {
          id: 1,
          img: '//img10.joybuy.com/N4/jfs/t1/176101/8/13660/51184/60c01ea8E1204306a/1687f0f76f243965.jpg.dpg',
          name: 'Western Digital (WD) New My Passport 2.5 "Classic Black Mobile Hard Drive WDBYFT0020BBK-CESN',
          num: 1,
          price: 100,
          checked: true
        },
        {
          id: 2,
          img: '//img10.joybuy.com/N4/jfs/t1/176101/8/13660/51184/60c01ea8E1204306a/1687f0f76f243965.jpg.dpg',
          name: 'Western Digital (WD) New My Passport 2.5 "Classic Black Mobile Hard Drive WDBYFT0020BBK-CESN',
          num: 2,
          price: 200,
          checked: false
        },
        {
          id: 3,
          img: '//img10.joybuy.com/N4/jfs/t1/176101/8/13660/51184/60c01ea8E1204306a/1687f0f76f243965.jpg.dpg',
          name: 'Western Digital (WD) New My Passport 2.5 "Classic Black Mobile Hard Drive WDBYFT0020BBK-CESN',
          num: 3,
          price: 300,
          checked: true
        }
      ],
      allgoods:[],

      cart: []
    }
  },
  mounted () {
    this.setCart()
  },
  methods: {
    //购物车数量加减跟删除
    jj(id,boolean,sl){
      console.log(boolean)
      console.log(sl)
      if (boolean==true&&sl==1){
        if (confirm("您确定要移除购物车吗?")){
          var params = new URLSearchParams();
          params.append("cartid",id);
          params.append("pdjj",boolean)
          this.$axios.post("gwcssjj.action",params).then(res=>{

            this.queryshopping();
          }).catch();
        }else{
          return
        }
      }
      var params = new URLSearchParams();
      params.append("cartid",id);
      params.append("pdjj",boolean)
      this.$axios.post("gwcssjj.action",params).then(res=>{

        this.queryshopping();
      }).catch();
    },
    //查询当前用户购物车
    queryshopping() {
      var params = new URLSearchParams();
      params.append("uid", 1);

      this.$axios.post("querygwcid.action", params).then(res => {
        this.allgoods = res.data;
        console.log(res.data)
      }).catch()
    },
    //全选
    handleCheckAllChange (val) {
      console.log(val)
      this.isIndeterminate = false;
      if (val == false) {
        for (let i in this.allgoods) {
          this.allgoods[i].ck = false
        }
      } else {
        for (let i in this.allgoods) {
          this.allgoods[i].ck = true
        }
      }
      this.setCart()
    },
    //数量改变
    qtyChange (value) {
      console.log(value)
      console.log(this.allgoods)
      this.setCart()
    },
    //单选框改变
    checkedChange (id) {
      console.log(id)
      this.checkAll = this.allgoods.every(function (obj) {
        return obj.ck == true
      })
      this.isIndeterminate = false
      this.setCart()
    },
    //购物车状态
    setCart () {
      let totalPrice = 0
      let allChecked = true
      this.allgoods.forEach((v, i) => {
        if (v.ck) {
          totalPrice += v.commodity.prosprice * v.quantity
        } else {
          allChecked = false
        }
      })
      this.allChecked = allChecked
      this.totalPrice = totalPrice
    }
  },
  created() {
    this.queryshopping();
  }


}
</script>

<style  scoped>
.btn-add,
.btn-sub {
  width: 1.5rem; height: 1.5rem;
  border: 1px solid gray;
  background: linear-gradient(currentColor, currentColor) no-repeat center/.875em 2px,
  linear-gradient(currentColor, currentColor) no-repeat center/2px .875em,
  ghostwhite;
  color: dimgray;
}
.btn-sub {
  background-size: .875em 2px, 0;
}
.cart-group {
  margin-top: 30px;
  padding-bottom: 60px;
}
  .sellect-all {
    background: white;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

.radio {
  width: 640px;
}

.detail {
    width: 600px;
}

  .price {
    width: 220px;
  }

  .quantity {
    width: 200px;
  }

  .cart-main {
    padding: 20px;
    background: white;
  }
    .product-item {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #e3e3e3;
    }
      .product-detail {
        width: 550px;
        height: 100%;
        margin-left: 10px;
        padding: 0 40px 0 20px;
        display: flex;
      }
        .img {
          width: 100px;
          height: 100px;
        }
          img {
            width: 100px;
            height: 100px;
          }


        .content {
          width: 450px;
        }
          .name {
            font-size: 14px;
            color: black;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .specification {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
          }


      .product-price {
        width: 220px;
        height: 100%;
        font-size: 16px;
        color: #e33333;
      }

      .product-quantity {
        width: 220px;
        height: 100%;
      }


  .cart-subtotal {
    height: 60px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    background: white;
    padding-left: 20px;
    position: relative;
  }
    .btn {
      position: absolute;
      right: 0;
      padding: 0;
      width: 130px;
      height: 60px;
      font-size: 16px;
      text-align: center;
      line-height: 60px;
      color: #fff;
      background: #e33333;
    }

    .btn:hover {
      cursor: pointer;
    }


</style>

