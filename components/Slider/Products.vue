<template>
  <div class="products-slider">

    <swiper :options="swiperOptions">

      <swiper-slide
        v-for="slide in list"
        :key="slide.id">

        <CatalogItem :item="slide"/>

      </swiper-slide>

    </swiper>

    <div
      class="products-slider-pagination"
      :class="`products-slider-pagination-${index}`"
      slot="pagination"/>

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
    list: Array,
    index: {
      type: Number,
      default: 0
    },
    mobQuantity: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 50,
        speed: 600,
        pagination: {
          el: `.products-slider-pagination-${this.index}`,
          clickable: true
        },
        breakpoints: {
          0: {
            spaceBetween: 10,
            slidesPerView: this.mobQuantity
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
    }
  }
}
</script>

<style scoped>

</style>
