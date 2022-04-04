<template>
  <div class="form-quantity-input">
    <button
      @click="minusValue">
      <span class="icon-minus" />
    </button>
    <input
      ref="input"
      type="number"
      v-model="val"
      @input="setValue"
      @focus="val === 0 ? val = null : false"
      @blur="inputBlur">
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
    value: Number,
    max: Number
  },
  watch: {
    value (newVal) {
      this.val = newVal
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  methods: {
    change () {
      if (this.val === '') {
        this.val = null
      }
      this.$emit('change', parseInt(this.val || 0))
    },
    setValue () {
      if (this.val < 0) {
        this.val = 0
      }
      if (this.val >= this.max) {
        this.val = this.max
      }
      this.change()
    },
    minusValue () {
      if (this.val > 0) {
        this.val--
        this.change()
      }
    },
    plusValue () {
      let val = this.val + 1
      if (val >= this.max) {
        this.val = this.max
      } else {
        this.val++
      }
      this.change()
    },
    inputBlur () {
      if (this.val === null) {
        this.val = 0
      }
      this.val = parseInt(this.val)
      this.change()
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
