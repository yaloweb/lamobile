<template>

  <div class="magazine-page">

    <UIBreadcrumbs/>

    <div class="page-content">

      <div class="page-title">
        <h1>Журнал</h1>
      </div>

      <section class="s-magazine">
        <div class="container">

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
                v-for="(blogItem, index) in blog"
                :key="index"
                class="magazine-item"
                v-masonry-tile>
                <BlogItem :item="blogItem"/>
              </div>

              <span class="magazine-row-sizer"></span>
              <span class="magazine-row-gutter"></span>

            </div>
          </div>

          <div class="magazine-categories">
            <nav class="magazine-categories-nav">
              <a
                v-for="category in blogCategories"
                :key="category.id"
                href="#"
                @click.prevent="filterByCategory(category.id)">
                {{category.title}}
              </a>
            </nav>
          </div>

        </div>
      </section>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'magazine',
  async fetch () {
    return await this.$store.dispatch('blog/getBlog')
  },
  computed: {
    ...mapState({
      blog: state => state.blog.blog,
      blogCategories: state => state.blog.categories
    })
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async filterByCategory (categoryId) {
      this.loading = true
      await this.$store.dispatch('blog/filterBlogByCategory', categoryId)
      this.blogScroll()
    },
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
    this.blogScroll()
  }
}
</script>

<style scoped>

</style>
