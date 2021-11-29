<template>

  <div class="img-gallery">
    <swiper :options="swiperOptions">

      <swiper-slide
        v-for="(slide, index) in list"
        :key="index">
        <img
          :src="slide"
          alt="">
      </swiper-slide>

    </swiper>
  </div>

</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'PostImgSlider',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: Array
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 2,
      spaceBetween: 50,
      speed: 600,
      loop: true,
      // breakpoints: {
      //   0: {
      //     spaceBetween: 10,
      //     slidesPerView: 1
      //   },
      //   576: {
      //     spaceBetween: 20,
      //     slidesPerView: 2
      //   },
      //   992: {
      //     spaceBetween: 20,
      //     slidesPerView: 3
      //   },
      //   1200: {
      //     spaceBetween: 20,
      //     slidesPerView: 3
      //   },
      //   1600: {
      //     spaceBetween: 50
      //   }
      // },
      navigation: {
        nextEl: '.similar-next',
        prevEl: '.similar-prev'
      }
    }
  })
}
</script>

<style scoped>

</style>
