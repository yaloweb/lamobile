<template>
  <div class="catalog-page"></div>
</template>

<script>
export default {
  name: 'catalog-page',
  middleware: ({ store, redirect }) => {
    const category = store.state.catalog.categories[0].code
    redirect(`/catalog/${category}`)
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
