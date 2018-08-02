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
                        <van-tabs v-model="active">
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
                                    <div class="list-item" v-for="(item, index) in list" :key="index">
                                        {{ item }}
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
      list: [], // 商品数据
      isRefresh: false // 下拉刷新
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
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryID) {
      this.categoryIndex = index;
      this.getCategorySubByCategoryID(categoryID);
    },
    // 根据大类id读取小类
    getCategorySubByCategoryID(categoryID) {
      axios({
        url: this.$url.getCategorySubList,
        method: "post",
        data: { categoryID }
      })
        .then(res => {
          // console.log(res)
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
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
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    // 下拉刷新
    onRefresh() {
        setTimeout(() => {
            this.isRefresh = false
            this.finished = false
            this.list = []
            this.onLoad()
        }, 500);
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
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>