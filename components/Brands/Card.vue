<template>
  <div class="brands-row-item-card">

    <NuxtLink :to="item.url" class="brands-row-item-card-link" />

    <div class="brands-row-item-card-img">

      <template v-if="item.card.imgSrc">
        <video
          v-if="isVideo"
          :src="item.card.imgSrc"
          muted="muted"
          autoplay="autoplay"
          loop
        />
        <img
          v-else
          :src="item.card.imgSrc"
          alt="">
      </template>

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
  },
  computed: {
    isVideo () {
      return this.item.card?.imgSrc.endsWith('.mp4')
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
