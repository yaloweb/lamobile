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

export default {
  name: 'CatalogPage',
  layout: 'brands',
  async fetch () {
    const symbol = this.$route.params.symbol
    return await Promise.all([
      this.$store.dispatch('catalog/getCatalog', {
        brandCode: symbol
      }),
      this.$store.dispatch('catalog/getBrandsMainInfo', symbol)
    ])
  },
  data: () => ({
    sortType: '',
    selectedSubcategory: null,
    loading: false
  }),
  computed: {
    ...mapState({
      categories: state => state.catalog.categories
    }),
    categoriesFilter () {
      return this.$store.getters['catalog/categoriesFilter']
    }
  }
}
</script>

<style scoped>

</style>
