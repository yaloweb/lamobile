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

    <section class="s-products-features">

      <div class="container">
        <div class="small-container">

          <div class="h3">Характеристики</div>

          <div class="row">

            <div
              v-for="feature in features"
              :key="feature.id"
              class="col-6">
              <div class="products-features">
                <div class="h5">{{ feature.title }}</div>
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

        <SliderProducts :list="recommendedProducts" />

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
  name: 'ProductType1',
  computed: {
    ...mapState({
      recommendedProducts: state => state.recommended.recommendedProducts,
      similarProducts: state => state.recommended.similarProducts,
      features: state => state.product.features,
      featuresFooterInfo: state => state.product.featuresFooterInfo
    })
  },
  data: () => ({
    selectedColor: 1
  })
}
</script>

<style scoped>

</style>
