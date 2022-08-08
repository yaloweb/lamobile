<template>

  <div class="wrapper">

    <LayoutsHeader/>

    <LayoutsHeader
      :sticky="true"
    />

    <Nuxt/>

    <LayoutsFooter/>

    <PopupError />

    <UIAlert/>

  </div>

</template>

<script>
export default {
  name: 'default'
}
</script>

<style scoped>

</style>
