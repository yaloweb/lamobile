<template>

  <div class="basket-page">

    <UIBreadcrumbs/>

    <div class="container">
      <UIPageTitle title="Корзина" />
    </div>

    <section
      v-if="products.length"
      class="s-basket">
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
                @delete="deleteFromBasket(product.id)"
                @change-selected-items="changeSelectedProducts(product, $event)"/>

              <div
                v-if="gifts.length ? gifts.list.length > 0 : false"
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

            <div id="forpvz"></div>

            <BasketRecommended
              v-if="recommended"
              :list="recommended"
            />

            <BasketOrdering
              :loading="updateBasket"/>

          </div>

          <BasketTotal
            :loading="updateBasket"
            :productLength="total.products.quantity"
            :delivery="total.products.delivery"
            :discount="total.products.discount"
            :total="total.products.price"
          />

        </div>

      </div>
    </section>

    <section
      v-else
      class="basket-empty">

      <div class="error">

        <div class="h2">Корзина пуста</div>

        <img
          src="/img/logo-lion.svg"
          alt="">

        <nav class="error-nav">
          <div class="h4">Посмотрите предложения на главной странице, воспользуйтесь каталогом или поиском</div>
          <ul>
            <li>
              <nuxt-link to="/">Главная</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/catalog">Каталог</nuxt-link>
            </li>
          </ul>
        </nav>

      </div>

    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'Basket',
  head: {
    bodyAttrs: {
      class: 'basket-page-body'
    },
    script: [
      {
        id: 'ISDEKscript',
        type: 'text/javascript',
        src: 'https://widget.cdek.ru/widget/widjet.js'
      }
    ]
  },
  mixins: [breadcrumbs],
  computed: {
    ...mapState({
      products: state => state.basket.products,
      total: state => state.basket.total,
      recommended: state => state.basket.recommended,
      gifts: state => state.basket.gifts
    })
  },
  watch: {
    products () {
      this.setSelectedProducts()
    }
  },
  data: () => ({
    updateBasket: false,
    selectedProducts: [],
    breadcrumbs: [
      {
        title: 'Корзина'
      }
    ]
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

    // if (window.ISDEKWidjet) {
    //   const cdek = window.ISDEKWidjet({
    //     defaultCity: 'Новосибирск',
    //     cityFrom: 'Омск',
    //     country: 'Россия',
    //     link: 'forpvz'
    //   })
    //
    //   console.log(cdek)
    // }
  }
}
</script>

<style scoped>

</style>
