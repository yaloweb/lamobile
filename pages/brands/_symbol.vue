<template>

  <div class="brands-page">

    <SectionBrandsMain />

    <section class="s-catalog s-brands-catalog">
      <div class="container">

        <div
          ref="catalog"
          class="catalog">
          <div class="row">

            <div class="col-3">
              <CatalogFilter />
            </div>

            <div :class="visibleFilter ? 'col-9' : 'col-12'">
              <div class="catalog-list">

                <div class="row">

                  <div
                    v-for="item in catalog"
                    :key="item.id"
                    :class="visibleFilter ? 'col-4' : 'col-3'">
                    <CatalogItem
                      :item="item"/>
                  </div>

                </div>

              </div>
            </div>

          </div>

          <button
            ref="filterBtn"
            class="open-filter-btn"
            :class="{'active': visibleFilter}"
            @click="toggleFilter">
            <span class="icon-filter" />{{ !visibleFilter ? 'Показать фильтр' : 'Скрыть фильтр' }}
          </button>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    const symbol = this.$route.params.symbol
    return await Promise.all([
      this.$store.dispatch('catalog/getCatalog', symbol),
      this.$store.dispatch('catalog/getBrandsMainInfo', symbol)
    ])
  },
  layout: 'brands',
  computed: {
    ...mapState({
      catalog: state => state.catalog.catalog,
      visibleFilter: state => state.filter.visibleFilter
    })
  },
  methods: {
    toggleFilter () {
      this.$store.commit('filter/setFilterState', !this.visibleFilter)
    }
  }
}
</script>

<style scoped>

</style>
