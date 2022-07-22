<template>
  <div class="post-page">

    <section class="s-post-content">
      <div class="container">

        <div class="post-content">

          <UIPageTitle :title="post.title" />

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

          <UIVideo
            v-if="post.video"
            :id="post.video"
            :poster="post.video.poster"
          />

          <template v-for="block in post.content">

            <PostImgText
              v-if="block.template === 'block_1'"
              :key="block.id"
              :content="block.data"/>

            <PostImgSlider
              v-if="block.template === 'img_slider'"
              :key="block.id"
              :list="block.data"/>

            <PostTitleText
              v-if="block.template === 'block_2'"
              :key="block.id"
              :content="block.data"/>

            <PostImgTitleText
              v-if="block.template === 'block_3'"
              :key="block.id"
              :content="block.data"/>

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
  name: 'MagazinePost',
  async fetch () {
    const id = this.$route.params.id
    return await this.$store.dispatch('post/getPostData', id)
  },
  computed: {
    ...mapState({
      post: state => state.post
    })
  }
}
</script>

<style scoped>

</style>
