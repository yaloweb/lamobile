<template>
  <div class="orders-page">

    <UIBreadcrumbs/>

    <section class="s-orders">
      <div class="container">

        <div class="page-title">

          <div class="page-back-link">
            <nuxt-link to="/catalog">
              <span class="icon-angle-left-light"/> В каталог
            </nuxt-link>
          </div>

          <h1>Мои заказы</h1>
        </div>

        <div class="orders-list">

          <OrderListItem
            v-for="order in orders"
            :key="order.id"
            :item="order"/>

        </div>

      </div>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    return await this.$store.dispatch('orders/getOrdersList')
  },
  name: 'Orders',
  computed: {
    ...mapState({
      orders: state => state.orders.list
    })
  }
}
</script>

<style scoped>

</style>
