<template>
  <div class="guarantee-component">

    <div class="guarantee-forms">

      <form
        class="quarantee-form"
        @submit.prevent="serialNumberSubmit">
        <div class="quarantee-form-title">Проверка гарантии по серийному номеру товара:</div>
        <div class="quarantee-form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Введите серийный номер товара"
            :class="{'invalid': $v.serialNumber.$error}"
            v-model="serialNumber">
          <button type="submit" class="btn">Проверить</button>
        </div>
      </form>

      <form
        class="quarantee-form"
        @submit.prevent="orderNumberSubmit">
        <div class="quarantee-form-title">Проверка гарантии по номеру заказа:</div>
        <div class="quarantee-form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Номер заказа"
            :class="{'invalid': $v.orderNumber.$error}"
            v-model="orderNumber">
          <button type="submit" class="btn">Проверить</button>
        </div>
      </form>

    </div>

  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Guarantee',
  validations: {
    serialNumber: { required },
    orderNumber: { required }
  },
  data: () => ({
    serialNumber: '',
    orderNumber: ''
  }),
  methods: {
    serialNumberSubmit () {
      if (this.$v.serialNumber.$invalid) {
        this.$v.serialNumber.$touch()
        return false
      }
    },
    orderNumberSubmit () {
      if (this.$v.orderNumber.$invalid) {
        this.$v.orderNumber.$touch()
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
