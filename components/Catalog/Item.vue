<template>

  <div
    class="product-item"
    :class="{'disabled': item.inStock === false}">

    <div
      v-if="item.tag || item.inStock === false"
      class="product-item-tag"
      :class="item.tag ? item.tag.color : ''">

      <template v-if="item.inStock === false">
        <span class="goods-arrival">Нет в наличии</span>
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

          <button
            v-if="item.imgSrc.length > 1"
            class="product-img-slider-prev"
            @click="slidePrev" />

          <button
            v-if="item.imgSrc.length > 1"
            class="product-img-slider-next"
            @click="slideNext" />

          <div class="product-img-pagination" slot="pagination"/>

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

      <div
        v-if="item.inStock !== false"
        class="product-item-footer">

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

        <div class="product-item-price">
          <span>{{ item.price | priceFilter }} ₽</span>
        </div>

        <div
          class="product-item-add-to-cart">
          <button
            class="product-item-add-to-cart-btn"
            v-tooltip.top="'В корзину'"
            @click="addToBasket"
            :disabled="addToCardLoading">
            <span class="icon-bag"></span>
          </button>
        </div>

      </div>

      <div
        v-else
        class="product-item-not-available-btn">
        <button class="btn btn-border btn-block">Узнать о поступлении</button>
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
    haveColors () {
      return this.item.colors
    },
    currentColor () {
      return this.item.colors?.filter(item => item.id === this.selectedColor)[0]
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
    selectedColor: 0,
    addToCardLoading: false
  }),
  methods: {
    slidePrev () {
      this.$refs.gallerySlider.$swiper.slidePrev()
    },
    slideNext () {
      this.$refs.gallerySlider.$swiper.slideNext()
    },
    async addToBasket () {
      const data = {
        productId: this.haveColors ? this.currentColor.productId : this.item.productId,
        quantity: 1
      }
      this.addToCardLoading = true
      try {
        await this.$store.dispatch('basket/addToBasket', data)
      } catch (e) {
        alert(e)
      } finally {
        this.addToCardLoading = false
      }
    }
  },
  mounted () {
    if (this.haveColors) {
      this.selectedColor = this.item.colors[0].id
    }
  }
}
</script>

<style scoped>
</style>
