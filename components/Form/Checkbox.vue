<template>
  <div class="form-group form-group-checkbox">
    <label
      v-if="label"
      class="form-label">{{label}}</label>
    <div
      class="form-checkbox"
      :class="[classes, {'disabled': disabled}]">
      <label>
        <input
          type="checkbox"
          :name="name"
          :checked="isChecked"
          :disabled="disabled"
          @change="onChange">
        <span><slot/></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormCheckbox',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    label: String,
    checkBool: Boolean,
    modelValue: { default: '' },
    trueValue: { default: true },
    falseValue: { default: false },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    classes: [String, Object, Array]
  },
  computed: {
    isChecked () {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === this.trueValue
    }
  },
  created () {
    this.checked = this.checkBool
  },
  methods: {
    onChange (event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
