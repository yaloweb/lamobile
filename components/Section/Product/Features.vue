<template>

  <section class="s-products-features">

    <div class="container">

      <div class="products-features-block">

        <div class="small-container">

          <div
            v-if="description ? description.length > 0 : false"
            class="product-description">

            <AccordionItem
              :opened="accordionOpened.indexOf(1) !== -1"
              @toggle="toggle($event, 1)">

              <template #header>Описание</template>

              <template #body>

                <div class="h3">Описание</div>

                <div
                  class="product-description-content"
                  v-html="description"/>

              </template>

            </AccordionItem>

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
                    @click="openFeature">{{ feature.title }} <span @click.stop/></div>
                  <div
                    v-if="feature.list"
                    class="products-features-list">
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

          <AccordionItem
            v-if="(set.list ? set.list.length > 0 : false) || (set.instruction ? set.instruction.length > 0 : false)"
            :opened="accordionOpened.indexOf(2) !== -1"
            @toggle="toggle($event, 2)">

            <template #header>Комплектации</template>

            <template #body>

              <div class="product-set">

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
                  class="instruction-link">Скачать инструкцию<span class="icon-download" /></a>

              </div>

              <div class="products-features-descr">
                <div
                  class="products-features-descr-content"
                  v-html="featuresFooterInfo"/>
              </div>

            </template>

          </AccordionItem>

        </div>

      </div>

    </div>

  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SectionProductFeatures',
  computed: {
    ...mapState({
      description: state => state.product.description,
      features: state => state.product.features,
      set: state => state.product.set,
      featuresFooterInfo: state => state.product.featuresFooterInfo
    }),
    productsFeatures () {
      return this.$refs.productsFeatures
    }
  },
  data: () => ({
    accordionOpened: []
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
    },
    toggle (bool, id) {
      bool ? this.accordionOpened = this.accordionOpened.filter(item => item !== id) : this.accordionOpened.push(id)
    }
  },
  mounted () {
    if (window.innerWidth < 576) {
      if (this.productsFeatures) {
        const tg = this.productsFeatures[0]
        const contentInner = tg.querySelector('.products-features-list')
        const content = contentInner.querySelector('ul')
        contentInner.style.maxHeight = `${content.offsetHeight}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
