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

          <swiper :options="swiperOptions">

            <swiper-slide
              v-for="(imgList, index) in item.imgSrc"
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

          <div class="product-img-slider-prev slider-prev"><span class="icon-arrow-left"></span></div>
          <div class="product-img-slider-next slider-next"><span class="icon-arrow-right"></span></div>

          <div class="product-img-pagination" slot="pagination"/>

          {{item.colors.background}}

          <div
            v-if="item.colors"
            class="product-img-thumbs-block">
            <div class="product-img-thumbs">
              <div
                v-for="color in item.colors"
                :key="color.id"
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
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      navigation: {
        prevEl: '.product-img-slider-prev',
        nextEl: '.product-img-slider-next'
      },
      pagination: {
        el: '.product-img-pagination',
        type: 'bullets',
        clickable: true
      }
    },
    selectedColor: 0
  }),
  methods: {
    sliderImages (colorId) {
      return this.item.imgSrc.filter(item => item.id === colorId)[0]
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
