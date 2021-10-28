<template>
  <section class="s-product-advantages">
    <div class="container">

      <div class="advantages">

        <div
          v-for="advantage in advantages"
          :key="advantage.id"
          class="advantages-item"
          :class="{'wide': advantage.wide, 'no-text': !advantage.title && !advantage.descr }">
          <div class="advantages-item-img">
            <img
              :src="advantage.imgSrc"
              alt="">
          </div>
          <div class="advantages-item-content">
            <div
              v-if="advantage.title ? advantage.title.length > 0 : false"
              class="h2"
              v-html="advantage.title"/>
            <p
              v-if="advantage.descr ? advantage.descr.length > 0 : false"
              v-html="advantage.descr"/>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ProductSectionAdvantages',
  computed: {
    ...mapState({
      advantages: state => state.product.advantages
    })
  }
}
</script>

<style scoped>

</style>
