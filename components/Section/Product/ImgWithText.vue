<template>
  <div class="img-with-text">

    <SectionProductTitle :info="info"/>

    <div class="img-with-text-block">

      <img
        :src="info.img"
        alt="">

      <p
        v-if="info.text"
        v-html="info.text"
      />

    </div>

  </div>
</template>

<script>
export default {
  name: 'ImgWithText',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
