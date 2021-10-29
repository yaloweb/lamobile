<template>

  <div class="form-group">
    <label class="form-label">{{label}}</label>
    <textarea
      class="form-control"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput" />
  </div>

</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    name: String,
    placeholder: String,
    value: [String, Number]
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
