<template>

  <div
    class="form-group"
    :class="classes">
    <label class="form-label">{{ label }}</label>
    <div class="form-input">
      <input
        class="form-control"
        :class="{'pass-input': type === 'password', 'invalid': invalid}"
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
    mask: String,
    classes: [String, Object, Array],
    invalid: {
      type: Boolean,
      default: false
    }
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
