<template>
  <div
    class="product-main-info"
    :class="{'visible-content': mobContentVisible}">

    <div class="product-main-info-content">

      <div class="product-main-id"><span>ID товара: {{ productId }}</span></div>

      <div class="product-title">
        <h1 v-html="title"/>
      </div>

      <div class="product-colors">
        <div class="product-colors-block">
          <span
            v-for="color in colors"
            :key="color.id"
            :style="{backgroundColor: color.background}"
            :class="{'active': color.id === selectedColor}"
            @click="$emit('select-color', color.id)"/>
        </div>
      </div>

      <div class="product-buy">
        <button
          class="btn btn-border"
          @click="buyModal = true">Купить от {{ price | priceFilter }} ₽</button>
      </div>

    </div>

    <div
      v-if="gifts ? gifts.length > 0 : false"
      class="product-gifts">

      <div class="product-gifts-left">
        <div class="h3">Подарок</div>
        <p v-html="giftsDescr"/>
      </div>

      <div class="product-gifts-right">
        <div class="gifst-list">
          <div
            v-for="gift in gifts"
            :key="gift.id"
            class="gift-item">
            <img
              :src="gift.imgSrc"
              alt="">
          </div>
        </div>
      </div>

    </div>

    <div
      class="product-buy-modal"
      :class="{'opened': buyModal}">

      <div class="back-link">
        <a
          href="#"
          @click.prevent="buyModal = false"><span class="icon-angle-left"></span>Назад</a>
      </div>

      <div class="product-buy-content">
        <div
          v-for="shop in shops"
          :key="shop.id"
          class="product-buy-shop">
          <div class="product-buy-shop-title">{{shop.shopTitle}}</div>
          <div class="product-buy-shop-price">{{shop.price | priceFilter}} ₽</div>
          <div class="product-buy-shop-footer">
            <ul class="product-buy-shop-del">
              <li v-if="shop.deliveryPrice">Доставка — {{shop.deliveryPrice | priceFilter}} ₽</li>
              <li v-if="shop.pickup">Самовывоз, {{shop.pickup.date | parseDate}} — {{shop.pickup.price | priceFilter}} ₽</li>
            </ul>
            <button class="btn btn-border">Перейти</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ProductInfoMain',
  props: {
    selectedColor: Number
  },
  computed: {
    ...mapState({
      productId: state => state.product.productId,
      title: state => state.product.title,
      colors: state => state.product.colors,
      price: state => state.product.price,
      giftsDescr: state => state.product.giftsDescr,
      gifts: state => state.product.gifts,
      shops: state => state.product.shops
    })
  },
  data: () => ({
    mobContentVisible: false,
    buyModal: false
  }),
  mounted () {
    const scroll = () => {
      const scrY = window.scrollY
      scrY > 30 ? this.mobContentVisible = true : this.mobContentVisible = false
    }
    window.addEventListener('scroll', scroll)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('scroll', scroll))
  }
}
</script>

<style scoped>

</style>
