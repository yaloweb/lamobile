<template>

  <div
    v-if="pageLoad"
    class="magazine-page">

    <UIBreadcrumbs/>

    <div class="mob-back-link">
      <a
        href="#"
        @click.prevent="$router.go(-1)"/>
    </div>

    <div class="page-content">

      <div class="page-title">

        <div class="mob-back-link">
          <a
            href="#"
            @click.prevent="$router.go(-1)"/>
        </div>

        <h1>Журнал</h1>

      </div>

      <section class="s-magazine">
        <div class="container">

          <BlogList
            ref="blogList"
            :list="blog"
            :scrollAutoLoad="true"
            :selectedCategory="selectedCategory"
            :limit="limit"
            @changeCategory="selectedCategory = $event"
          />

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
    limit: 12
  })
}
</script>
