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
                  v-if="loading"
                  class="row"
                >

                  <div
                    v-for="item in 4"
                    :key="item"
                    class="col-3">

                    <CatalogPreloadCard/>

                  </div>

                </div>

                <template v-else>
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
                </template>

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
  head () {
    return {
      title: this.meta.title ?? 'Каталог',
      description: this.meta.description,
      keywords: this.meta.keywords
    }
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
      categories: state => state.catalog.categories,
      meta: state => state.catalog.meta
    }),
    categoriesFilter () {
      return this.$store.getters['catalog/categoriesFilter']
    },
    currentCategory () {
      const category = this.$route.params.category
      return this.categories.filter(item => item.code === category)[0]
    }
  },
  async fetch () {
    const category = this.$route.params.category
    this.loading = true
    const promises = await Promise.all([
      this.$store.dispatch('catalog/getCatalog', {
        categoryCode: category
      })
    ])
    this.breadcrumbs.push({
      title: this.currentCategory.title
    })
    this.loading = false
    return promises
  }
}
</script>
