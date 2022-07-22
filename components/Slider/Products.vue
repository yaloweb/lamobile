<template>
  <div class="products-slider">

    <div
      class="products-slider-swiper"
      @mouseenter="setWheelMove"
      @mouseleave="removeWheelMove"
    >

      <swiper
        ref="slider"
        :options="swiperOptions"
      >

        <swiper-slide
          v-for="(slide, idx) in list"
          :key="idx"
        >

          <CatalogItem :item="slide"/>

        </swiper-slide>

      </swiper>

    </div>

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
      type: [Number, String],
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
      },
      wheelPrevent: false
    }
  },
  // computed: {
  //   items () {
  //     if (this.list.length === 1) {
  //       return this.list
  //     }
  //     if (process.browser && window.innerWidth < 576 && this.list.length <= 4) {
  //       const items = []
  //       const checkItems = () => {
  //         if (items.length <= 4) {
  //           items.push(...this.list)
  //           checkItems()
  //         } else {
  //           return false
  //         }
  //       }
  //       checkItems()
  //       return items
  //     }
  //     return this.list
  //   }
  // },
  methods: {
    wheelListener (e) {
      e.preventDefault()
      if (!this.wheelPrevent) {
        const slider = this.$refs.slider?.$swiper
        if (slider) {
          const index = slider.activeIndex
          if (e.deltaY > 0) {
            slider.slideTo(index + 1)
          } else {
            slider.slideTo(index - 1)
          }
        }
        this.wheelPrevent = true
        setTimeout(() => {
          this.wheelPrevent = false
        }, 300)
      }
    },
    setWheelMove () {
      if (window.innerWidth > 992) {
        document.addEventListener('wheel', this.wheelListener, { passive: false })
      }
    },
    removeWheelMove () {
      if (window.innerWidth > 992) {
        document.removeEventListener('wheel', this.wheelListener, { passive: false })
      }
    }
  }
  // mounted () {
  //   if (this.list.length === 1) {
  //     this.swiperOptions.breakpoints[0].loop = false
  //     this.key = 'reinit'
  //   }
  // }
}
</script>

<style scoped>

</style>
