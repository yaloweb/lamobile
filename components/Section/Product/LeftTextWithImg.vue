<template>
  <div class="left-text-with-img">

    <section class="s-operation">
      <div class="container">

        <div class="operation-block">

          <div class="operation-content">
            <div
              class="h1"
              v-html="info.title"/>
            <p v-html="info.text"/>
          </div>

          <div class="operation-img">
            <img
              :src="info.img"
              alt="">
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LeftTextWithImg',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
