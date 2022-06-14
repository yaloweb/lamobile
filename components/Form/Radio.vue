<template>
  <div class="form-group form-group-checkbox">
    <div
      class="form-checkbox"
      :class="{'disabled': disabled}">
      <label>
        <input
          type="radio"
          :name="name"
          :checked="isChecked"
          :value="value"
          @change="$emit('change', $event.target.value)">
        <span><slot /></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRadio',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: { default: '' },
    value: {
      type: String,
      default: undefined
    },
    disabled: Boolean,
    name: String
  },
  computed: {
    isChecked () {
      return this.modelValue === this.value
    }
  }
}
</script>

<style scoped>

</style>
