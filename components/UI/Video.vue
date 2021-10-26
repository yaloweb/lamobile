<template>

  <div class="video-block">
    <div
      class="video-poster"
      :class="{'active': posterVisible}"
      :style="{backgroundImage: `url(${poster})`}"
      @click="playVideo">
      <span />
    </div>
    <youtube
      ref="video"
      :video-id="id"/>
  </div>

</template>

<script>
export default {
  name: 'UIVideo',
  props: {
    id: String,
    poster: String
  },
  computed: {
    player () {
      return this.$refs.video.player
    }
  },
  data: () => ({
    posterVisible: true
  }),
  methods: {
    playVideo () {
      this.posterVisible = false
      this.player.playVideo()
    }
  }
}
</script>

<style scoped>

</style>
