<template>
    <div>
        <!-- search-bar area -->
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img class="location" :src="locationIcon" alt="">
                </van-col>
                <van-col span="16">
                    <input class="search-input" type="text" placeholder="查找">
                </van-col>
                <van-col offset="1" span="3">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{ cate.mallCategoryName }}</span>
            </div>
        </div>
        <!-- adBanner area -->
        <div class="ad-banner">
            <img v-lazy="this.adBanner" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{ item.goodsName }}</div>
                            <div>{{ item.price }}({{ item.mallPrice }})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- swiper-default -->
        <!-- <swiperDefault></swiperDefault>
        <swiperDefault2></swiperDefault2>
        <swiperScroll></swiperScroll> -->

        <!-- floor area -->
        <floor-component :floorData="floor1"></floor-component>
    </div>
</template>

<script>
import axios from "axios";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import swiperDefault from "../swiper/swiperDefault"
// import swiperDefault2 from "../swiper/swiperDefault2"
// import swiperScroll from "../swiper/swiperScroll"
import floorComponent from "../component/floorComponent";

export default {
  data() {
    return {
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: []
    };
  },
  components: {
    swiper,
    swiperSlide,
    // swiperDefault,
    // swiperDefault2,
    // swiperScroll,
    floorComponent
  },
  created() {
    axios({
      url:
        "https://www.easy-mock.com/mock/5ae58725c6c41f6d3e8fc0f5/SmileVue/index",
      method: "get"
    })
      .then(res => {
        this.bannerPicArray = res.data.data.slides;
        this.category = res.data.data.category;
        this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
        this.recommendGoods = res.data.data.recommend;
        this.floor1 = res.data.data.floor1;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background: #e5017d;
  line-height: 2.2em;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location {
  /* display: block; */
  width: 65%;
  padding: 0.2rem 0 0 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  text-align: center;
}
.recommend-area {
  margin-top: 0.3rem;
  background-color: #fff;
}
.recommend-title {
  padding: 0.2rem;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
