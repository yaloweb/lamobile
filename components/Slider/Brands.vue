<template>
  <div class="brands-row">

    <swiper :options="swiperOptions">

      <swiper-slide
        v-for="brand in list"
        :key="brand.id">
        <BrandsCard :item="brand" />
      </swiper-slide>

    </swiper>

    <div
      v-if="list.length > 4"
      class="products-slider-pagination brands-slider-pagination"
      slot="pagination"/>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'SliderBrands',
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
      pagination: {
        el: '.brands-slider-pagination',
        clickable: true
      },
      watchSlidesVisibility: true,
      breakpoints: {
        0: {
          spaceBetween: 10,
          slidesPerView: 'auto'
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
        },
        1800: {
          spaceBetween: 50
        }
      }
    }
  })
}
</script>
