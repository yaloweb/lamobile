<template>

  <div class="main-page">

    <SliderBanners
      :slides="sliderBanners"
    />

    <SectionBrands />

    <section class="s-categories">
      <div class="container">

        <BlogList :list="blog"/>

      </div>
    </section>

    <section class="s-products-slider">
      <div class="container">

        <SliderProducts
          :list="sliderProducts"
        />

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
  }
}
</script>
