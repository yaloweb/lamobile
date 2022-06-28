<template>

  <div class="brands-page">

    <SectionBrandsMain />

    <section class="s-catalog s-brands-catalog">
      <div class="container">

        <CatalogFilter
          @loading="loading = $event"
        />

        <div
          ref="catalog"
          class="catalog"
          :class="{'catalog-loading': loading}">
          <div class="row">

            <div class="col-12">
              <div class="catalog-list">

                <div class="row">

                  <div
                    v-for="item in categoriesFilter"
                    :key="item.id"
                    class="col-3">
                    <CatalogItem
                      :item="item"/>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <SectionBrandsInfo />

  </div>

</template>

<script>

import { mapState } from 'vuex'
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'CatalogPage',
  layout: 'brands',
  mixins: [breadcrumbs],
  async fetch () {
    const symbol = this.$route.params.symbol
    return await Promise.all([
      this.$store.dispatch('catalog/getCatalog', {
        brandCode: symbol
      }),
      this.$store.dispatch('catalog/getBrandsMainInfo', symbol),
      this.$store.dispatch('catalog/getBrandsCategories', symbol)
    ])
  },
  data: () => ({
    sortType: '',
    selectedSubcategory: null,
    loading: false
  }),
  computed: {
    ...mapState({
      categories: state => state.catalog.categories,
      info: state => state.catalog.brandsMainInfo
    }),
    categoriesFilter () {
      return this.$store.getters['catalog/categoriesFilter']
    },
    breadcrumbs () {
      return [
        {
          title: 'Бренды',
          link: '/brands'
        },
        {
          title: this.info.title
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
