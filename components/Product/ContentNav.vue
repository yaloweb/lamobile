<template>
  <section class="s-products-content-nav">
    <div class="container">

      <nav class="products-content-nav">
        <a
          v-if="description"
          href="#s-description"
          @click.prevent="scrollTo('#s-description')"
        >
          Описание
        </a>
        <a
          v-if="features"
          href="#s-characteristics"
          @click.prevent="scrollTo('#s-characteristics')"
        >
          Характеристики
        </a>
        <a
          v-if="compareSection"
          href="#s-compare"
          @click.prevent="scrollTo('#s-compare')"
        >
          Сравните модели
        </a>
      </nav>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductContentNav',
  computed: {
    ...mapState({
      description: state => state.product.description,
      features: state => state.product.features,
      compareSection: state => state.product.compareSection
    })
  },
  methods: {
    scrollTo (id) {
      const DOMElement = document.querySelector(id)

      if (DOMElement) {
        window.scrollTo({
          top: DOMElement.getBoundingClientRect().top + window.pageYOffset - 30,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
