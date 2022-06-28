<template>
  <div class="catalog-filter">

    <nav
      v-if="filterSubcategories.length"
      class="catalog-filter-nav"
      :class="position"
    >

      <swiper
        ref="slider"
        :options="swiperOptions"
        @reach-beginning="reachBeginning"
        @transition-start="beforeSlideChangeStart"
      >
        <swiper-slide
          v-for="category in filterSubcategories"
          :key="category.id"
        >
          <a
            href="#"
            ref="category"
            :class="{'active': selectedSubcategory === category.id}"
            @click.prevent="setSelectedSubcategory(category.id)">
            {{ category.title }}
          </a>
        </swiper-slide>
      </swiper>

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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'CatalogFilter',
  components: {
    Swiper,
    SwiperSlide
  },
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
    },
    sliderPosition () {
      if (this.sliderEnd) {
        return 'end'
      }
      if (this.sliderActiveIndex === 0) {
        return 'start'
      }
      return 'middle'
    }
  },
  data: () => ({
    sortOpened: false,
    swiperOptions: {
      slidesPerView: 'auto'
    },
    position: 'start',
    sliderActiveIndex: 0,
    sliderEnd: false
  }),
  methods: {
    selectSort (data) {
      this.$store.commit('catalog/setSelectedSort', data)
      this.sortOpened = false
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
    clickOutsideSort (e) {
      if (!e.target.closest('.catalog-sort')) {
        this.sortOpened = false
      }
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
    },
    reachBeginning () {
      setTimeout(() => {
        this.position = 'start'
      }, 100)
    },
    beforeSlideChangeStart () {
      this.position = 'middle'
    }
  },
  mounted () {
    this.$store.commit('catalog/clearSelectedSubcategory')
    document.addEventListener('click', this.clickOutsideSort)
    this.observerFirstLastChild()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutsideSort)
  }
}
</script>

<style scoped>

</style>
