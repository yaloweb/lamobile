<template>
  <div class="brands-row-item-card">

    <NuxtLink :to="item.url" class="brands-row-item-card-link" />

    <div class="brands-row-item-card-img">

      <img
        v-if="item.card.imgSrc"
        :src="item.card.imgSrc"
        alt="">

      <div
        v-else
        class="brands-row-item-card-img-no-picture">
        <img src="/img/icons/photo-camera.png" alt="">
        <span>Нет изображения</span>
      </div>

    </div>

    <div class="brands-row-item-card-content">

      <img
        v-if="item.imgSrc && item.imgSrc.length"
        :src="item.imgSrc"
        alt="">

      <div
        v-else
        class="h4">
        {{ item.title }}
      </div>

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
