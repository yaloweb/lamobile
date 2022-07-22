<template>
  <nav
    v-if="filters.length"
    class="catalog-filter-nav"
    :class="position"
  >

    <swiper
      ref="slider"
      :options="swiperOptions"
      @reach-beginning="reachBeginning"
      @transition-start="beforeSlideChangeStart"
    >
      <swiper-slide
        v-for="filterItem in filters"
        :key="filterItem.id"
      >
        <a
          href="#"
          ref="category"
          :class="{'active': selected === filterItem.id}"
          @click.prevent="select(filterItem.id)">
          {{ filterItem.title }}
        </a>
      </swiper-slide>
    </swiper>

  </nav>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SliderFilterNav',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    filters: Array,
    selected: [String, Number]
  },
  data: () => ({
    position: 'start',
    swiperOptions: {
      slidesPerView: 'auto'
    }
  }),
  methods: {
    reachBeginning () {
      setTimeout(() => {
        this.position = 'start'
      }, 100)
    },
    beforeSlideChangeStart () {
      this.position = 'middle'
    },
    select (id) {
      this.$emit('select', id)
    }
  }
}
</script>
