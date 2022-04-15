<template>
  <div class="s-product-video">
    <div class="container">

      <UIVideo
        :id="info.youtubeVideoId"
        :poster="info.poster"/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionProductVideo',
  props: {
    info: Object
  }
}
</script>

<style scoped>

</style>
