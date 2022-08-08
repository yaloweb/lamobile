 <template>
  <div
    ref="magazineList"
    class="magazine-list"
    :class="{'blog-loading': loading}">

    <div
      v-if="filterVisible"
      class="catalog-filter"
    >
      <SliderFilterNav
        :filters="categories"
        :selected="selectedCategory"
        @select="setSelectedCategory($event)"
      />

      <UISort
        :selected="selectedSort"
        :list="sortList"
        @select="selectSort($event)"
      />
    </div>

    <div
      v-masonry
      transition-duration=".4s"
      item-selector=".magazine-item"
      column-width=".magazine-row-sizer"
      gutter=".magazine-row-gutter"
      horizontal-order="true"
      destroy-delay="0"
      stagger="0.03s"
      class="magazine-row">

      <div
        ref="magazineItem"
        v-for="(item, index) in list"
        :key="index"
        class="magazine-item"
        v-masonry-tile>
        <BlogItem
          :item="item"
          :withMobBtn="true"/>
      </div>

      <span class="magazine-row-sizer"></span>
      <span class="magazine-row-gutter"></span>

    </div>

  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: Array,
    scrollAutoLoad: Boolean,
    selectedCategory: Number,
    limit: Number,
    filterVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectedCategory () {
      this.offset = 0
      this.filterByCategory()
    },
    selectedSort () {
      this.filterByCategory()
    }
  },
  data () {
    return {
      loading: false,
      visibleTags: true,
      offset: 0,
      page: 0,
      sortList: [
        { code: 'date_asc', title: 'По новизне' },
        { code: 'brand_asc', title: 'По брендам' }
      ],
      selectedSort: null
    }
  },
  computed: {
    categories () {
      return this.$store.state.blog.categories
    },
    magazineList () {
      return this.$refs.magazineList
    }
  },
  methods: {
    async scrollLoadBlogList () {
      if (this.list.length >= ((this.page + 1) * this.limit)) {
        try {
          this.offset += this.limit
          this.page++
          this.loading = true
          await this.$store.dispatch('blog/loadBlog', {
            offset: this.offset,
            limit: this.limit,
            category: this.selectedCategory
          })
          this.blogScroll()
        } finally {
          this.loading = false
        }
      }
    },
    blogScroll () {
      const group = this.$refs.magazineItem
      const item = Array.isArray(group) ? group[group.length - 1] : group
      if (item) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              obs.unobserve(entry.target)
              this.scrollLoadBlogList()
            }
          })
        })
        observer.observe(item)
      }
    },
    elementOffset (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (rect.top + scrollTop)
    },
    setSelectedCategory (event) {
      this.$emit('changeCategory', event)
    },
    async filterByCategory () {
      this.loading = true
      this.page = 0
      this.offset = 0
      await this.$store.dispatch('blog/getBlogListByParams', {
        category: this.selectedCategory,
        limit: this.limit,
        offset: 0,
        sort: this.selectedSort.code
      })
      this.$emit('changeCategory', this.selectedCategory)
      this.blogScroll()
      this.loading = false
      window.scrollTo(0, 0)
    },
    selectSort (item) {
      this.selectedSort = item
    }
  },
  created () {
    this.selectedSort = this.sortList[0]
  },
  mounted () {
    if (this.scrollAutoLoad) {
      this.blogScroll()
    }
    const filterBtnScroll = e => {
      const scrY = window.scrollY
      const scrTop = this.elementOffset(this.magazineList)
      const offH = this.magazineList.offsetHeight
      const wH = window.innerHeight
      const res = scrTop + offH - scrY - wH
      this.visibleTags = res > 0
    }

    window.addEventListener('scroll', filterBtnScroll)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', filterBtnScroll)
    })
  }
}
</script>

<style scoped>

</style>
