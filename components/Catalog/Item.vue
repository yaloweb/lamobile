<template>

  <div
    class="product-item"
    :class="{'disabled': item.inStock === false}">

    <div
      v-if="item.tag || item.inStock === false"
      class="product-item-tag"
      :class="item.tag ? item.tag.color : ''">
      <template v-if="item.inStock === false">
        <a href="#" class="goods-arrival-link">Узнать о поступлении ></a>
      </template>
      <template v-else>
        {{item.tag.title}}
      </template>
    </div>

    <div
      class="product-item-img"
      :class="{'is-slider': Array.isArray(item.imgSrc)}">

      <template v-if="Array.isArray(item.imgSrc)">

        <div class="product-item-img-slider">

          <swiper
            ref="gallerySlider"
            :options="swiperOptions">

            <swiper-slide
              v-for="(imgList, index) in imageFilterByColor"
              :key="index">
              <div class="product-item-img-slider-img">
                <img
                  v-for="(img, imgIndex) in imgList"
                  :key="`img.id-${imgIndex}`"
                  :src="img.imgSrc"
                  :class="{'active': img.color === selectedColor}"
                  alt="">
              </div>
            </swiper-slide>

          </swiper>

          <button
            class="product-img-slider-prev slider-prev"
            @click="slidePrev">
            <span class="icon-arrow-left" />
          </button>

          <button
            class="product-img-slider-next slider-next"
            @click="slideNext">
            <span class="icon-arrow-right" />
          </button>

          <div
            v-if="item.colors"
            class="product-img-thumbs-block">
            <div class="product-img-thumbs">
              <div
                v-for="(color, idx) in item.colors"
                :key="idx"
                class="product-img-thumb"
                :class="{active: selectedColor === color.id}"
                @click="selectedColor = color.id"
                :style="{backgroundColor: color.background}"/>
            </div>
          </div>

        </div>

      </template>

      <template v-else>

        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          <img
            :src="item.imgSrc"
            alt="">
        </nuxt-link>

      </template>

    </div>

    <div class="product-item-text">

      <div class="product-item-title">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          {{ item.title }}
        </nuxt-link>
      </div>

      <div class="product-item-footer">

        <div class="product-item-price">
          Цена: <span>{{ item.price | priceFilter }} ₽</span>
        </div>

        <div class="product-item-add-to-cart">
          <button
            class="product-item-add-to-cart-btn"
            v-tooltip.top="'В корзину'">
            <span class="icon-bag"></span>
          </button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'CatalogItem',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    item: Object
  },
  computed: {
    imageFilterByColor () {
      let res = []
      for (let i = 0; i < this.item.imgSrc[0].length; i++) {
        let a = []
        this.item.colors.forEach(item => {
          a.push({
            color: item.id
          })
        })
        res.push(a)
      }
      this.item.imgSrc.forEach((item, index) => {
        item.forEach((subItem, subIndex) => {
          res[subIndex]?.forEach((resItem) => {
            if (resItem.color === subItem.color) {
              resItem.imgSrc = subItem.imgSrc
            }
          })
        })
      })
      return res
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      pagination: {
        el: '.product-img-pagination',
        type: 'bullets',
        clickable: true
      }
    },
    componentIsMounted: false,
    selectedColor: 0
  }),
  methods: {
    slidePrev () {
      this.$refs.gallerySlider.$swiper.slidePrev()
    },
    slideNext () {
      this.$refs.gallerySlider.$swiper.slideNext()
    }
  },
  mounted () {
    if (Array.isArray(this.item.imgSrc)) {
      this.selectedColor = this.item.colors[0].id
    }
  }
}
</script>

<style scoped>

</style>
