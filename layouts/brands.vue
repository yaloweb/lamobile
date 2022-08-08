<template>

  <div class="wrapper">

    <LayoutsHeader
      :light="true"
      :positionAbsolute="true"
    />

    <LayoutsHeader
      :sticky="true"
    />

    <Nuxt/>

    <LayoutsFooter/>

    <PopupError/>

    <UIAlert/>

  </div>

</template>

<script>
export default {
  name: 'brands'
}
</script>

<style scoped>

</style>
