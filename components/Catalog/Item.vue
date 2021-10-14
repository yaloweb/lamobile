<template>

  <div class="product-item">

    <div
      v-if="item.tag"
      class="product-item-tag"
      :class="item.tag.color">
      {{item.tag.title}}
    </div>

    <div class="product-item-img">
      <a :href="item.url">
        <img
          :src="item.imgSrc"
          alt="">
      </a>
    </div>

    <div class="product-item-text">

      <div class="product-item-title">
        <a :href="item.url">
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
  name: 'Item',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
