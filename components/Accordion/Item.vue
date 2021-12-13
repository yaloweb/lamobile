<template>
  <div
    class="accordion-item"
    :class="{'opened': opened}">

    <div
      class="accordion-title"
      @click="toggle">
      <slot name="header"/>
      <span class="accordion-item-toggle" />
    </div>

    <div
      class="accordion-body"
      :style="{maxHeight: `${height}px`}">
      <div
        class="accordion-body-content"
        ref="content">
        <slot name="body"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  props: {
    opened: Boolean
  },
  data: () => ({
    height: 0
  }),
  watch: {
    opened (newVal) {
      if (newVal) {
        this.getContentHeight()
      }
    }
  },
  computed: {
    content () {
      return this.$refs.content
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle', this.opened)
    },
    getContentHeight () {
      const h = this.content.scrollHeight
      this.height = h
    }
  },
  mounted () {
    this.getContentHeight()
    window.addEventListener('resize', this.getContentHeight)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.getContentHeight))
  }
}
</script>

<style scoped>

</style>
