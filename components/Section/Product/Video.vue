<template>
  <section class="s-product-video">
    <div class="container">

      <UIVideo
        :id="youtubeVideo.id"
        :poster="youtubeVideo.poster"/>

    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SectionProductVideo',
  computed: {
    ...mapState({
      youtubeVideo: state => state.product.youtubeVideo
    })
  }
}
</script>

<style scoped>

</style>
