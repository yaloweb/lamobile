<template>

  <div
    ref="category"
    class="categories-item"
    @mousemove="hoverMove"
    @mouseenter="hoverIconVisible = true"
    @mouseleave="hoverIconVisible = false"
  >

    <div
      class="categories-item-arrow-hover"
      :class="{'visible': hoverIconVisible}"
      :style="{transform: `translate(${hoverX}px, ${hoverY}px)`}"/>

    <nuxt-link :to="'/magazine/' + item.id" />

    <div class="categories-item-img">

      <img
        v-if="item.imgSrc"
        :src="item.imgSrc"
        alt="">

      <div
        v-else
        class="categories-item-no-picture">
        <img src="/img/icons/photo-camera.png" alt="">
        <span>Нет изображения</span>
      </div>

    </div>

    <div
      class="categories-item-content"
      :class="{'only-title': item.descr.length === 0}">
      <div
        class="categories-item-tag"
        v-text="item.tag"/>
      <div class="categories-item-text">
        <div
          class="categories-item-title"
          v-html="item.title"/>
        <div
          v-if="item.descr.length > 0"
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
  data: () => ({
    hoverX: 0,
    hoverY: 0,
    hoverIconVisible: false
  }),
  methods: {
    transformTitle () {
      const item = this.$refs.category
      const title = item.querySelector('.categories-item-title')
      const descr = item.querySelector('.categories-item-descr')
      if (descr) {
        const descrH = descr.offsetHeight
        const margin = parseFloat(window.getComputedStyle(descr, null).marginTop)
        title.style.transform = `translateY(${descrH + margin}px)`
      }
    },
    hoverMove (event) {
      this.hoverX = event.offsetX - 30
      this.hoverY = event.offsetY - 30
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
