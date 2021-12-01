<template>
  <div class="error-page">
    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"
      :light="true"/>

    <Nuxt/>

    <LayoutsFooter :light="true"/>
  </div>
</template>

<script>
export default {
  name: 'error-layout'
}
</script>

<style scoped>

</style>
