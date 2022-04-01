<template>
  <div class="catalog-filter">

    <nav class="catalog-filter-nav">
      <a
        v-for="category in subcategories"
        :key="category.id"
        href="#"
        :class="{'active': selectedSubcategory.filter(item => item.id === category.id).length}"
        @click.prevent="setSelectedSubcategory(category)">
        {{ category.title }}
      </a>
    </nav>

    <div
      class="catalog-sort"
      :class="{'opened': sortOpened}">
      <div
        class="catalog-sort-selected"
        @click="sortOpened = !sortOpened">Сортировать {{ selectedSort.title }} <span><svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.07743 0.731445C6.96869 0.731445 7.41503 1.80901 6.78481 2.43923L4.24828 4.97576C3.8576 5.36644 3.22418 5.36644 2.8335 4.97576L0.296968 2.43923C-0.333246 1.80901 0.113097 0.731446 1.00435 0.731446L6.07743 0.731445Z" fill="#7A7A7A"/></svg></span></div>
      <div class="catalog-sort-dropdown">
        <ul>
          <li
            v-for="(sortItem, idx) in sortList"
            :key="idx"
            @click="selectSort(sortItem)"
            :class="{'active': selectedSort.code === sortItem.code}">
            {{ sortItem.title }}
          </li>
        </ul>
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
      subcategories: state => state.catalog.subcategories,
      sortList: state => state.catalog.sortList,
      selectedSort: state => state.catalog.selectedSort,
      selectedSubcategory: state => state.catalog.selectedSubcategory
    })
  },
  data: () => ({
    sortOpened: false
  }),
  methods: {
    selectSort (data) {
      this.$store.commit('catalog/setSelectedSort', data)
      this.sortOpened = false
    },
    async setSelectedSubcategory (subcategory) {
      console.log(this.selectedSubcategory)
      if (this.selectedSubcategory.filter(item => item.id === subcategory.id).length) {
        this.$store.commit('catalog/deleteSelectedSubcategory', subcategory)
      } else {
        this.$store.commit('catalog/setSelectedSubcategory', subcategory)
      }
      const category = this.$route.params.category
      this.$emit('loading', true)
      await this.$store.dispatch('catalog/getCatalogFilterByCategories', {
        category,
        subcategory: subcategory.code
      })
      this.$emit('loading', false)
    },
    clickOutsideSort (e) {
      if (!e.target.closest('.catalog-sort')) {
        this.sortOpened = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.clickOutsideSort)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutsideSort)
  }
}
</script>

<style scoped>

</style>
