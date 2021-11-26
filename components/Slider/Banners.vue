<template>

  <section class="s-main-window">

    <div class="banners-slider-img">

      <swiper
        ref="bannersImgSwiper"
        :options="swiperOptions">

        <swiper-slide
          v-for="slide in slides"
          :key="slide.id">
          <div
            class="banners-slider-img-item"
            :style="{backgroundImage: `url(${slide.imgSrc})`}"/>
        </swiper-slide>

      </swiper>

    </div>

    <div class="main-window-content">

      <div class="container">

        <div class="banners-slider swiper-container">

          <swiper
            ref="bannersTextSwiper"
            :options="swiperOptions"
            @slideChange="sliderTextChanged($event)">

            <swiper-slide
              v-for="slide in slides"
              :key="slide.id">
              <div
                class="banner-item">

                <div
                  class="banner-item-title"
                  v-html="slide.title"/>
                <p v-html="slide.descr"/>
                <a
                  :href="slide.url"
                  class="btn btn-sm btn-border">Подробнее</a>

              </div>

            </swiper-slide>

          </swiper>

          <div class="banners-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
          <div class="banners-button-next slider-next"><span class="icon-arrow-right"></span></div>

        </div>

        <div class="main-window-logo">
          <img :src="logo" alt="">
        </div>

      </div>

    </div>

  </section>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'

export default {
  name: 'SliderBanners',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    slides: Array
  },
  computed: {
    ...mapState({
      logo: state => state.global.logoLightSrc
    }),
    bannersImgSwiper () {
      return this.$refs.bannersImgSwiper.$swiper
    },
    bannersTextSwiper () {
      return this.$refs.bannersTextSwiper.$swiper
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      speed: 1000,
      allowTouchMove: false,
      parallax: true,
      navigation: {
        nextEl: '.banners-button-next',
        prevEl: '.banners-button-prev'
      },
      breakpoints: {
        0: {
          allowTouchMove: true
        },
        992: {
          allowTouchMove: false
        }
      }
    }
  }),
  methods: {
    sliderImgToSlide (i) {
      this.bannersImgSwiper.slideTo(i)
    },
    sliderTextChanged () {
      let i = this.bannersTextSwiper.realIndex
      this.sliderImgToSlide(i)
    }
  }
}
</script>

<style scoped>

</style>
