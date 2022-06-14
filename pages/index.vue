<template>

  <div class="main-page">

    <SliderBanners
      :slides="sliderBanners"
    />

    <SectionBrands/>

    <section class="s-categories">
      <div class="container">

        <SliderSimilar
          v-if="isMob"
          :list="blog"
        />

        <BlogList
          v-else
          :list="blog"
          :filterVisible="false"
        />

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
    return await Promise.all([
      this.$store.dispatch('blog/getBlogMain'),
      this.$store.dispatch('catalog/getSliderProducts'),
      this.$store.dispatch('banners/getBanners')
    ])
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
    selectedProductsSlider: 0,
    isMob: false
  }),
  methods: {
    checkMob () {
      this.isMob = window.innerWidth < 576
    }
  },
  mounted () {
    this.checkMob()
    window.addEventListener('resize', this.checkMob)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkMob)
  }
}
</script>
