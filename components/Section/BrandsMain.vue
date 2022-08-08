<template>

  <section
    class="s-brands-main"
    :class="{'loading': loading}"
    :style="{backgroundImage: `url(${info.bannerImgSrc})`}"
  >
    <div class="container">

      <div class="brands-main-window">

        <UIBreadcrumbs/>

        <div class="brands-main-window-content">

          <div class="brands-main-window-content-right">

            <div class="brands-logo-block">
              <div
                v-if="info.logoSrc.length"
                class="brands-logo-block-img"
              >
                <img
                  :src="info.logoSrc"
                  alt=""
                >
              </div>
              <span v-else>
                {{ info.title }}
              </span>
              <a
                href="#"
                class="brands-more-link"
                @click.prevent="scrollToInfo"
              >Подробнее о бренде
              </a>
            </div>

            <div
              v-if="info.advantage.length"
              class="brands-official"
              v-html="info.advantage"
            />

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
  props: {
    loading: Boolean
  },
  computed: {
    ...mapState({
      info: state => state.catalog.brandsMainInfo
    })
  },
  methods: {
    scrollToInfo () {
      const block = document.querySelector('.s-brands-info')
      if (block) {
        window.scrollTo({
          top: block.getBoundingClientRect().top + window.pageYOffset,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
