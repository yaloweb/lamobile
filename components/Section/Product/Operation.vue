<template>

  <section class="s-operation">
    <div class="container">

      <div class="operation-block">

        <div class="operation-content">
          <div
            class="h1"
            v-html="operation.title"/>
          <p v-html="operation.descr"/>
        </div>

        <div class="operation-img">
          <img
            :src="operation.imgSrc"
            alt="">
        </div>

      </div>
    </div>
  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SectionProductOperation',
  computed: {
    ...mapState({
      operation: state => state.product.operation
    })
  }
}
</script>

<style scoped>

</style>
