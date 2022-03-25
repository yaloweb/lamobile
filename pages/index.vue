<template>

  <div class="main-page">

    <SliderBanners
      :slides="sliderBanners"
    />

    <SectionBrands/>

    <section class="s-categories">
      <div class="container">

        <BlogList :list="blog"/>

      </div>
    </section>

    <section class="s-products-slider">
      <div class="container">

        <nav class="products-slider-nav">
          <a
            v-for="(sliderProduct, idx) in sliderProducts"
            :key="sliderProduct.id"
            href="#"
            class="products-slider-nav-link"
            :class="{'active': selectedProductsSlider === idx}"
            @click.prevent="selectedProductsSlider = idx">
            {{ sliderProduct.category }}
          </a>
        </nav>

        <div class="products-slider-tabs">

          <div
            v-for="(sliderProduct, idx) in sliderProducts"
            :key="sliderProduct.id"
            class="products-slider-tab">
            <SliderProducts
              v-if="selectedProductsSlider === idx"
              :list="sliderProduct.list"
              :index="sliderProduct.id"
            />
          </div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    let promises = []
    if (this.$store.state.catalog.categories.length === 0) {
      promises.push(this.$store.dispatch('blog/getBlogMain'))
    }
    if (this.$store.state.catalog.sliderProducts.length === 0) {
      promises.push(this.$store.dispatch('catalog/getSliderProducts'))
    }
    if (this.$store.state.banners.banners.length === 0) {
      promises.push(this.$store.dispatch('banners/getBanners'))
    }
    return await Promise.all(promises)
  },
  layout: 'index',
  computed: {
    ...mapState({
      blog: state => state.blog.blogMain,
      sliderProducts: state => state.catalog.sliderProducts,
      sliderBanners: state => state.banners.banners
    })
  },
  data: () => ({
    selectedProductsSlider: 0
  })
}
</script>
