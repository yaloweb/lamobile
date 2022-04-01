<template>

  <div
    class="product-page"
    :class="{'dark': pageType === 2}">

    <UIBreadcrumbs/>

    <section class="s-product">
      <div class="container">

        <div class="product-mob-header">
          <div class="mob-back-link">
            <a
              href="#"
              @click.prevent="$router.go(-1)"/>
          </div>
          <div class="h1">{{ title }}</div>
        </div>

        <div class="product-main">

          <ProductInfoImages :selectedColor="selectedColor"/>

          <ProductInfoMain
            :selectedColor="selectedColor"
            @select-color="selectedColor = $event"/>

        </div>

      </div>
    </section>

    <div class="product-body-flex">

      <section class="s-product-information">
        <AccordionItem
          :opened="accordionOpened.indexOf(1) !== -1"
          @toggle="toggle($event, 1)">

          <template #header>Информация о товаре</template>

          <template #body>

            <SectionProductVideo v-if="youtubeVideo.id ? youtubeVideo.id.length > 0 : false"/>

            <SectionProductAdditionalAdvantages v-if="Object.keys(additionalAdvantages).length"/>

            <SectionProductAdvantages v-if="advantages ? advantages.length > 0 : false"/>

            <SectionProductOperation v-if="Object.keys(operation).length"/>

          </template>

        </AccordionItem>
      </section>

      <section
        v-if="compareSection"
        class="s-product-compare">
        <div class="container">

          <CompareTable/>

        </div>
      </section>

      <SectionProductFeatures ref="SectionProductFeatures"/>

    </div>

    <section class="s-recommended">
      <div class="container">

        <div class="section-title">
          <div class="h3">Рекомендуем также посмотреть</div>
        </div>

        <SliderProducts
          :list="recommendedProducts"
          :mobQuantity="1"/>

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
    ]).catch(() => {
      this.$nuxt.error({ statusCode: 404 })
    })
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
      title: state => state.product.title,
      recommendedProducts: state => state.recommended.recommendedProducts,
      similarProducts: state => state.recommended.similarProducts,
      advantages: state => state.product.advantages,
      youtubeVideo: state => state.product.youtubeVideo,
      additionalAdvantages: state => state.product.additionalAdvantages,
      operation: state => state.product.operation,
      compareSection: state => state.product.compareSection,
      colors: state => state.product.colors
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
    selectedColor: 1,
    isMob: false,
    accordionOpened: []
  }),
  methods: {
    toggle (bool, id) {
      bool ? this.accordionOpened = this.accordionOpened.filter(item => item !== id) : this.accordionOpened.push(id)
    }
  },
  mounted () {
    this.selectedColor = this.colors[0]?.id || 1
  }
}
</script>

<style scoped>

</style>
