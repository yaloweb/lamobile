<template>

  <section class="s-brands">
    <div class="container">

      <div class="brands-row">

        <div
          v-for="brand in brands"
          :key="brand.id"
          class="brands-row-item">
          <img
            :src="brand.imgSrc"
            alt="">
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
      await this.$store.dispatch('brands/getBrands')
    }
  },
  computed: {
    ...mapState({
      brands: state => state.brands.brands
    })
  },
  name: 'Brands'
}
</script>

<style scoped>

</style>
