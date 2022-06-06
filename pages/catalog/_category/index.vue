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

                <div
                  v-if="categoriesFilter.length"
                  class="row">

                  <div
                    v-for="item in categoriesFilter"
                    :key="item.id"
                    class="col-3">
                    <CatalogItem
                      :item="item"/>
                  </div>

                </div>

                <div
                  v-else
                  class="catalog-list-empty">
                  Товары отсуствуют
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
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'CatalogPage',
  mixins: [breadcrumbs],
  async fetch () {
    const category = this.$route.params.category
    const promises = await Promise.all([
      this.$store.dispatch('catalog/getCatalog', {
        categoryCode: category
      })
    ])
    this.breadcrumbs.push({
      title: this.currentCategory.title
    })
    return promises
  },
  data: () => ({
    sortType: '',
    selectedSubcategory: null,
    loading: false,
    breadcrumbs: [
      {
        title: 'Каталог',
        link: '/catalog'
      }
    ]
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
