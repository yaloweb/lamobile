<template>
  <transition name="popup-transition">
    <div
      v-if="show"
      class="popup-wrapper">

      <div class="popup-block">

        <div
          class="popup-close"
          @click="$emit('close')"/>

        <div class="popup-content">

          <div class="images-gallery-component">

            <div class="images-gallery-thumbs">

              <swiper
                ref="thumbsSlider"
                :options="thumbsOptions"
                @slideChangeTransitionStart="thumbsSliderChange">
                <swiper-slide
                  v-for="(slide, index) in list"
                  :key="index">
                  <img
                    :src="slide"
                    alt=""
                    :class="{'active': active === index}"
                    @click="selectActive(index)">
                </swiper-slide>
              </swiper>

              <div class="thumbs-nav-prev" />
              <div class="thumbs-nav-next" />

            </div>

            <div class="images-gallery-list">
              <swiper
                ref="gallerySlider"
                :options="imagesGalleryOptions">
                <swiper-slide
                  v-for="(slide, index) in list"
                  :key="index">
                  <img
                    :src="slide"
                    alt="">
                </swiper-slide>
              </swiper>
            </div>

          </div>

        </div>

      </div>

    </div>
  </transition>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ImagesGalleryPopup',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    show: Boolean,
    list: Array
  },
  computed: {
    thumbsSlider () {
      return this.$refs.thumbsSlider.$swiper
    },
    gallerySlider () {
      return this.$refs.gallerySlider.$swiper
    }
  },
  data: () => ({
    thumbsOptions: {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 60,
      speed: 600,
      navigation: {
        nextEl: '.thumbs-nav-next',
        prevEl: '.thumbs-nav-prev'
      }
    },
    imagesGalleryOptions: {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 60,
      speed: 600
    },
    active: 0
  }),
  methods: {
    thumbsSliderChange () {
      const index = this.thumbsSlider.activeIndex
      this.active = index
      this.gallerySlider.slideTo(index)
    },
    selectActive (index) {
      this.active = index
      this.thumbsSlider.slideTo(index)
      this.gallerySlider.slideTo(index)
    }
  }
}
</script>

<style scoped>
  .popup-transition-enter-active,
  .popup-transition-leave-active {
    transition: all .4s ease;
  }

  .popup-transition-enter, .popup-transition-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }
</style>
