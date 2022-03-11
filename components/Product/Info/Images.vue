<template>

  <div
    class="product-main-img"
    :class="{'only-one': productImages.length === 1}">

    <div
      v-if="productImages.length > 1"
      class="img-full-slider"
      :class="{visible: fullImageScreen}">

      <div
        class="img-full-slider-prev"
        @click="goToSlide('prev')"/>

      <div
        class="img-full-slider-next"
        @click="goToSlide('next')"/>

      <div class="img-full-slider-list">
        <div
          v-for="(slide, index) in productImages"
          :key="index"
          :class="{visible: index === selectedImageIndex}"
          class="img-full-slider-list-container"
          @click="fullImageScreen = false">
          <img
            v-for="img in slide.list"
            :key="img.id"
            :src="img.imgSrc"
            :class="{'visible': img.color === selectedColor}"
            alt="">
        </div>
      </div>
    </div>

    <div
      v-if="productImages.length > 1 && !isMob"
      class="product-main-img-slider">

      <div
        class="product-main-img-swiper"
        :class="{visible: !fullImageScreen}">

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
                @click="selectIndexById(img.id)"
                alt="">
            </div>

          </swiper-slide>

        </swiper>

        <div class="slider-prev product-img-nav-prev"><span class="icon-arrow-left"></span></div>
        <div class="slider-next product-img-nav-next"><span class="icon-arrow-right"></span></div>

      </div>

    </div>

    <div
      v-else-if="productImages.length > 1 && isMob"
      class="product-main-img-scroll"
      :class="{'length-3': productImages.length === 3}"
      @click="popup = true">

      <div
        v-for="(item, itemIndex) in productImages"
        :key="itemIndex"
        class="product-main-img-container"
        :class="{'wide': item.wide}"
        @click="selectedImageIndex = itemIndex">
        <img
          v-for="img in item.list"
          :key="img.id"
          :class="{'visible': img.color === selectedColor}"
          :src="img.imgSrc"
          @click="selectIndexById(img.id)"
          alt="">
      </div>

    </div>

    <div
      v-else
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
  watch: {
    selectedImageIndex (newVal) {
      console.log(newVal)
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
    isMob: false,
    selectedImageIndex: 0,
    fullImageScreen: false
  }),
  methods: {
    checkDevice () {
      window.innerWidth < 576 ? this.isMob = true : this.isMob = false
    },
    selectIndexById (id) {
      this.productImages.forEach((item, index) => {
        const hasId = item.list.filter(listItem => listItem.id === id).length > 0
        if (hasId) {
          this.selectedImageIndex = hasId ? index : 0
        }
      })
      this.fullImageScreen = true
    },
    goToSlide (to) {
      if (to === 'prev') {
        if (this.selectedImageIndex !== 0) {
          this.selectedImageIndex--
        } else {
          this.selectedImageIndex = this.productImages.length - 1
        }
      }
      if (to === 'next') {
        if (this.selectedImageIndex < this.productImages.length - 1) {
          this.selectedImageIndex++
        } else {
          this.selectedImageIndex = 0
        }
      }
    }
  },
  mounted () {
    this.checkDevice()
    window.addEventListener('resize', this.checkDevice)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.checkDevice))
    console.log(this.productImages)
  }
}
</script>

<style scoped>

</style>
