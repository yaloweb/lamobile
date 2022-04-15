<template>
  <div class="gallery-img-with-text">

    <SectionProductTitle :info="info"/>

    <div
      class="gallery-img-with-text-slider"
      :class="{'wide': info.imagesWide}">
      <swiper :options="options">

        <swiper-slide
          v-for="element in info.elements"
          :key="element.id"
        >
          <div class="gallery-img-with-text-slider-item">
            <img
              :src="element.img"
              alt=""
            >
            <div
              v-if="element.title"
              class="h3"
              v-html="element.title"
            />
          </div>
        </swiper-slide>

      </swiper>
    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'GalleryImgWithText',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    info: Object
  },
  data: () => ({
    options: {
      slidesPerView: 'auto',
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      breakpoints: {
        992: {
          spaceBetween: 20
        },
        1600: {
          spaceBetween: 50
        }
      }
    }
  })
}
</script>

<style
  lang="sass"
  scoped>

</style>
