<template>

  <section class="s-main-window">

    <div class="banners-slider-img">

      <swiper
        ref="bannersImgSwiper"
        :options="swiperOptions">

        <swiper-slide
          v-for="(slide, index) in slides"
          :key="slide.id"
        >
          <div
            ref="bannerVideoSlide"
            class="banners-slider-img-item"
          >
            <video
              v-if="mob"
              ref="videoMob"
              :src="(slide.mobVideoSrc || slide.videoSrc) + '#t=0.1'"
              class="banners-slider-video-mob"
              muted
              preload="metadata"
              playsinline
              autoplay
              @ended="videoEnded($event, index)"
            />
            <video
              v-else
              ref="video"
              :src="slide.videoSrc + '#t=0.1'"
              class="banners-slider-video"
              muted
              preload="metadata"
              playsinline
              autoplay
              @ended="videoEnded($event, index)"
            />
          </div>
          <div
            class="banners-slider-img-item"
            :style="{backgroundImage: `url(${slide.imgSrc})`}"/>
          <BannerTextContent
            v-if="mob"
            :title="slide.title"
            :descr="slide.descr"
            :link="slide.link"
          />
        </swiper-slide>

      </swiper>

      <div class="banners-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
      <div class="banners-button-next slider-next"><span class="icon-arrow-right"></span></div>

    </div>

    <div
      v-if="!mob"
      class="main-window-content"
    >

      <div class="container">

        <div class="banners-slider swiper-container">

          <swiper
            ref="bannersTextSwiper"
            :options="swiperOptions"
            @slideChange="sliderTextChanged">

            <swiper-slide
              v-for="slide in slides"
              :key="slide.id">

              <BannerTextContent
                :title="slide.title"
                :descr="slide.descr"
                :link="slide.link"
              />

            </swiper-slide>

          </swiper>

          <div class="banners-button-prev slider-prev"><span class="icon-arrow-left"></span></div>
          <div class="banners-button-next slider-next"><span class="icon-arrow-right"></span></div>

        </div>

        <div class="main-window-logo">
          <img src="/img/logo-light.svg" alt="">
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
    })
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
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
    },
    mob: false
  }),
  methods: {
    sliderImgToSlide (i) {
      this.$refs.bannersImgSwiper?.$swiper.slideTo(i)
      this.$refs.bannersTextSwiper?.$swiper.slideTo(i)
      this.startVideoByIndex(i)
    },
    sliderTextChanged () {
      let i = this.$refs.bannersTextSwiper.$swiper.realIndex
      this.sliderImgToSlide(i)
    },
    stopAllVideo () {
      const videos = this.$refs.video
      const mobVideos = this.$refs.videoMob
      if (this.mob && mobVideos) {
        mobVideos.forEach(video => {
          video.pause()
          video.currentTime = 0
        })
        return false
      }
      if (videos) {
        videos.forEach(video => {
          video.pause()
          video.currentTime = 0
        })
      }
    },
    startVideoByIndex (index) {
      const slide = this.$refs.bannerVideoSlide?.[index]
      if (slide) {
        const video = slide.querySelector('.banners-slider-video')
        const videoMob = slide.querySelector('.banners-slider-video-mob')
        this.stopAllVideo()
        if (this.mob) {
          videoMob?.play()
          return false
        }
        video?.play()
      }
    },
    videoEnded (e, index) {
      const video = e.target
      const nextIndex = index === (this.slides.length - 1) ? 0 : index + 1
      video?.play()
      this.sliderImgToSlide(nextIndex)
      this.startVideoByIndex(nextIndex)
    }
  },
  mounted () {
    this.mob = window.innerWidth < 992
  }
}
</script>

<style scoped>

</style>
