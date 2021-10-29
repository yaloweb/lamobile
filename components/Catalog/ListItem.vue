<template>

  <div
    class="product-list-view"
    :class="{'disabled': item.inStock === false}">
    <div class="product-list-view-row">

      <div class="product-list-view-img">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          <img
            v-if="!item.colors"
            :src="item.imgSrc"
            alt="">
          <div
            v-else
            class="product-colors-images">
            <img
              v-for="img in item.colorsImages"
              :key="img.id"
              :class="{'active': selectedColor === img.color}"
              :src="img.imgSrc"
              alt="">
          </div>
        </nuxt-link>
      </div>

      <div class="product-list-view-id">ID товара: <br>{{item.productId}}</div>

      <div class="product-list-view-title">
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
        v-if="item.colors"
        class="product-list-view-colors">
        <div class="product-colors-block">
          <span
            v-for="color in item.colors"
            :key="color.id"
            :style="{backgroundColor: color.background}"
            :class="{'active': color.id === selectedColor}"
            @click="selectedColor = color.id"/>
        </div>
      </div>

      <div class="product-list-view-qnt">
        <span v-if="item.inStock !== false">{{item.quantity}}</span>
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
  },
  data: () => ({
    selectedColor: 1
  })
}
</script>

<style scoped>

</style>
