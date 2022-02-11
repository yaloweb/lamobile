<template>

  <section class="s-brands">
    <div class="container">

      <div class="brands-row">

        <div
          v-for="brand in brands"
          :key="brand.id"
          class="brands-row-item">

          <div class="brands-row-item-img">
            <nuxt-link
              :to="brand.url">
              <img
                :src="brand.imgSrc"
                alt="">
            </nuxt-link>
          </div>

          <div class="brands-row-item-card">

            <div class="brands-row-item-card-img">
              <img
                :src="brand.card.imgSrc"
                alt="">
            </div>

            <div class="brands-row-item-card-content">
              <img
                :src="brand.imgSrc"
                alt="">
              <p v-html="brand.card.descr"/>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    if (this.$store.state.brands.brands.length === 0) {
      return await this.$store.dispatch('brands/getBrands')
    }
  },
  computed: {
    ...mapState({
      brands: state => state.brands.brands
    })
  },
  name: 'SectionBrands'
}
</script>

<style scoped>

</style>
