<template>
  <div class="text-block">
    <img
      v-if="content.img"
      :src="content.img"
      alt="">
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
  name: 'PostImgTitleText',
  props: {
    content: Object
  }
}
</script>

<style scoped>

</style>
