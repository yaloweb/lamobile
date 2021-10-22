<template>

  <div class="product-page">

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

    <section
      v-if="advantages ? advantages.length > 0 : false"
      class="s-product-advantages">
      <div class="container">

        <div class="advantages">

          <div
            v-for="advantage in advantages"
            :key="advantage.id"
            class="advantages-item">
            <div class="advantages-item-img">
              <img
                :src="advantage.imgSrc"
                alt="">
            </div>
            <div class="advantages-item-content">
              <div
                class="h2"
                v-html="advantage.title"/>
              <p v-html="advantage.descr"/>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section class="s-products-features">

      <div class="container">
        <div class="small-container">

          <div
            v-if="description ? description.length > 0 : false"
            class="product-description">

            <div class="h3">Описание</div>

            <div
              class="product-description-content"
              v-html="description"/>

          </div>

          <div class="product-features">

            <div class="h3">Характеристики</div>

            <div class="row">

              <div
                v-for="(feature, index) in features"
                :key="feature.id"
                class="col-6">
                <div
                  ref="productsFeatures"
                  class="products-features">
                  <div
                    class="h5"
                    :class="{'active': index === 0}"
                    @click="openFeature">{{ feature.title }} <span @click.stop /></div>
                  <div class="products-features-list">
                    <ul>
                      <li
                        v-for="item in feature.list"
                        :key="item.id">
                        <span>{{ item.title }}</span>
                        <span>{{ item.value }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div
            v-if="(set.list ? set.list.length > 0 : false) || (set.instruction ? set.instruction.length > 0 : false)"
            class="product-set">

            <div class="h3">Комплектации</div>

            <ul
              v-if="set.list ? set.list.length > 0 : false"
              class="set-list">
              <li
                v-for="setItem in set.list"
                :key="setItem.id">
                {{ setItem }}
              </li>
            </ul>

            <a
              v-if="set.instruction ? set.instruction.length > 0 : false"
              :href="set.instruction"
              class="btn btn-border">Скачать инструкцию</a>

          </div>

          <div class="products-features-descr">
            <div
              class="products-features-descr-content"
              v-html="featuresFooterInfo"/>
          </div>

        </div>
      </div>

    </section>

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
    await Promise.all([
      this.$store.dispatch('product/getProductInfo', symbol),
      this.$store.dispatch('recommended/getRecommended'),
      this.$store.dispatch('recommended/getSimilar')
    ])
  },
  name: 'ProductPage',
  computed: {
    ...mapState({
      pageType: state => state.product.pageType,
      recommendedProducts: state => state.recommended.recommendedProducts,
      similarProducts: state => state.recommended.similarProducts,
      features: state => state.product.features,
      featuresFooterInfo: state => state.product.featuresFooterInfo,
      advantages: state => state.product.advantages,
      description: state => state.product.description,
      set: state => state.product.set
    }),
    productsFeatures () {
      return this.$refs.productsFeatures
    }
  },
  data: () => ({
    selectedColor: 1
  }),
  methods: {
    openFeature (e) {
      if (window.innerWidth < 576) {
        const tg = e.target
        const contentInner = tg.nextSibling.nextSibling
        const content = contentInner.querySelector('ul')
        if (tg.classList.contains('active')) {
          tg.classList.remove('active')
          contentInner.style.maxHeight = '0px'
        } else {
          tg.classList.add('active')
          contentInner.style.maxHeight = `${content.offsetHeight}px`
        }
      }
    }
  },
  mounted () {
    if (window.innerWidth < 576) {
      const tg = this.productsFeatures[0]
      const contentInner = tg.querySelector('.products-features-list')
      const content = contentInner.querySelector('ul')
      contentInner.style.maxHeight = `${content.offsetHeight}px`
    }
  }
}
</script>

<style scoped>

</style>
