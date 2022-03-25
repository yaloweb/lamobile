<template>

  <div class="wrapper wrapper--home">

    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"
      :light="true"/>

    <Nuxt/>

    <LayoutsFooter/>

  </div>

</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
