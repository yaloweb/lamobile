<template>
  <div
    class="product-main-info"
    :class="{'not-available': !inStock}">

    <div class="product-main-info-container">

      <div
        v-if="deliveryTime || deliveryGift"
        class="product-main-delivery-info">

        <div
          v-if="deliveryTime"
          class="product-main-delivery-info-item">

          <img
            v-if="pageType === '2'"
            src="/img/icons/delivery-car-time-dark.svg"
            alt="">

          <img
            v-else
            src="/img/icons/delivery-car-time.svg"
            alt="">

          <span>{{ deliveryTime }}</span>

        </div>

        <div
          v-if="deliveryGift"
          class="product-main-delivery-info-item">

          <img
            v-if="pageType === '2'"
            src="/img/icons/delivery-car-gift-dark.svg"
            alt="">

          <img
            v-else
            src="/img/icons/delivery-car-gift.svg"
            alt="">

          <span>{{ deliveryGift }}</span>

        </div>

      </div>

      <div class="product-main-info-content">

        <div class="product-main-id"><span>ID товара: {{ productMainInfo.productId }}</span></div>

        <div class="product-title">
          <h1 v-html="title"/>
        </div>

        <div class="product-colors">
          <div
            class="product-colors-block">
            <span
              v-for="color in colors"
              :key="color.id"
              :style="{backgroundColor: color.background}"
              :class="{'active': color.productId === selectedColor}"
              @click="$emit('select-color', color.productId)"/>
          </div>
          <div class="product-selected-color-title">
            {{ selectedColorObject.title }}
          </div>
        </div>

        <div
          v-if="inStock"
          class="product-main-price">{{ colors ? selectedColorObject.price : price | priceFilter }} ₽</div>

        <div
          v-if="!inStock"
          class="product-main-not-avaliable">Данной модели нет в наличии</div>

        <div
          v-if="inStock"
          class="product-buy">
          <button
            class="btn btn-lg"
            :class="{'loading': addToCardLoading}"
            :disabled="addToCardLoading"
            @click="addToBasket">Добавить в корзину</button>
        </div>

        <FormAdmission
          ref="formAdmission"
          v-if="!inStock"
          :productId="selectedColor"
        />

      </div>

      <div
        v-if="(gifts ? gifts.length > 0 : false) && inStock"
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
                alt=""
              >
            </div>
          </div>
        </div>

      </div>

      <ProductMarketplaces
        v-if="selectedColorObject.marketplace"
        :marketplaces="selectedColorObject.marketplace"
      />

    </div>

    <ProductMobileFooter
      :title="title"
      :loading="addToCardLoading"
      @add-to-basket="addToBasket"
    />

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
      pageType: state => state.product.pageType,
      title: state => state.product.title,
      colors: state => state.product.colors,
      giftsDescr: state => state.product.giftsDescr,
      gifts: state => state.product.gifts,
      deliveryTime: state => state.product.deliveryTime,
      deliveryGift: state => state.product.deliveryGift,
      price: state => state.product.price
    }),
    productMainInfo () {
      const selectedColor = this.colors.filter(item => item.productId === this.selectedColor)[0]
      return {
        productId: selectedColor?.productId,
        price: selectedColor?.price
      }
    },
    selectedColorObject () {
      const res = this.colors.filter(item => item.productId === this.selectedColor)[0]
      return res || {}
    },
    inStock () {
      return this.selectedColorObject.inStock
    }
  },
  data: () => ({
    addToCardLoading: false
  }),
  methods: {
    async addToBasket () {
      if (this.inStock) {
        const data = {
          productId: this.colors ? this.selectedColor : this.item.productId,
          quantity: 1
        }
        this.addToCardLoading = true
        try {
          await this.$store.dispatch('basket/addToBasket', data)
        } finally {
          this.addToCardLoading = false
        }
      } else {
        const formAdmission = this.$refs.formAdmission?.$el
        if (formAdmission) {
          const top = formAdmission.getBoundingClientRect().top
          window.scrollTo({
            top: top + window.pageYOffset - 200,
            left: 0,
            behavior: 'smooth'
          })
        }
      }
    }
  }
}
</script>
