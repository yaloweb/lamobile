<template>

  <div class="basket-page">

    <UIBreadcrumbs/>

    <div class="page-title">
      <div class="container">
        <h1>Корзина</h1>
      </div>
    </div>

    <section class="s-basket">
      <div class="container">

        <div class="basket-row">

          <div class="basket-main">

            <div
              class="basket-list"
              v-loading="updateBasket">

              <BasketItem
                v-for="product in products"
                :key="product.id"
                :item="product"
                @delete-product="deleteProduct(product.id)"
              />

            </div>

            <BasketOrdering
              :loading="updateBasket"/>

          </div>

          <BasketTotal
            :loading="updateBasket"/>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('basket/getBasketData')
  },
  name: 'Basket',
  computed: {
    ...mapState({
      products: state => state.basket.products
    })
  },
  data: () => ({
    updateBasket: false
  }),
  methods: {
    async deleteProduct (id) {
      this.updateBasket = true
      await this.$store.dispatch('basket/deleteProduct')
      this.updateBasket = false
    }
  }
}
</script>

<style scoped>

</style>
