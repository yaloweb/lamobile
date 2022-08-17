<template>
  <div class="error-page">
    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"
    />

    <LayoutsHeader
      :sticky="true"
    />

    <Nuxt/>

    <LayoutsFooter/>

    <PopupError />

  </div>
</template>

<script>
export default {
  name: 'error-layout'
}
</script>

<style scoped>

</style>
