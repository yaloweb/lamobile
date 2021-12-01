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
    opened: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    height: 0
  }),
  computed: {
    content () {
      return this.$refs.content
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle', this.opened)
    }
  },
  mounted () {
    const h = this.content.scrollHeight
    this.height = h
  }
}
</script>

<style scoped>

</style>
