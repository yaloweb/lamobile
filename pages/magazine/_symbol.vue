<template>
  <div class="post-page">

    <section class="s-post-banner">

      <UIBreadcrumbs/>

      <div class="mob-back-link">
        <a
          href="#"
          @click.prevent="$router.go(-1)"/>
      </div>

      <div
        class="post-banner"
        :class="{'with-mob-banner': post.mobBanner}">
        <img
          :src="post.banner"
          alt="">
        <img
          v-if="post.mobBanner"
          class="post-banner-mob"
          :src="post.mobBanner"
          alt="">
      </div>

    </section>

    <section class="s-post-content">
      <div class="container">

        <div class="post-content">

          <h1 v-html="post.title"/>

          <div class="post-content-info">
            <div class="post-content-created">{{ post.createdAt | dateFormat }}</div>
            <div class="post-content-category">{{ post.category }}</div>
            <div class="post-content-views">
              {{ post.views }} {{ $options.filters.declensionNumbers(post.views, ['просмотр', 'просмотра', 'просмотров']) }}
            </div>
          </div>

          <div
            class="post-content-descr"
            v-html="post.descr"/>

          <template v-for="(type, key) in post.content">

            <PostImgText
              v-if="key === 'block_1'"
              :key="key"
              :content="type"/>

            <PostImgSlider
              v-if="key === 'img_slider'"
              :key="key"
              :list="type"/>

            <PostTitleText
              v-if="key === 'block_2'"
              :key="key"
              :content="type"/>

            <PostImgTitleText
              v-if="key === 'block_3'"
              :key="key"
              :content="type"/>

          </template>

          <div class="post-content-share">
            <nav class="soc">
              <a href="#" target="_blank">
                <img src="/img/icons/facebook.svg" alt="">
              </a>
              <a href="#" target="_blank">
                <img src="/img/icons/twitter.svg" alt="">
              </a>
              <a href="#" target="_blank">
                <img src="/img/icons/vk.svg" alt="">
              </a>
              <a href="#" target="_blank">
                <img src="/img/icons/ok.svg" alt="">
              </a>
              <a href="#" target="_blank">
                <img src="/img/icons/google-plus.svg" alt="">
              </a>
            </nav>
          </div>

        </div>

      </div>
    </section>

    <section
      v-if="post.similar"
      class="s-similar">
      <div class="container">

        <div class="section-title">
          <div class="h3">Похожее в журнале</div>
        </div>

        <SliderSimilar :list="post.similar"/>

      </div>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    const symbol = this.$route.params.symbol
    return await this.$store.dispatch('post/getPostData', symbol)
  },
  name: 'MagazinePost',
  layout: 'brands',
  computed: {
    ...mapState({
      post: state => state.post
    })
  }
}
</script>

<style scoped>

</style>
