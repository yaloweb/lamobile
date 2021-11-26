<template>

  <div
    class="product-page"
    :class="{'dark': pageType === 2}">

    <UIBreadcrumbs/>

    <section class="s-product">
      <div class="container">

        <div class="product-main">

          <ProductInfoImages :selectedColor="selectedColor"/>

          <ProductInfoMain
            :selectedColor="selectedColor"
            @select-color="selectedColor = $event"/>

        </div>

      </div>
    </section>

    <SectionProductVideo v-if="youtubeVideo.id ? youtubeVideo.id.length > 0 : false"/>

    <SectionProductAdditionalAdvantages v-if="Object.keys(additionalAdvantages).length"/>

    <SectionProductAdvantages v-if="advantages ? advantages.length > 0 : false"/>

    <SectionProductOperation v-if="Object.keys(operation).length"/>

    <section
      v-if="compareSection"
      class="s-product-compare">
      <div class="container">

        <CompareTable/>

      </div>
    </section>

    <SectionProductFeatures ref="SectionProductFeatures"/>

    <section class="s-recommended">
      <div class="container">

        <div class="section-title">
          <div class="h3">Рекомендуем также посмотреть</div>
        </div>

        <SliderProducts :list="recommendedProducts"/>

      </div>
    </section>

    <section class="s-similar">
      <div class="container">

        <div class="section-title">
          <div class="h3">Похожее в журнале</div>
        </div>

        <SliderSimilar :list="similarProducts"/>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    const symbol = this.$route.params.symbol
    const promises = await Promise.all([
      this.$store.dispatch('product/getProductInfo', symbol),
      this.$store.dispatch('recommended/getRecommended'),
      this.$store.dispatch('recommended/getSimilar')
    ])
    return promises
  },
  name: 'ProductPage',
  head () {
    return {
      bodyAttrs: {
        class: this.darkTheme
      }
    }
  },
  computed: {
    ...mapState({
      pageType: state => state.product.pageType,
      recommendedProducts: state => state.recommended.recommendedProducts,
      similarProducts: state => state.recommended.similarProducts,
      advantages: state => state.product.advantages,
      youtubeVideo: state => state.product.youtubeVideo,
      additionalAdvantages: state => state.product.additionalAdvantages,
      operation: state => state.product.operation,
      compareSection: state => state.product.compareSection
    }),
    darkTheme () {
      return this.pageType === 2 ? 'dark' : ''
    }
  },
  watch: {
    pageType (val) {
      if (val === 2) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }
  },
  data: () => ({
    selectedColor: 1
  }),
  mounted () {
    // if (this.pageType === 2) {
    //   document.body.classList.add('dark')
    // }
    // this.$on('hook:beforeDestroy', () => document.body.classList.remove('dark'))
  }
}
</script>

<style scoped>

</style>
