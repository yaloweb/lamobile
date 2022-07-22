<template>
  <div class="catalog-filter">

    <SliderFilterNav
      :filters="filterSubcategories"
      :selected="selectedSubcategory"
      @select="setSelectedSubcategory($event)"
    />

    <UISort
      :selected="selectedSort"
      :list="sortList"
      @select="selectSort($event)"
    />

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
      selectedSubcategory: state => state.catalog.selectedSubcategory,
      brandsSubcategories: state => state.catalog.brandsSubcategories
    }),
    isBrandPage () {
      return this.$route.name === 'brands-symbol'
    },
    filterSubcategories () {
      let res = []
      let tags = []
      if (this.isBrandPage) {
        this.brandsSubcategories.forEach(brandSubCatItem => {
          res.push(brandSubCatItem)
          if (brandSubCatItem.tags && brandSubCatItem.tags.length) {
            brandSubCatItem.tags.forEach(brandSubCatItemTag => {
              if (brandSubCatItemTag && brandSubCatItemTag.title) {
                tags.push(brandSubCatItemTag)
              }
            })
          }
        })
      } else {
        const parentCategory = this.$route.params.category
        const subcatRes = this.subcategories.filter(item => {
          return item.parentCode === parentCategory
        })
        subcatRes.forEach(subcatResItem => {
          res.push(subcatResItem)
          if (subcatResItem.tags && subcatResItem.tags.length) {
            subcatResItem.tags.forEach(subcatResItemTag => {
              if (subcatResItemTag && subcatResItemTag.title) {
                tags.push(subcatResItemTag)
              }
            })
          }
        })
      }
      res.push(...tags)
      return res
    }
  },
  methods: {
    selectSort (data) {
      this.$store.commit('catalog/setSelectedSort', data)
    },
    async setSelectedSubcategory (id) {
      this.$emit('loading', true)

      if (this.selectedSubcategory !== id) {
        this.$store.commit('catalog/setSelectedSubcategory', id)
        await this.$store.dispatch('catalog/getCatalog', {
          category: [id]
        })
      } else {
        const category = this.$route.params.category
        this.$store.commit('catalog/setSelectedSubcategory', null)
        this.$store.dispatch('catalog/getCatalog', {
          categoryCode: category
        })
      }

      this.$emit('loading', false)
    },
    observerFirstLastChild () {
      if (Array.isArray(this.$refs.category) && this.$refs.category.length) {
        const firstChild = this.$refs.category[0]
        // const lastChild = this.$refs.category[this.$refs.category.length - 1]
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // console.log(entry.intersectionRatio)
          })
        })
        observer.observe(firstChild)
        // observer.observe(lastChild)
      }
    }
  },
  mounted () {
    this.$store.commit('catalog/clearSelectedSubcategory')
    this.observerFirstLastChild()
  }
}
</script>

<style scoped>

</style>
