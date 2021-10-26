<template>

  <div class="compare-table-block">

    <div class="compare-table-title">
      <div
        class="h1"
        v-html="title"/>
    </div>

    <div class="compare-table">

      <div class="compare-table-parameters">
        <ul>
          <li ref="parameterTitle">Название модели</li>
          <li
            ref="parameter"
            v-for="parameter in parameters"
            :key="parameter.key"
            v-html="parameter.title"/>
        </ul>
      </div>

      <div class="compare-table-items">

        <div class="compare-items-slider">

          <swiper :options="swiperOptions">
            <swiper-slide
              v-for="item in items"
              :key="item.id">

              <div
                ref="product"
                class="compare-item">
                <div class="compare-item-img">
                  <img
                    :src="item.imgSrc"
                    alt="">
                </div>
                <div
                  ref="productTitle"
                  class="compare-item-title"
                  v-html="item.title" />
                <div class="compare-item-parameters">
                  <ul>
                    <li
                      v-for="parameter in parameters"
                      :key="parameter.key">
                      <template v-if="parameter.key === 'colors'">
                        <div class="compare-items-colors">
                          <span
                            v-for="(color, index) in item.parameters.colors"
                            :key="index"
                            :style="{backgroundColor: color}"/>
                        </div>
                      </template>
                      <template v-else>
                        {{ item.parameters[parameter.key] ? (item.parameters[parameter.key].length > 0 ? item.parameters[parameter.key] : '1-') : '-' }}
                      </template>
                    </li>
                  </ul>
                </div>
                <div class="compare-item-btn">
                  <nuxt-link
                    :to="item.url"
                    class="btn btn-border">Подробнее</nuxt-link>
                </div>
              </div>

            </swiper-slide>
          </swiper>

          <div class="slider-scrollbar"/>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  async fetch () {
    await this.$store.dispatch('compare/getCompareData')
  },
  name: 'Table',
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState({
      title: state => state.compare.title,
      parameters: state => state.compare.parameters,
      items: state => state.compare.items
    })
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 600,
      watchSlidesVisibility: true,
      scrollbar: {
        el: '.slider-scrollbar',
        draggable: true
      }
    }
  }),
  methods: {
    eqHeight () {
      const parameterTitle = this.$refs.parameterTitle
      const productTitle = this.$refs.productTitle

      productTitle.forEach(item => {
        item.style.removeProperty('height')
      })

      const parameter = this.$refs.parameter
      const product = this.$refs.product
      let titleHeight = 0

      productTitle.forEach(item => {
        if (item.offsetHeight > titleHeight) {
          titleHeight = item.offsetHeight
        }
      })

      parameterTitle.style.height = `${titleHeight}px`
      productTitle.forEach(item => {
        item.style.height = `${titleHeight}px`
      })
      parameter.forEach((item, index) => {
        product.forEach(group => {
          group.querySelectorAll('.compare-item-parameters li').forEach((prodItem, prodIndex) => {
            if (prodIndex === index) {
              prodItem.style.height = `${item.clientHeight}px`
            }
          })
        })
      })
    }
  },
  mounted () {
    this.eqHeight()
    window.addEventListener('resize', this.eqHeight)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.eqHeight))
  }
}
</script>

<style scoped>

</style>
