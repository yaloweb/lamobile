<template>

  <nav class="breadcrumbs">
    <div class="container">
      <ul>
        <li>
          <nuxt-link to="/"><span class="icon-lion"/></nuxt-link>
        </li>
        <li
          v-for="(breadcrumb, idx) in breadcrumbs"
          :key="idx"
        >
          <nuxt-link
            v-if="breadcrumb.link"
            :to="breadcrumb.link"
          >
            {{ breadcrumb.title }}
          </nuxt-link>
          <span v-else>
            {{ breadcrumb.title }}
          </span>
        </li>
      </ul>

    </div>
  </nav>

</template>

<script>
export default {
  name: 'UIBreadcrumbs',
  computed: {
    breadcrumbs () {
      return this.$store.state.breadcrumbs.list
    }
  }
}
</script>

<style scoped>

</style>
