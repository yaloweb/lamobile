<template>
  <div class="form-quantity-input">
    <button
      @click="minusValue">
      <span class="icon-minus" />
    </button>
    <input
      ref="input"
      type="number"
      :value="value"
      readonly>
    <button
      @click="plusValue">
      <span class="icon-plus" />
    </button>
  </div>
</template>

<script>

export default {
  name: 'FormQuantityInput',
  model: {
    prop: 'value',
    event: ['change']
  },
  props: {
    value: Number
  },
  methods: {
    minusValue () {
      if (this.val > 0) {
        this.$emit('change-quantity', this.value - 1)
      }
    },
    plusValue () {
      this.$emit('change-quantity', this.value + 1)
    }
  },
  mounted () {
    this.val = this.value || 0
  }
}
</script>

<style
  lang="sass"
  scoped
>

</style>
