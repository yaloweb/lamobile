<template>
  <div class="similar-slider products-slider">

    <swiper :options="swiperOptions">

      <swiper-slide
        v-for="slide in list"
        :key="slide.id">
        <BlogItem :item="slide"/>
      </swiper-slide>

    </swiper>

    <div class="similar-prev style-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
    <div class="similar-next style-button-next slider-next"><span class="icon-arrow-right"></span></div>

    <div class="similar-pagination"/>

  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'SliderSimilar',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: Array
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 50,
      speed: 600,
      loop: false,
      breakpoints: {
        0: {
          spaceBetween: 10,
          slidesPerView: 'auto',
          loop: true
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
          loop: false
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        1200: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        1600: {
          spaceBetween: 50
        }
      },
      navigation: {
        nextEl: '.similar-next',
        prevEl: '.similar-prev'
      },
      pagination: {
        el: '.similar-pagination',
        type: 'progressbar'
      }
    }
  })
}
</script>

<style scoped>

</style>
