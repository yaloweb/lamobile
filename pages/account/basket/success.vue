<template>
  <div class="order-success-page">
    <div class="container">

      <div class="order-success-block">

        <div class="back-circle-link">
          <nuxt-link to="/">
            <span class="icon-angle-left-light-2"></span>
          </nuxt-link>
        </div>

        <div class="order-success-content">

          <h1>Спасибо, <br>ваш заказ оформлен!</h1>

          <p>Номер отслеживания заказа: {{ successData.id }}</p>

          <a href="#" class="btn">Перейти к оплате</a>

          <div class="order-success-email">Также ссылка для оплаты отправлена на вашу почту {{ successData.email }}</div>

          <div class="order-success-footer">
            <span>Обращаем ваше внимание, что заказы оформленные в регионы России мы отправляем после полной оплаты.</span>
            В ближайшее время (в рабочие часы магазина) мы свяжемся с вами по указанному контактному телефону для подтверждения вашего заказа.
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'OrderSuccess',
  computed: {
    ...mapState({
      successData: state => state.order.successData
    })
  }
}
</script>

<style scoped>

</style>
