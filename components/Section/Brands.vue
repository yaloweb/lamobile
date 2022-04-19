<template>

  <section class="s-brands">
    <div class="container">

      <SliderBrands :list="brands" />

    </div>
  </section>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SectionBrands',
  async fetch () {
    if (this.$store.state.brands.brands.length === 0) {
      return await this.$store.dispatch('brands/getBrands')
    }
  },
  computed: {
    ...mapState({
      brands: state => state.brands.brands
    })
  }
}
</script>

<style scoped>

</style>
