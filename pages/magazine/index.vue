<template>

  <div class="magazine-page">

    <UIBreadcrumbs/>

    <div class="page-content">

      <div class="page-title">
        <h1>Журнал</h1>
      </div>

      <section class="s-magazine">
        <div class="container">

          <BlogList
            ref="blogList"
            :list="blog"
            :scrollAutoLoad="true"/>

          <div class="magazine-categories">
            <nav class="magazine-categories-nav">
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

        </div>
      </section>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'Magazine',
  async fetch () {
    const ajax = await Promise.all([
      this.$store.dispatch('blog/getBlog'),
      this.$store.dispatch('blog/getCategories')
    ])
    this.selectedCategory = this.categories[0].id
    return ajax
  },
  computed: {
    ...mapState({
      blog: state => state.blog.blog,
      categories: state => state.blog.categories
    })
  },
  data: () => ({
    selectedCategory: 0
  }),
  methods: {
    async filterByCategory (categoryId) {
      this.loading = true
      await this.$store.dispatch('blog/filterBlogByCategory', categoryId)
      this.selectedCategory = categoryId
      this.$refs.blogList.blogScroll()
      window.scrollTo(0, 0)
    }
  }
}
</script>
