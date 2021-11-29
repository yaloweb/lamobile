<template>

  <div
    ref="category"
    class="categories-item">

    <nuxt-link :to="item.url" />

    <div class="categories-item-img">
      <img
        :src="item.imgSrc"
        alt="">
    </div>

    <div class="categories-item-content">
      <div
        class="categories-item-tag"
        v-text="item.tag"/>
      <div class="categories-item-text">
        <div
          class="categories-item-title"
          v-html="item.title"/>
        <div
          class="categories-item-descr"
          v-html="item.descr"/>
        <div class="categories-item-more">
          <nuxt-link
            v-if="withMobBtn"
            :to="item.url">Подробнее</nuxt-link>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    item: Object,
    withMobBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    transformTitle () {
      const item = this.$refs.category
      const title = item.querySelector('.categories-item-title')
      const descr = item.querySelector('.categories-item-descr')
      const descrH = descr.offsetHeight
      const margin = parseFloat(window.getComputedStyle(descr, null).marginTop)
      title.style.transform = `translateY(${descrH + margin}px)`
    }
  },
  mounted () {
    this.transformTitle()
    window.addEventListener('resize', this.transformTitle)
    window.addEventListener('load', this.transformTitle)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.transformTitle)
      window.removeEventListener('load', this.transformTitle)
    })
  }
}
</script>

<style scoped>

</style>
