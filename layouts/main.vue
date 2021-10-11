<template>

  <div class="wrapper">

    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"/>

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
