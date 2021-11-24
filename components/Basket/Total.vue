<template>
  <div
    ref="basketTotal"
    class="basket-total"
    v-loading="loading">

    <div
      class="basket-total-mob"
      :class="{'visible': basketTotalMob}">
      <div class="container">
        <div class="basket-total-mob-value">
          <span>Итого {{ total.products.quantity }} {{$options.filters.declensionNumbers(total.products.quantity, ['товар', 'товара', 'товаров'])}} на сумму:</span>
          <span>{{ total.products.price | priceFilter}} ₽</span>
        </div>
        <button
          class="btn btn-block btn-border"
          @click="scrollToOrder">Перейти к оформлению</button>
      </div>
    </div>

    <div class="basket-total-prices">
      <ul>
        <li>
          <span>{{ total.products.quantity }} товар(а)</span>
          <span>{{ total.products.price | priceFilter}} ₽</span>
        </li>
        <li v-if="total.delivery">
          <span>Доставка</span>
          <span>{{ total.delivery | priceFilter }} ₽</span>
        </li>
        <li
          v-if="total.discount"
          class="discount">
          <span>Скидка</span>
          <span>-{{ total.discount | priceFilter }} ₽</span>
        </li>
      </ul>
    </div>

    <form
      class="basket-total-promocode"
      @submit.prevent>
      <input
        type="text"
        v-model="promocode"
        placeholder="Промокод">
      <button
        type="submit"
        :disabled="promocode.trim().length <= 2">
        <span class="icon-angle-right-light"></span>
      </button>
    </form>

    <div class="basket-total-price">
      <span>Итого {{ total.products.quantity }} товар(а)<br>на сумму:</span>
      <span>{{ totalPrice | priceFilter }} ₽</span>
    </div>

    <div class="basket-total-submit">
      <button
        class="btn btn-block btn-border"
        @click="scrollToOrder">Оформить заказ</button>
    </div>

    <nav class="basket-total-links">
      <nuxt-link to="#">Условия продажи</nuxt-link>
      <nuxt-link to="#">Обмен и возврат товара</nuxt-link>
      <nuxt-link to="#">Доставка и оплата</nuxt-link>
      <nuxt-link to="#">Гарантии</nuxt-link>
    </nav>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'BasketTotal',
  props: {
    loading: Boolean
  },
  computed: {
    ...mapState({
      products: state => state.basket.products,
      total: state => state.basket.total
    }),
    totalPrice () {
      return (this.total.products.price + this.total.delivery - this.total.discount)
    },
    basketTotal () {
      return this.$refs.basketTotal
    }
  },
  data: () => ({
    promocode: '',
    basketTotalMob: false
  }),
  methods: {
    getOffsetTop (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (scrollTop + rect.top)
    },
    toggleTotalMob () {
      const offsetTop = this.getOffsetTop(this.basketTotal)
      this.basketTotalMob = window.pageYOffset < (offsetTop - 300)
    },
    scrollToOrder () {
      const block = document.querySelector('.ordering')
      const top = block ? block.getBoundingClientRect().top + window.pageYOffset : 0
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    const events = ['load', 'resize', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, this.toggleTotalMob)
    })
    this.$on('hook:beforeDestroy', () => {
      events.forEach(event => {
        window.removeEventListener(event, this.toggleTotalMob)
      })
    })
  }
}
</script>

<style scoped>

</style>
