<template>
  <div
    ref="magazineList"
    class="magazine-list"
    :class="{'blog-loading': loading}">

    <div class="catalog-filter">
      <nav class="catalog-filter-nav">
        <a
          v-for="category in categories"
          :key="category.id"
          href="#"
          :class="{'active': selectedCategory === category.id}"
          @click.prevent="filterByCategory(category.id)">
          {{category.title}}
        </a>
      </nav>
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
    limit: Number
  },
  watch: {
    selectedCategory () {
      this.offset = 0
    }
  },
  data: () => ({
    loading: false,
    visibleTags: true,
    offset: 0,
    page: 0
  }),
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
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target)
            this.scrollLoadBlogList()
          }
        })
      })
      observer.observe(item)
    },
    elementOffset (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return (rect.top + scrollTop)
    },
    async filterByCategory (categoryId) {
      if (this.selectedCategory !== categoryId) {
        this.loading = true
        this.page = 0
        this.offset = 0
        await this.$store.dispatch('blog/getBlogListByParams', {
          category: categoryId,
          limit: this.limit,
          offset: 0
        })
        this.$emit('changeCategory', categoryId)
        this.blogScroll()
        this.loading = false
        window.scrollTo(0, 0)
      }
    }
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
