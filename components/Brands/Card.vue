<template>
  <div class="brands-row-item-card">

    <a :href="item.url" class="brands-row-item-card-link" />

    <div class="brands-row-item-card-img">
      <img
        :src="item.card.imgSrc"
        alt="">
    </div>

    <div class="brands-row-item-card-content">
      <img
        :src="item.imgSrc"
        alt="">
      <p v-html="item.card.descr"/>

      <div class="brands-row-item-card-mob-link" />

    </div>

  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
