<template>

  <section
    class="s-brands-main"
    :style="{backgroundImage: `url(${info.bannerImgSrc})`}">
    <div class="container">

      <div class="brands-main-window">

        <UIBreadcrumbs/>

        <div class="brands-main-window-content">

          <div class="brands-main-window-content-right">

            <div class="brands-logo-block">
              <img
                :src="info.logoSrc"
                alt="">
              <a href="#" class="brands-more-link">Подробнее о бренде</a>
            </div>

            <div
              class="brands-official"
              v-html="info.advantage" />

          </div>

        </div>

      </div>

    </div>
  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'BrandsMain',
  computed: {
    ...mapState({
      info: state => state.catalog.brandsMainInfo
    })
  }
}
</script>

<style scoped>

</style>
