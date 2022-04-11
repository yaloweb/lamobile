<template>

  <div class="wrapper wrapper--home">

    <LayoutsHeader
      :logo="false"
      :positionAbsolute="true"
      :light="true"/>

    <Nuxt/>

    <LayoutsFooter/>

    <PopupError />

    <UIAlert/>

  </div>

</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
