<template>

  <div
    class="product-item"
    :class="{'disabled': item.inStock === false}">

    <div
      v-if="item.tag"
      class="product-item-tag"
      :class="item.tag.color">
      <template v-if="item.inStock === false">
        <a href="#" class="goods-arrival-link">Узнать о поступлении ></a>
      </template>
      <template v-else>
        {{item.tag.title}}
      </template>
    </div>

    <div class="product-item-img">
      <a :href="item.inStock === false ? false : item.url">
        <img
          :src="item.imgSrc"
          alt="">
      </a>
    </div>

    <div class="product-item-text">

      <div class="product-item-title">
        <a :href="item.inStock === false ? false : item.url">
          {{ item.title }}
        </a>
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
