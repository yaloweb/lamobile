<template>

  <div class="wrapper">

    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"/>

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
