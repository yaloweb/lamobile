<template>
  <div class="img-with-title">

    <SectionProductTitle :info="info" />

    <div
      v-if="info.img"
      class="section-block-img">
      <img :src="info.img" alt="">
    </div>

  </div>
</template>

<script>
export default {
  name: 'ImgWithTitle',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
