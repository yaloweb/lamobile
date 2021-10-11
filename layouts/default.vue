<template>

  <div class="wrapper">

    <LayoutsHeader/>

    <Nuxt/>

  </div>

</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('global/getGlobal')
  },
  name: 'default'
}
</script>

<style scoped>

</style>
