<template>

  <div class="form-group">
    <label class="form-label">{{label}}</label>
    <input
      class="form-control"
      :value="value"
      :type="type === 'password' ? ( checkPass ? 'text' : 'password' ) : type"
      :name="name"
      :placeholder="placeholder"
      v-mask="mask"
      @input="handleInput">
    <span
      v-if="type === 'password'"
      @click="checkPass = !checkPass"
      class="check-password"
      :class="{'active': checkPass}"/>
  </div>

</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    placeholder: String,
    value: [String, Number],
    mask: String
  },
  data: () => ({
    checkPass: false
  }),
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
