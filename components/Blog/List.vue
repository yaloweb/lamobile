<template>
  <div
    class="magazine-list"
    :class="{'blog-loading': loading}">
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
    scrollAutoLoad: Boolean
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async scrollLoadBlogList () {
      this.loading = true
      await this.$store.dispatch('blog/loadBlog')
      this.blogScroll()
      this.loading = false
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
    }
  },
  mounted () {
    if (this.scrollAutoLoad) {
      this.blogScroll()
    }
  }
}
</script>

<style scoped>

</style>
