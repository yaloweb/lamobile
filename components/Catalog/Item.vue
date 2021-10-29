<template>

  <div
    class="product-item"
    :class="{'disabled': item.inStock === false}">

    <div
      v-if="item.tag || item.inStock === false"
      class="product-item-tag"
      :class="item.tag ? item.tag.color : ''">
      <template v-if="item.inStock === false">
        <a href="#" class="goods-arrival-link">Узнать о поступлении ></a>
      </template>
      <template v-else>
        {{item.tag.title}}
      </template>
    </div>

    <div class="product-item-img">
      <nuxt-link
        :to="item.url"
        :event="item.inStock === false ? '' : 'click'">
        <img
          :src="item.imgSrc"
          alt="">
      </nuxt-link>
    </div>

    <div class="product-item-text">

      <div class="product-item-title">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          {{ item.title }}
        </nuxt-link>
      </div>

      <div class="product-item-price">
        Цена: <span>{{ item.price | priceFilter }} ₽</span>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
