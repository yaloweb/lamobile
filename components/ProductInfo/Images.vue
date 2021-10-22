<template>

  <div
    class="product-main-img"
    :class="{'only-one': productImages.length === 1}">

    <div
      v-if="productImages.length > 1 && !isMob"
      class="product-main-img-slider">

      <swiper :options="swiperOptions">

        <swiper-slide
          v-for="(slide, index) in this.slidesArr"
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

    <div
      v-else-if="productImages.length > 1 && isMob"
      class="product-main-img-scroll"
      :class="{'length-3': this.productImages.length === 3}">

      <div
        v-for="(item, itemIndex) in this.productImages"
        :key="itemIndex"
        class="product-main-img-container"
        :class="{'wide': item.wide}">
        <img
          v-for="img in item.list"
          :key="img.id"
          :class="{'visible': img.color === selectedColor}"
          :src="img.imgSrc"
          alt="">
      </div>

    </div>

    <div
      v-else
      class="product-main-img-container">
      <img
        v-for="img in productImages[0].list"
        :key="img.id"
        :class="{'visible': img.color === selectedColor}"
        :src="img.imgSrc"
        alt="">
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
        } else {
          if (item.wide) {
            if (res[count].length > 0) {
              count++
              res[count].push(item)
              count++
            } else {
              res[count].push(item)
              count++
            }
          } else {
            if (res[count].length === 2) {
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
          }
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
    isMob: false
  }),
  methods: {
    sliderIterator (i) {
      let arr = []
      // const a = i * 2 - 1
      // const b = i * 2
      // if (this.productImages[a].wide) {
      //   arr = arr[a]
      //   return arr
      // }
      // if (this.productImages[b].wide) {
      //   arr = arr[b]
      //   return arr
      // }
      arr.push(i * 2 - 1)
      if ((i * 2) <= this.productImages.length) {
        arr.push(i * 2)
      }
      return arr
    },
    checkDevice () {
      window.innerWidth < 576 ? this.isMob = true : this.isMob = false
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
