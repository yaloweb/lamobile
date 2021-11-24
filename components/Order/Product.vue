<template>

  <div class="order-product">

    <div class="order-product-img">
      <nuxt-link :to="item.url">
        <img
          :src="item.imgSrc"
          alt="">
      </nuxt-link>
    </div>

    <div class="order-product-title">
      <nuxt-link :to="item.url">
        {{ item.title }}
      </nuxt-link>
    </div>

    <div class="order-product-color">
      <div class="product-colors-qnt">
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
            :class="{'disabled': color.quantity === undefined || color.quantity === 0}">{{ color.quantity }}
          </div>
          <div
            v-if="color.quantity !== undefined && color.quantity !== 0"
            class="product-color-item-price">{{ color.price | priceFilter }} ₽
          </div>
        </div>
      </div>
    </div>

    <div class="order-product-price">{{ item.price }}</div>

    <div class="order-product-add-to-cart">
      <div
        v-if="item.inStock !== false"
        class="product-list-view-cart">
        <button class="btn btn-border">Добавить в корзину</button>
      </div>

      <div
        v-if="item.inStock === false"
        class="product-list-view-inquire">
        <a href="#">Узнать о поступлении></a>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'OrderProduct',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
