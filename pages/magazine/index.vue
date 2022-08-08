<template>

  <div
    v-if="pageLoad"
    class="magazine-page">

    <UIBreadcrumbs/>

    <div class="page-content">

      <div class="container">
        <UIPageTitle title="Журнал" />
      </div>

      <section class="s-magazine">
        <div class="container">

          <BlogList
            :list="blog"
            :scrollAutoLoad="true"
            :selectedCategory="selectedCategory"
            :limit="limit"
            :filterVisible="true"
            @changeCategory="selectedCategory = $event"
          />

        </div>
      </section>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import breadcrumbs from '@/mixins/breadcrumbs'
export default {
  name: 'Magazine',
  mixins: [breadcrumbs],
  async fetch () {
    await this.$store.dispatch('blog/getCategories')
    this.selectedCategory = this.categories[0].id
    const blogPromise = await this.$store.dispatch('blog/loadBlog', {
      category: this.selectedCategory,
      limit: this.limit,
      offset: 0
    })
    this.pageLoad = true
    return blogPromise
  },
  computed: {
    ...mapState({
      blog: state => state.blog.blog,
      categories: state => state.blog.categories
    })
  },
  data: () => ({
    selectedCategory: 0,
    pageLoad: false,
    limit: 12,
    breadcrumbs: [
      {
        title: 'Журнал'
      }
    ]
  })
}
</script>
