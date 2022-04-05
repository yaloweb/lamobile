<template>
  <section class="s-basket-recommended">
    <div class="container">

      <div class="section-title">
        <div class="h2">Рекомендуем добавить к покупке</div>
      </div>

      <div class="basket-recommended-slider">

        <swiper :options="swiperOptions">
          <swiper-slide
            v-for="product in list"
            :key="product.id"
          >
            <CatalogItem :item="product"/>
          </swiper-slide>
        </swiper>

        <div class="basket-recommended-pagination products-slider-pagination"/>

      </div>

    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'BasketRecommended',
  components: {
    Swiper, SwiperSlide
  },
  props: {
    list: Array
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 10,
      pagination: {
        el: '.basket-recommended-pagination'
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          loop: true
        },
        576: {
          slidesPerView: 2,
          loop: false
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        1200: {
          spaceBetween: 20
        },
        1366: {
          spaceBetween: 30
        },
        1600: {
          spaceBetween: 56
        }
      }
    }
  })
}
</script>

<style
  lang="sass"
  scoped>

</style>
