<template>

  <div class="wrapper">

    <LayoutsHeader
      :light="true"
      :positionAbsolute="true"/>

    <Nuxt/>

    <LayoutsFooter/>

    <PopupError />

  </div>

</template>

<script>
export default {
  name: 'brands'
}
</script>

<style scoped>

</style>
