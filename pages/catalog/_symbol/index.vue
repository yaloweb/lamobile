<template>

  <div class="catalog-page">

    <UIBreadcrumbs/>

    <section class="s-catalog">
      <div class="container">

        <div class="page-title">
          <h1>Роботы-пылесосы {{mob}}</h1>
        </div>

        <div
          ref="catalog"
          class="catalog">
          <div class="row">

            <div class="col-3">
              <div
                :class="{'opened': visibleFilter}"
                class="catalog-filter">

                <div class="catalog-filter-title">Фильтр</div>

                <div
                  class="catalog-filter-close"
                  @click="visibleFilter = false">
                  <span class="icon-close"></span>
                </div>

                <div class="select-brands">

                  <div class="h4">Бренды</div>

                  <div
                    class="brand-label show-all"
                    @click="selectBrand(null, true)">
                    <div class="brand-title">Все бренды</div>
                  </div>

                  <div
                    v-for="brand in brands"
                    :key="brand.id"
                    class="brand-label"
                    :class="{'active': filters.brands.filter(item => item === brand.id).length > 0}">
                    <div
                      class="brand-title"
                      @click="selectBrand(brand)">{{ brand.title }}</div>
                    <div
                      class="brand-close"
                      @click="removeBrand(brand.id)">
                      <span class="icon-close"/>
                    </div>
                  </div>

                </div>

                <div class="select-categories">

                  <div class="h4">Категории</div>

                  <div class="select-categories-list">

                    <div class="select-categories-item show-all">
                      <label class="filter-checkbox">
                        <input
                          type="checkbox"
                          name="category"
                          v-model="categoriesAll"
                          @change="categoriesAllSelect">
                        <span>Все категории</span>
                      </label>
                    </div>

                    <div
                      v-for="category in categories"
                      :key="category.id"
                      class="select-categories-item">
                      <label class="filter-checkbox">
                        <input
                          type="checkbox"
                          name="category"
                          v-model="category.selected">
                        <span>{{ category.title }}</span>
                      </label>
                      <div
                        v-if="category.subcategories && category.selected"
                        class="select-subcategories">
                        <div
                          v-for="subcategory in category.subcategories"
                          :key="`${category.id}-${subcategory.id}`"
                          class="select-categories-item">
                          <label class="filter-checkbox">
                            <input
                              type="checkbox"
                              name="category"
                              v-model="subcategory.selected">
                            <span>{{ subcategory.title }}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            <div :class="visibleFilter ? 'col-9' : 'col-12'">
              <div class="catalog-list">

                <div
                  v-if="type === 'grid' || mob"
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
                  v-if="type === 'list' && !mob"
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
            ref="filterBtns"
            class="filter-footer-btns"
            :class="{'active': visibleFilter}">
            <button
              class="open-filter-btn"
              @click="visibleFilter = !visibleFilter">
              <span class="icon-filter"></span>{{ !visibleFilter ? 'Показать фильтр' : 'Скрыть фильтр' }}
            </button>
            <div
              v-if="!mob"
              class="filter-view-type">
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
    const symbol = this.$route.params.symbol
    return await this.$store.dispatch('catalog/getCatalog', symbol)
  },
  name: 'catalogCategory',
  computed: {
    ...mapState({
      catalog: state => state.catalog.catalog
    })
  },
  data: () => ({
    visibleFilter: false,
    type: 'grid',
    brands: [
      {
        id: 1,
        title: 'Roborock'
      },
      {
        id: 2,
        title: 'Yeelight'
      },
      {
        id: 3,
        title: '70mai'
      },
      {
        id: 4,
        title: 'ZMI'
      },
      {
        id: 5,
        title: '1More'
      },
      {
        id: 6,
        title: 'WalkingPad'
      },
      {
        id: 7,
        title: 'Mi'
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Аксессуары для роботов-пылесосов',
        selected: false
      },
      {
        id: 2,
        title: 'Свет',
        selected: false,
        subcategories: [
          {
            id: 1,
            title: 'Диодные ленты',
            selected: false
          },
          {
            id: 2,
            title: 'Настольные лампы',
            selected: false
          },
          {
            id: 3,
            title: 'Ночники',
            selected: false
          },
          {
            id: 4,
            title: 'Потолочные светильники',
            selected: false
          },
          {
            id: 5,
            title: 'Цокольные лампы',
            selected: false
          }
        ]
      },
      {
        id: 3,
        title: 'Климат',
        selected: false
      },
      {
        id: 4,
        title: 'Внешние аккумуляторы',
        selected: false
      },
      {
        id: 5,
        title: 'Аксессуары в авто',
        selected: false
      },
      {
        id: 6,
        title: 'Беговые дорожки',
        selected: false
      }
    ],
    filters: {
      brands: []
    },
    categoriesAll: false,
    mob: false
  }),
  methods: {
    selectBrand (item, all) {
      if (!all) {
        if (this.filters.brands.filter(arrItem => arrItem === item.id).length === 0) {
          this.filters.brands.push(item.id)
        }
      } else {
        this.filters.brands = this.brands.map(item => item.id)
      }
    },
    removeBrand (id) {
      this.filters.brands = this.filters.brands.filter(arrItem => arrItem !== id)
    },
    categoriesAllSelect () {
      let res = !!this.categoriesAll
      this.categories.forEach(category => {
        category.selected = res
        if (category.subcategories) {
          category.subcategories.forEach(subcategory => {
            subcategory.selected = res
          })
        }
      })
    },
    offset (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (rect.top + scrollTop)
    },
    checkMob () {
      this.mob = window.innerWidth < 576
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

    this.checkMob()

    window.addEventListener('scroll', filterBtnScroll)
    window.addEventListener('resize', this.checkMob)
    document.addEventListener('click', clickOutFilter)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', filterBtnScroll)
      window.removeEventListener('resize', this.checkMob)
      document.removeEventListener('click', clickOutFilter)
    })
  }
}
</script>
