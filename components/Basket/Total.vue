<template>
  <div
    class="basket-total"
    v-loading="loading">

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
      <button class="btn btn-block">Перейти к оформлению</button>
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
    }
  },
  data: () => ({
    promocode: ''
  })
}
</script>

<style scoped>

</style>
