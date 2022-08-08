<template>
  <div
    class="banner-item">

    <div
      class="banner-item-title"
      v-html="title"
    />

    <p v-html="descr"/>

    <UIButton
      v-if="link"
      :url="link"
      title="Подробнее"
    />

  </div>
</template>

<script>
export default {
  name: 'BannerTextContent',
  props: {
    title: String,
    descr: String,
    link: String
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
