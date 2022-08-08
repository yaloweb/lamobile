<template>
  <div class="error-page">
    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"
      :light="true"
    />

    <LayoutsHeader
      :sticky="true"
    />

    <Nuxt/>

    <LayoutsFooter :light="true"/>

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
