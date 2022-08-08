<template>
  <div
    v-if="paymentAndDelivery"
    class="payment-and-delivery">

    <div
      class="delivery-descr"
      v-html="paymentAndDelivery.descr"/>

    <div class="delivery-cities">

      <div
        v-for="(city, index) in paymentAndDelivery.cities"
        :key="index"
        class="delivery-cities-item">
        <div
          class="h4"
          v-html="city.title"/>
        <div
          class="delivery-cities-item-content"
          v-html="city.descr"/>
      </div>

    </div>

    <div class="delivery-info">

      <div
        v-for="(info, index) in paymentAndDelivery.info"
        :key="index"
        class="delivery-info-item">
        <div
          class="h4"
          v-html="info.title"/>
        <div
          class="delivery-info-item-content"
          v-html="info.descr"/>
      </div>

    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'PaymentAndDelivery',
  computed: {
    ...mapState({
      paymentAndDelivery: state => state.forUsers.paymentAndDelivery
    })
  }
}
</script>

<style scoped>

</style>
