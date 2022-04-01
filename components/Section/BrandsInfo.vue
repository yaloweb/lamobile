<template>
  <section class="s-brands-info">
    <div class="container">

      <div class="brands-info">

        <div
          v-if="info.logoSrc"
          class="brands-info-logo">
          <img :src="info.logoSrc" alt="">
        </div>

        <div
          class="brands-info-content"
          v-html="info.descr"/>

        <UIVideo
          v-if="info.youtubeVideo"
          :id="info.youtubeVideo.id"
          :poster="info.youtubeVideo.poster"/>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionBrandsInfo',
  computed: {
    info () {
      return this.$store.state.catalog.brandsMainInfo
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
