<template>
    <div>
        <!-- navbar -->
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <!-- topImage -->
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <!-- name -->
        <div class="good-name">
            {{ goodsInfo.NAME }}
        </div>
        <!-- price -->
        <div class="good-price">
            价格：¥{{ goodsInfo.PRESENT_PRICE | moneyFilter }}元
        </div>
        <!-- 商品详情，评论 -->
        <div>
            <van-tabs swipeable sticky>
                <van-tab class="detail" title="商品详情">
                    <div v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="评论">
                    评论制作中
                </van-tab>
            </van-tabs>
        </div>
        <!-- footer -->
        <div class="good-bottom">
            <div>
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      goodsId: "",
      // 商品信息
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: this.$url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器错误，数据获取失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 添加购物车
    addGoodsToCart() {
      // 取出购物车内的商品数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      // 判断购物车里有没有这个商品
      // 没有返回undefined
      let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId);
      console.log(isHaveGoods);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        // 添加到localStorage
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }

      this.$router.push({ name: "Cart" });
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.good-name {
  background-color: #fff;
}
.good-price {
  background-color: #fff;
}
.detail {
  font-size: 0;
}
.good-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.good-bottom > div {
  flex: 1;
  padding: 0.3125rem;
}
</style>