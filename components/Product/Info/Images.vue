<template>

  <div
    class="product-main-img"
    :class="{'only-one': productImages.length === 1 ? productImages[0].list.length === 1 : false}">

    {{ selectedColor }}

    <div
      v-if="severalImages"
      class="img-full-slider"
      :class="{visible: fullImageScreen || isMob}">

      <div
        v-for="(productImagesGroup, idx) in productImages"
        :key="idx"
        class="img-full-slider-list"
        :class="{'visible': productImagesGroup.productId === selectedColor}">

        <swiper
          v-if="productImagesGroup.list.length"
          :ref="`imgFullSliderList${idx}`"
          :options="getFullSliderOptions(idx)">
          <swiper-slide
            v-for="(slide, index) in productImagesGroup.list"
            :key="index">
            <div
              :class="{visible: index === selectedImageIndex}"
              class="img-full-slider-list-container">
              <img
                :src="slide.imgSrc"
                class="visible"
                alt="">
            </div>
          </swiper-slide>
        </swiper>

        <ProductNoPicture v-else />

        <div
          v-show="productImagesGroup.list.length"
          class="img-full-slider-prev"
          :data-slider="idx"/>

        <div
          v-show="productImagesGroup.list.length"
          class="img-full-slider-next"
          :data-slider="idx"/>

        <div
          v-show="productImagesGroup.list.length"
          class="img-full-slider-list-pagination"
          :data-slider="idx"/>

      </div>

    </div>

    <div
      v-if="severalImages && !isMob"
      class="product-main-img-slider">

      <div
        v-if="!isMob"
        class="product-main-img-swiper"
        :class="{visible: !fullImageScreen || isMob}">

        <div
          v-for="(productImagesGroup, idx) in productImages"
          :key="idx"
          class="product-main-img-swiper-block"
          :class="{'visible': productImagesGroup.productId === selectedColor}">

          <swiper
            v-if="productImagesGroup.list.length > 1"
            :options="getProductImagesSwiperOptions(idx)">

            <swiper-slide
              v-for="(slide, index) in slidesArr(productImagesGroup.list)"
              :key="index">

              <div
                v-for="(item, itemIndex) in slide"
                :key="itemIndex"
                class="product-main-img-container">
                <img
                  class="visible"
                  :src="item.imgSrc"
                  alt="">
              </div>

            </swiper-slide>

          </swiper>

          <ProductNoPicture v-else-if="productImagesGroup.list.length === 0" />

          <div
            v-else
            class="product-main-img-container">
            <template v-if="productImagesGroup.list[0]">
              <img
                class="visible"
                :src="productImagesGroup.list[0].imgSrc"
                alt="">
            </template>
          </div>

          <div
            v-if="productImagesGroup.list.length > 1"
            class="product-img-nav">
            <div class="slider-prev product-img-nav-prev" :data-slider="idx"><span class="icon-arrow-left"/></div>
            <div class="slider-next product-img-nav-next" :data-slider="idx"><span class="icon-arrow-right"/></div>
          </div>

        </div>

      </div>

    </div>

    <div
      v-else-if="!isMob && productImages.length === 1 ? productImages[0].list.length === 1 : false"
      class="product-main-img-container">
      <template v-if="productImages[0]">
        <img
          class="visible"
          :src="productImages[0].list[0] ? productImages[0].list[0].imgSrc : null"
          alt="">
      </template>
    </div>

    <div
      v-if="severalImages"
      class="product-main-img-full-btn"
      @click="fullImageScreen = !fullImageScreen">
      <span class="icon-search"/>
    </div>

    <ProductNoPicture v-if="notImage" />

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
    severalImages () {
      return this.productImages.length > 1 ? true : !!this.productImages[0]?.list.length
    },
    notImage () {
      return !this.productImages.filter(item => item.list.length > 0).length
    }
  },
  data: () => ({
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
    },
    getSlidesLength (array) {
      const wideLength = array.filter(item => item.wide).length
      return Math.ceil((array.length - wideLength) / 2 + wideLength)
    },
    slidesArr (array) {
      let res = []
      let count = 0
      for (let i = 0; i < this.getSlidesLength(array); i++) {
        res.push([])
      }
      array.forEach((item, index) => {
        if (array.length === 3) {
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
    },
    getProductImagesSwiperOptions (idx) {
      return {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 25,
        speed: 600,
        navigation: {
          nextEl: `.product-img-nav-next[data-slider="${idx}"]`,
          prevEl: `.product-img-nav-prev[data-slider="${idx}"]`
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
      }
    },
    getFullSliderOptions (idx) {
      return {
        slidesPerView: 1,
        speed: 600,
        pagination: {
          el: `.img-full-slider-list-pagination[data-slider="${idx}"]`
        },
        navigation: {
          nextEl: `.img-full-slider-next[data-slider="${idx}"]`,
          prevEl: `.img-full-slider-prev[data-slider="${idx}"]`
        },
        breakpoints: {
          0: {
            spaceBetween: 5
          },
          576: {
            spaceBetween: 0
          }
        }
      }
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
