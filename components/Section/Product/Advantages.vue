<template>
  <section class="s-product-advantages">
    <div class="container">

      <div class="advantages-wrapper">

        <div class="advantages">

          <swiper :options="swiperOptions">

            <swiper-slide
              v-for="advantage in advantages"
              :key="advantage.id">

              <div
                class="advantages-item"
                :class="{'no-text': !advantage.title && !advantage.descr }">
                <div class="advantages-item-img">
                  <img
                    :src="advantage.imgSrc"
                    alt="">
                </div>
                <div class="advantages-item-content">
                  <div
                    v-if="advantage.title ? advantage.title.length > 0 : false"
                    class="h2"
                    v-html="advantage.title"/>
                  <p
                    v-if="advantage.descr ? advantage.descr.length > 0 : false"
                    v-html="advantage.descr"/>
                </div>
              </div>

            </swiper-slide>

          </swiper>

        </div>

      </div>

    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductSectionAdvantages',
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState({
      advantages: state => state.product.advantages
    })
  },
  data: () => ({
    swiperOptions: {
      spaceBetween: 49,
      slidesPerView: 2,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    }
  })
}
</script>

<style scoped>

</style>
