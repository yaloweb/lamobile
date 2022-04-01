<template>

  <div
    class="product-main-img"
    :class="{'only-one': productImages.length === 1}">

    <div
      v-if="productImages.length > 1"
      class="img-full-slider"
      :class="{visible: fullImageScreen || isMob}">

      <div
        class="img-full-slider-prev"
        @click="goToPrevSlide"/>

      <div
        class="img-full-slider-next"
        @click="goToNextSlide"/>

      <div class="img-full-slider-list">
        <swiper
          ref="imgFullSliderList"
          :options="fullSliderOptions">
          <swiper-slide
            v-for="(slide, index) in productImages"
            :key="index">
            <div
              :class="{visible: index === selectedImageIndex}"
              class="img-full-slider-list-container">
              <img
                v-for="img in slide.list"
                :key="img.id"
                :src="img.imgSrc"
                :class="{'visible': img.color === selectedColor}"
                alt="">
            </div>
          </swiper-slide>
        </swiper>
        <div class="img-full-slider-list-pagination" />
      </div>
    </div>

    <div
      v-if="productImages.length > 1 && !isMob"
      class="product-main-img-slider">

      <div
        v-if="!isMob"
        class="product-main-img-swiper"
        :class="{visible: !fullImageScreen || isMob}">

        <swiper :options="swiperOptions">

          <swiper-slide
            v-for="(slide, index) in slidesArr"
            :key="index">

            <div
              v-for="(item, itemIndex) in slide"
              :key="itemIndex"
              class="product-main-img-container">
              <img
                v-for="img in item.list"
                :key="img.id"
                :class="{'visible': img.color === selectedColor}"
                :src="img.imgSrc"
                alt="">
            </div>

          </swiper-slide>

        </swiper>

        <div class="slider-prev product-img-nav-prev"><span class="icon-arrow-left"></span></div>
        <div class="slider-next product-img-nav-next"><span class="icon-arrow-right"></span></div>

      </div>

    </div>

    <div
      v-else-if="!isMob && productImages.length === 1"
      class="product-main-img-container">
      <template v-if="productImages[0]">
        <img
          v-for="img in productImages[0].list"
          :key="img.id"
          :class="{'visible': img.color === selectedColor}"
          :src="img.imgSrc"
          alt="">
      </template>
    </div>

    <div
      v-if="productImages.length > 1"
      class="product-main-img-full-btn"
      @click="fullImageScreen = !fullImageScreen">
      <span class="icon-search"/>
    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductInfoImages',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    selectedColor: Number
  },
  computed: {
    ...mapState({
      productImages: state => state.product.productImages
    }),
    getSlidesLength () {
      const wideLength = this.productImages.filter(item => item.wide).length
      return Math.ceil((this.productImages.length - wideLength) / 2 + wideLength)
    },
    slidesArr () {
      let res = []
      let count = 0
      for (let i = 0; i < this.getSlidesLength; i++) {
        res.push([])
      }
      this.productImages.forEach((item, index) => {
        if (this.productImages.length === 3) {
          if (index === 0) {
            res[0].push(item)
          } else {
            res[1].push(item)
          }
        } else if (item.wide) {
          if (res[count].length > 0) {
            count++
            res[count].push(item)
            count++
          } else {
            res[count].push(item)
            count++
          }
        } else if (res[count].length === 2) {
          count++
          res[count].push(item)
        } else if (res[count].length === 1) {
          if (res[count][0].wide) {
            count++
          } else {
            res[count].push(item)
            count++
          }
        } else {
          res[count].push(item)
        }
      })
      return res
    }
  },
  data: () => ({
    swiperOptions: {
      direction: 'vertical',
      slidesPerView: 2,
      spaceBetween: 25,
      speed: 600,
      navigation: {
        nextEl: '.product-img-nav-next',
        prevEl: '.product-img-nav-prev'
      },
      breakpoints: {
        0: {
          spaceBetween: 10
        },
        576: {
          spaceBetween: 20
        },
        768: {
          spaceBetween: 25
        }
      }
    },
    fullSliderOptions: {
      slidesPerView: 1,
      speed: 600,
      pagination: {
        el: '.img-full-slider-list-pagination'
      },
      breakpoints: {
        0: {
          spaceBetween: 5
        },
        576: {
          spaceBetween: 0
        }
      }
    },
    isMob: false,
    selectedImageIndex: 0,
    fullImageScreen: false
  }),
  methods: {
    checkDevice () {
      window.innerWidth < 576 ? this.isMob = true : this.isMob = false
    },
    goToPrevSlide () {
      this.$refs.imgFullSliderList.$swiper?.slidePrev()
    },
    goToNextSlide () {
      this.$refs.imgFullSliderList.$swiper?.slideNext()
    }
  },
  mounted () {
    this.checkDevice()
    window.addEventListener('resize', this.checkDevice)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.checkDevice))
  }
}
</script>

<style scoped>

</style>
