<template>
  <div class="block-img">
    <img :src="info.img" alt="">
  </div>
</template>

<script>
export default {
  name: 'Img',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
