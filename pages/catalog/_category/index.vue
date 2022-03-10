<template>

  <div class="catalog-page">

    <UIBreadcrumbs/>

    <section class="s-catalog">
      <div class="container">

        <div class="page-title">
          <h1>{{ currentCategory.title }}</h1>
        </div>

        <div
          ref="catalog"
          class="catalog">
          <div class="row">

            <div class="col-3">
              <CatalogFilter
                :visibleFilter="visibleFilter"
                @close="visibleFilter = false"/>
            </div>

            <div :class="visibleFilter ? 'col-9' : 'col-12'">
              <div class="catalog-list">

                <div
                  v-if="type === 'grid'"
                  class="row">

                  <div
                    v-for="item in catalog"
                    :key="item.id"
                    :class="visibleFilter ? 'col-4' : 'col-3'">
                    <CatalogItem
                      :item="item"/>
                  </div>

                </div>

                <div
                  v-if="type === 'list'"
                  class="catalog-list-view">
                  <CatalogListItem
                    v-for="item in catalog"
                    :key="item.id"
                    :item="item"/>
                </div>

              </div>
            </div>

          </div>

          <div
            v-if="catalog ? catalog.length : false"
            ref="filterBtns"
            class="filter-footer-btns"
            :class="{'active': visibleFilter}">
            <button
              class="open-filter-btn"
              @click="visibleFilter = !visibleFilter">
              <span class="icon-filter"></span>{{ !visibleFilter ? 'Показать фильтр' : 'Скрыть фильтр' }}
            </button>
            <div class="filter-view-type">
              <span
                class="icon-masonry"
                :class="{'active': type === 'grid'}"
                @click="type = 'grid'"/>
              <span
                class="icon-list"
                :class="{'active': type === 'list'}"
                @click="type = 'list'"/>
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
    return await this.$store.dispatch('catalog/getCatalog', category)
  },
  name: 'CatalogPage',
  computed: {
    ...mapState({
      catalog: state => state.catalog.catalog,
      categories: state => state.catalog.categories
    }),
    currentCategory () {
      const category = this.$route.params.category
      return this.categories.filter(item => item.code === category)[0]
    }
  },
  data: () => ({
    visibleFilter: false,
    type: 'grid'
  }),
  methods: {
    offset (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (rect.top + scrollTop)
    }
  },
  mounted () {
    const fitlerBtns = this.$refs.filterBtns
    const sCatalog = this.$refs.catalog
    const filterBtnScroll = e => {
      const scrY = window.scrollY
      const scrTop = this.offset(sCatalog)
      const offH = sCatalog.offsetHeight
      const wH = window.innerHeight
      const res = scrTop + offH - scrY - wH
      res > 0 ? fitlerBtns.classList.remove('absolute') : fitlerBtns.classList.add('absolute')
    }
    const clickOutFilter = e => {
      if (window.innerWidth < 1200) {
        let tg = e.target
        if (!tg.closest('.catalog-filter') && !tg.closest('.open-filter-btn')) {
          this.visibleFilter = false
        }
      }
    }

    window.addEventListener('scroll', filterBtnScroll)
    document.addEventListener('click', clickOutFilter)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', filterBtnScroll)
      document.removeEventListener('click', clickOutFilter)
    })
  }
}
</script>
