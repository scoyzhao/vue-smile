<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="swiper-text">
                <div>
                    双向绑定其实已经是一个老掉牙的问题了,只要涉及到MVVM框架就不得不谈的知识点,但它毕竟是Vue的三要素之一.
Vue三要素

响应式: 例如如何监听数据变化,其中的实现方法就是我们提到的双向绑定
模板引擎: 如何解析模板
渲染: Vue如何将监听到的数据变化和解析后的HTML进行渲染

可以实现双向绑定的方法有很多,KnockoutJS基于观察者模式的双向绑定,Ember基于数据模型的双向绑定,Angular基于脏检查的双向绑定,本篇文章我们重点讲面试中常见的基于数据劫持的双向绑定。
常见的基于数据劫持的双向绑定有两种实现,一个是目前Vue在用的Object.defineProperty,另一个是ES2015中新增的Proxy,而Vue的作者宣称将在Vue3.0版本后加入Proxy从而代替Object.defineProperty,通过本文你也可以知道为什么Vue未来会选择Proxy。

作者：寻找海蓝96
链接：https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
  }
};
</script>

<style scoped>
.swiper {
  height: 18.75rem;
  overflow: hidden;
}
.swiper-text {
  font-size: 18px;
  text-align: left;
  padding: 30px;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>