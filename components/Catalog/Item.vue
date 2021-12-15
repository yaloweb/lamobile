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
      class="product-item-img">

      <template v-if="Array.isArray(item.imgSrc)">

        <div class="product-item-img-slider">

          <swiper :options="swiperOptions">

            <swiper-slide
              v-for="(img, index) in item.imgSrc"
              :key="index">
              <div class="product-item-img-slider-img">
                <img
                  :src="img.images[0]"
                  alt="">
              </div>
            </swiper-slide>

          </swiper>

          <div class="product-img-slider-prev slider-prev"><span class="icon-arrow-left"></span></div>
          <div class="product-img-slider-next slider-next"><span class="icon-arrow-right"></span></div>

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

      <div class="product-item-price">
        Цена: <span>{{ item.price | priceFilter }} ₽</span>
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
      speed: 600
    }
  })
}
</script>

<style scoped>

</style>
