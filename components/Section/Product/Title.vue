<template>
  <div
    v-if="info"
    class="section-block-title">
    <div
      v-if="info.title"
      class="h2"
      v-html="info.title"
    />
    <p
      v-if="info.description"
      v-html="info.description"
    />
  </div>
</template>

<script>
export default {
  name: 'ProductTitle',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
