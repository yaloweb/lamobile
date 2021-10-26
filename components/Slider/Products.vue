<template>
  <div class="products-slider">

    <swiper :options="swiperOptions">

      <swiper-slide
        v-for="slide in list"
        :key="slide.id">
        <CatalogItem :item="slide" />
      </swiper-slide>

    </swiper>

    <div class="products-prev style-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
    <div class="products-next style-button-next slider-next"><span class="icon-arrow-right"></span></div>

  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductsSlider',
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
          spaceBetween: 10,
          slidesPerView: 1
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1600: {
          spaceBetween: 40
        }
      },
      navigation: {
        prevEl: '.products-prev',
        nextEl: '.products-next'
      }
    }
  })
}
</script>

<style scoped>

</style>
