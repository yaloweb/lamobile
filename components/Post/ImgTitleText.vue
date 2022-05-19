<template>
  <div class="text-block">
    <template v-if="content.img">
      <video
        v-if="isVideo"
        :src="content.img"
        controls
      />
      <img
        v-else
        :src="content.img"
        alt="">
    </template>
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
  },
  computed: {
    isVideo () {
      return this.content.img.includes('mp4')
    }
  }
}
</script>

<style scoped>

</style>
