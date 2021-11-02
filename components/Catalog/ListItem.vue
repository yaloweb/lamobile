<template>

  <div
    class="product-list-view"
    :class="{'disabled': item.inStock === false}">
    <div class="product-list-view-row">

      <div
        v-if="item.tag"
        class="product-list-view-tag mob"
        :class="item.tag.color"
        v-text="item.tag.title"/>

      <div class="product-list-view-img">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          <img
            :src="item.imgSrc"
            alt="">
        </nuxt-link>
      </div>

      <div class="product-list-view-id">ID товара: <br>{{item.productId}}</div>

      <div class="product-list-view-title">
        <div class="product-list-view-id mob">ID товара: {{item.productId}}</div>
        <div
          v-if="item.tag"
          class="product-list-view-tag"
          :class="item.tag.color"
          v-text="item.tag.title"/>
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
        <span>{{ item.price | priceFilter }} ₽</span>
      </div>

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
  name: 'CatalogListItem',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
