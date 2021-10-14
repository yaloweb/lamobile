<template>
  <div class="products-slider">

    <swiper
      ref="bannersImgSwiper"
      :options="swiperOptions">

      <swiper-slide
        v-for="slide in list"
        :key="slide.id">
        <CatalogItem :item="slide" />
      </swiper-slide>

    </swiper>

    <div class="products-slider-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
    <div class="products-slider-button-next slider-next"><span class="icon-arrow-right"></span></div>

  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'SliderProducts',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: Array
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 4,
      spaceBetween: 50,
      speed: 600,
      parallax: true,
      breakpoints: {
        0: {
          spaceBetween: 20,
          slidesPerView: 1
        },
        576: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        },
        1600: {
          spaceBetween: 40
        }
      },
      navigation: {
        nextEl: '.products-slider-button-next',
        prevEl: '.products-slider-button-prev'
      }
    }
  })
}
</script>

<style scoped>

</style>
