<template>
    <div>
        <!-- navbar -->
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <!-- content -->
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index, item.ID)" :class="{categoryActive: (categoryIndex === index)}" v-for="(item, index) in category" :key="index">
                                {{ item.MALL_CATEGORY_NAME }}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tableCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                                
                            </van-tab>
                        </van-tabs>
                        <div id="list-div">
                            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    @load="onLoad"
                                >
                                    <div class="list-item" v-for="(item, index) in goodList" :key="index">
                                        <div class="list-item-img">
                                            <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorImg">
                                        </div>
                                        <div class="list-item-text">
                                            <div>{{ item.NAME }}</div>
                                            <div>￥{{ item.ORI_PRICE }}</div>
                                        </div>
                                    </div>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], // 小类类别
      active: 0, // 激活标签的值
      loading: false, // 上拉加载
      finished: false, //上拉加载是否有数据
      page: 1, // 商品列表的页数
      goodList: [], // 商品列表信息
      categorySubId: "", // 商品子类id
      isRefresh: false, // 下拉刷新
      errorImg: 'this.src="' + require("@/assets/images/errorImg.jpg") + '"',
    };
  },
  created() {
    this.getCategory();
  },
  // 只有在这里可以操作dom，就是dom加载完成以后
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
  },
  methods: {
    getCategory() {
      axios({
        url: this.$url.getCategoryList,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 得到小类的id
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    // 根据大类id读取小类
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: this.$url.getCategorySubList,
        method: "post",
        data: { categoryID: categoryId }
      })
        .then(res => {
          // console.log(res)
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        // 有小类id，就去取，没有就去小类id第一个
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 500);
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    // 获取商品列表
    getGoodList() {
      axios({
        url: this.$url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message.length) {
            this.page++;
            // 这里用到了数组连接的方法
            this.goodList = this.goodList.concat(res.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击子类获取subId
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);

      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
li {
  line-height: 2rem;
  border-bottom: 1px solid cornsilk;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: white;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>