<template>
  <div class="about-page">

    <UIBreadcrumbs/>

    <section class="s-about">
      <div class="container">

        <div class="page-title">
          <h1 v-html="title"/>
        </div>

        <div class="about-banner">
          <img
            :src="banner"
            alt="">
        </div>

        <div
          class="about-descr"
          v-html="descr"/>

        <div class="about-advantages">

          <div
            v-for="(advantage, index) in advantages"
            :key="index"
            class="about-advantages-item">
            <div class="about-advantages-item-img">
              <img
                :src="advantage.img"
                alt="">
            </div>
            <p v-html="advantage.text"/>
          </div>

        </div>

        <div class="about-blockquote">
          <div
            class="h3"
            v-html="blockquote.title"/>
          <p v-html="blockquote.text"/>
        </div>

      </div>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'about',
  mixins: [breadcrumbs],
  computed: {
    ...mapState({
      title: state => state.about.title,
      banner: state => state.about.banner,
      descr: state => state.about.descr,
      advantages: state => state.about.advantages,
      blockquote: state => state.about.blockquote
    })
  },
  data: () => ({
    breadcrumbs: [
      { title: 'О нас' }
    ]
  }),
  async fetch () {
    return await this.$store.dispatch('about/getAboutData')
  }
}
</script>

<style scoped>

</style>
