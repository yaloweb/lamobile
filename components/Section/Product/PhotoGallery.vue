<template>
  <div class="photo-gallery">

    <div class="photo-gallery-slider">

      <div class="photo-gallery-slider-nav">
        <button
          class="photo-gallery-slider-prev"
          @click="prev"
        />
        <button
          class="photo-gallery-slider-next"
          @click="next"
        />
      </div>

      <div class="photo-gallery-slider-swiper">
        <swiper
          :options="sliderOptions"
          ref="mainSlider"
          @slide-change="selectedItem = mainSlider.activeIndex"
        >
          <swiper-slide
            v-for="(slide, idx) in info.elements"
            :key="idx"
          >
            <img
              :src="slide"
              alt=""
            >
          </swiper-slide>
        </swiper>
      </div>

    </div>

    <div class="photo-gallery-thumbs-swiper">
      <swiper
        :options="sliderThumbsOptions"
        ref="thumbsSlider"
      >
        <swiper-slide
          v-for="(slide, idx) in info.elements"
          :key="idx"
        >
          <img
            :src="slide"
            alt=""
            :class="{'active': idx === selectedItem}"
            @click="selectedItem = idx"
          >
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'PhotoGallery',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    info: Object
  },
  computed: {
    mainSlider () {
      return this.$refs.mainSlider.$swiper
    },
    thumbsSlider () {
      return this.$refs.thumbsSlider.$swiper
    }
  },
  data: () => ({
    sliderOptions: {
      slidesPerView: 1,
      speed: 600
    },
    sliderThumbsOptions: {
      slidesPerView: 'auto',
      spaceBetween: 5,
      breakpoints: {
        1200: {
          spaceBetween: 20
        }
      }
    },
    selectedItem: 0
  }),
  watch: {
    selectedItem (val) {
      this.mainSlider.slideTo(val)
      this.thumbsSlider.slideTo(val)
    }
  },
  methods: {
    prev () {
      if (this.selectedItem > 0) {
        this.selectedItem--
      }
    },
    next () {
      if (this.selectedItem < this.info.elements.length) {
        this.selectedItem++
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
