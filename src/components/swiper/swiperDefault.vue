<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
                Slide {{ item }}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css"
    import { swiper, swiperSlide } from "vue-awesome-swiper"

    export default {
        data() {
            return {
                slide: [1, 2, 3, 4, 5, 6],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                },
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
    }
</script>

<style scoped>
.swiper-slide {
    padding-top: 3rem;
    height: 4rem;
    border-bottom: 1px solid #ccc;
    text-align: center;
}
</style>