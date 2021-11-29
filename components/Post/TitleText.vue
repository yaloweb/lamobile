<template>
  <div class="text-block">
    <h3
      v-if="content.title"
      v-html="content.title"/>
    <div
      v-if="content.text"
      v-html="content.text"/>
  </div>
</template>

<script>
export default {
  name: 'PostTitleText',
  props: {
    content: Object
  }
}
</script>

<style scoped>

</style>
