<template>
  <div class="text-block">
    <img
      v-if="content.img"
      :src="content.img"
      alt="">
    <div
      v-if="content.text"
      v-html="content.text"/>
  </div>
</template>

<script>
export default {
  name: 'PostImgText',
  props: {
    content: Object
  }
}
</script>

<style scoped>

</style>
