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

              <CatalogListItem
                v-for="product in products"
                :key="product.id"
                ref="product"
                :item="product"
                :index="product.id"
                :deleteButton="true"
                @delete="deleteFromBasket(product.id)"
                @change-selected-items="changeSelectedProducts(product, $event)"/>

              <div
                v-if="gifts.list.length > 0"
                class="basket-gifts-block">

                <div class="basket-gifts-block-text">
                  <div class="h5">Подарок</div>
                  <p v-html="gifts.descr"/>
                </div>

                <div class="basket-gifts-block-items">
                  <div
                    v-for="item in gifts.list"
                    :key="item.id"
                    class="basket-gifts-block-item">
                    <img
                      :src="item.imgSrc"
                      alt="">
                  </div>
                </div>

              </div>

            </div>

            <BasketOrdering
              :loading="updateBasket"/>

          </div>

          <BasketTotal
            :loading="updateBasket"
            :productLength="getProductsTotal.quantity"
            :delivery="500"
            :discount="490"
            :total="getProductsTotal.price"
          />

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
      products: state => state.basket.products,
      gifts: state => state.basket.gifts
    }),
    getProductsTotal () {
      let price = 0
      let quantity = 0

      this.selectedProducts.forEach(item => {
        if (item.colors) {
          item.colors.forEach(color => {
            price += color.inBasket * color.price
            quantity += color.inBasket
          })
        } else {
          price += item.inBasket * item.price
          quantity += item.inBasket
        }
      })

      return {
        price,
        quantity
      }
    }
  },
  watch: {
    products () {
      this.setSelectedProducts()
    }
  },
  data: () => ({
    updateBasket: false,
    selectedProducts: []
  }),
  methods: {
    async deleteFromBasket (id) {
      this.updateBasket = true
      await this.$store.dispatch('basket/deleteProduct')
      this.updateBasket = false
    },
    changeSelectedProducts (product, data) {
      this.selectedProducts.forEach(item => {
        if (item.id === product.id) {
          if (product.colors) {
            data.selectedItems?.forEach((selItem, selIndex) => {
              item.colors[selIndex].inBasket = selItem
            })
          } else {
            item.inBasket = data.selectedItemsOnlyOne
          }
        }
      })
    },
    setSelectedProducts () {
      this.products.forEach(product => {
        let item = {}

        if (this.selectedProducts.filter(a => a.id === product.id)[0]) {
          return false
        }

        item.id = product.id

        if (product.colors) {
          item.colors = product.colors.map(item => {
            return {
              productId: item.productId,
              inBasket: item.inBasket,
              price: item.price
            }
          })
        } else {
          item.productId = product.productId
          item.inBasket = product.inBasket
          item.price = product.price
        }

        this.selectedProducts.push(item)
      })
    }
  },
  mounted () {
    this.setSelectedProducts()
  }
}
</script>

<style scoped>

</style>
