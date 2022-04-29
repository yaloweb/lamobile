<template>
  <div
    ref="basketTotal"
    class="basket-total"
    v-loading="loading">

    <div class="basket-total-block">

      <div class="h3">Корзина</div>

      <div class="basket-total-prices">
        <ul>
          <li>
            <span>{{ productLength }} {{ productLength | declensionNumbers(['товар', 'товара', 'товаров']) }}</span>
            <span>{{ tweenedTotal.toFixed(0) | priceFilter }} ₽</span>
          </li>
          <li>
            <span>Доставка</span>
            <span>{{ delivery | priceFilter }} ₽</span>
          </li>
          <li class="discount">
            <span>Скидка</span>
            <span>-{{ discount | priceFilter }} ₽</span>
          </li>
        </ul>
      </div>

      <form
        class="basket-total-promocode"
        @submit.prevent>
        <input
          type="text"
          v-model="promocode"
          placeholder="Введите промокод">
        <button
          type="submit"
          :disabled="promocode.trim().length <= 2">
          <span class="icon-angle-right-light"></span>
        </button>
      </form>

      <div class="basket-total-price">
        <span>Итого:</span>
        <span>{{ tweenedFullTotal.toFixed(0) | priceFilter }} ₽</span>
      </div>

      <div class="basket-total-submit">
        <button
          class="btn btn-block btn-border"
          @click="scrollToOrder">Оформить заказ
        </button>
      </div>

    </div>

    <nav class="basket-total-links">
      <nuxt-link
        v-for="(link, idx) in totalNavMenu"
        :key="idx"
        :to="link.url">
        {{ link.title }}
      </nuxt-link>
    </nav>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import { gsap } from 'gsap'

export default {
  name: 'BasketTotal',
  props: {
    loading: Boolean,
    productLength: {
      type: Number,
      default: 0
    },
    delivery: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      products: state => state.basket.products
    }),
    basketTotal () {
      return this.$refs.basketTotal
    },
    getFullTotal () {
      return this.total + (this.delivery || 0) - (this.discount || 0)
    }
  },
  watch: {
    total (val) {
      gsap.to(this.$data, { duration: 0.5, tweenedTotal: val })
    },
    getFullTotal (val) {
      gsap.to(this.$data, { duration: 0.5, tweenedFullTotal: val })
    }
  },
  data: () => ({
    promocode: '',
    basketTotalMob: false,
    tweenedTotal: 0,
    tweenedFullTotal: 0,
    totalNavMenu: [
      { title: 'Условия продажи', url: '/for-users' },
      { title: 'Обмен и возврат товара', url: '/for-users' },
      { title: 'Доставка и оплата', url: '/for-users' },
      { title: 'Гарантии', url: '/for-users' }
    ]
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
    this.tweenedTotal = this.total
    this.tweenedFullTotal = this.getFullTotal
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
