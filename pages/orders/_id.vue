<template>
  <div class="order-page">

    <UIBreadcrumbs/>

    <section class="s-order">
      <div class="container">

        <div class="page-title">

          <div class="page-back-link">
            <nuxt-link to="/orders">
              <span class="icon-angle-left-light"/> К моим заказам
            </nuxt-link>
          </div>

          <h1>Заказ №{{order.number}}</h1>

          <p>от {{ parseDate(order.createdAt) }}</p>

        </div>

        <div class="order-products-list">

          <OrderProduct
            v-for="product in order.products"
            :key="product.id"
            :item="product"/>

        </div>

      </div>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Order',
  async fetch () {
    const number = this.$route.params.id
    return await this.$store.dispatch('orders/getCurrentOrder', number)
  },
  computed: {
    ...mapState({
      order: state => state.orders.currentOrder
    })
  },
  methods: {
    parseDate (date) {
      const mDate = moment(date).locale('ru')
      return mDate.format('DD MMMM YYYY')
    }
  }
}
</script>

<style scoped>

</style>
