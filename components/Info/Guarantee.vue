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

    <div
      v-if="guarantee.defect"
      class="quarantee-defect">

      <div
        class="h4"
        v-html="guarantee.defect.title"/>

      <ol>
        <li
          v-for="(item, index) in guarantee.defect.list"
          :key="index"
          v-html="item"/>
      </ol>

      <p v-html="guarantee.defect.attention"/>

    </div>

    <div
      v-if="guarantee.term"
      class="quarantee-terms">

      <div
        class="h4"
        v-html="guarantee.term.title"/>

      <div class="quarantee-terms-items">

        <div
          v-for="(item, index) in guarantee.term.list"
          :key="index"
          class="quarantee-term">

          <div
            class="quarantee-term-title"
            v-html="item.title" />

          <ul>
            <li
              v-for="(product, index) in item.list"
              :key="index"
              v-html="product"/>
          </ul>

        </div>

      </div>

      <p v-html="guarantee.term.descr"/>

    </div>

    <div
      v-if="guarantee.nonWarrantyCases"
      class="guarantee-warranty-cases">

      <div
        class="h4"
        v-html="guarantee.nonWarrantyCases.title"/>

      <ul>
        <li
          v-for="(item, index) in guarantee.nonWarrantyCases.list"
          :key="index">
          <p v-html="item.title" />
          <p><span v-html="item.descr"/></p>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'Guarantee',
  validations: {
    serialNumber: { required },
    orderNumber: { required }
  },
  computed: {
    ...mapState({
      guarantee: state => state.forUsers.guarantee
    })
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
