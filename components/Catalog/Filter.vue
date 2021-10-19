<template>
  <div
    :class="{'opened': visibleFilter}"
    class="catalog-filter">

    <div class="catalog-filter-title">Фильтр</div>

    <div
      class="catalog-filter-close"
      @click="closeFilter">
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
        :class="{'active': selectedBrands.filter(item => item === brand.id).length > 0}">
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
              :value="categoriesAll"
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
              :checked="category.selected"
              @change="selectCategory($event, category.id)">
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
                  :checked="subcategory.selected"
                  @change="selectSubCategory($event, category.id, subcategory.id)">
                <span>{{ subcategory.title }}</span>
              </label>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'CatalogFilter',
  computed: {
    ...mapState({
      visibleFilter: state => state.filter.visibleFilter,
      brands: state => state.filter.brands,
      categories: state => state.filter.categories,
      selectedBrands: state => state.filter.selectedBrands,
      categoriesAll: state => state.filter.categoriesAll
    })
  },
  methods: {
    selectBrand (item, all) {
      if (!all) {
        this.$store.commit('filter/addSelectedBrand', item)
      } else {
        this.$store.commit('filter/addAllBrand')
      }
    },
    removeBrand (id) {
      this.$store.commit('filter/removeSelectedBrand', id)
    },
    categoriesAllSelect (e) {
      const value = e.target.checked
      this.$store.dispatch('filter/selectAllCategories', value)
    },
    selectCategory (e, id) {
      this.$store.commit('filter/selectCategory', {
        id,
        value: e.target.checked
      })
    },
    selectSubCategory (e, parentId, id) {
      this.$store.commit('filter/selectSubCategory', {
        id,
        parentId,
        value: e.target.checked
      })
    },
    closeFilter () {
      this.$store.commit('filter/setFilterState', false)
    },
    offset (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (rect.top + scrollTop)
    }
  },
  mounted () {
    const filterBtn = document.querySelector('.open-filter-btn')
    const sCatalog = document.querySelector('.s-catalog')
    const filterBtnScroll = e => {
      const scrY = window.scrollY
      const scrTop = this.offset(sCatalog)
      const offH = sCatalog.offsetHeight
      const wH = window.innerHeight
      const res = scrTop + offH - scrY - wH
      res > 0 ? filterBtn.classList.remove('absolute') : filterBtn.classList.add('absolute')
    }
    const clickOutFilter = e => {
      if (window.innerWidth < 1200) {
        let tg = e.target
        if (!tg.closest('.catalog-filter') && !tg.closest('.open-filter-btn')) {
          this.closeFilter()
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

<style scoped>

</style>
