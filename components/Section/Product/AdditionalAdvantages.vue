<template>
  <section class="s-additional-advantages">
    <div class="container">

      <div class="additional-advantages">

        <div class="additional-advantages-descr">
          <div
            class="h1"
            v-html="additionalAdvantages.title"/>
          <p v-html="additionalAdvantages.descr"/>
        </div>

        <div class="additional-advantages-list">
          <div
            v-for="advantage in additionalAdvantages.list"
            :key="advantage.id"
            class="additional-advantages-item">
            <div class="additional-advantages-item-img">
              <img
                :src="advantage.imgSrc"
                alt="">
            </div>
            <div
              class="additional-advantages-item-title"
              v-html="advantage.title"/>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SectionProductAdditionalAdvantages',
  computed: {
    ...mapState({
      additionalAdvantages: state => state.product.additionalAdvantages
    })
  }
}
</script>

<style scoped>

</style>
