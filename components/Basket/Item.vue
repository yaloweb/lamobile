<template>
  <div
    class="basket-item product-list-view"
    :class="{'disabled': item.inStock === false}">
    <div class="product-list-view-row">

      <div class="product-list-view-img">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          <img
            :src="item.imgSrc"
            alt="">
        </nuxt-link>
      </div>

      <div class="product-list-view-title">
        <div class="h6">
          <nuxt-link
            :to="item.url"
            :event="item.inStock === false ? '' : 'click'"
            v-text="item.title" />
        </div>
      </div>

      <div
        v-if="item.colors && item.inStock !== false"
        class="product-colors-qnt">
        <div
          v-for="color in item.colors"
          :key="color.id"
          class="product-color-item">
          <div
            class="product-color-item-texture"
            :class="{'with-border': color.withBorder}"
            :style="{backgroundColor: color.background}"/>
          <div
            class="product-color-item-quantity"
            :class="{'disabled': color.quantity === undefined || color.quantity === 0}">{{ color.quantity }}</div>
          <div
            v-if="color.quantity !== undefined && color.quantity !== 0"
            class="product-color-item-price">{{ color.price | priceFilter }} ₽</div>
        </div>
      </div>

      <div
        v-if="item.inStock !== false"
        class="product-list-view-price">
        <span>Итого {{ item.price | priceFilter }} ₽</span>
      </div>

      <div class="product-list-view-delete">
        <a
          href="#"
          @click.prevent="deleteProduct">Удалить <span class="icon-close-small"></span></a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketItem',
  props: {
    item: Object
  },
  methods: {
    deleteProduct () {
      this.$emit('delete-product')
    }
  }
}
</script>

<style scoped>

</style>
