<template>

  <div class="catalog-page">

    <UIBreadcrumbs/>

    <section class="s-catalog">
      <div class="container">

        <UIPageTitle :title="currentCategory ? currentCategory.title : ''" />

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

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    const category = this.$route.params.category
    return await Promise.all([
      this.$store.dispatch('catalog/getCatalog', category),
      this.$store.dispatch('catalog/getSubcategories', category)
    ])
  },
  name: 'CatalogPage',
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
    },
    currentCategory () {
      const category = this.$route.params.category
      return this.categories.filter(item => item.code === category)[0]
    }
  }
}
</script>
