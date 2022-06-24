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

          <p>Номер отслеживания заказа: {{ id }}</p>

          <button
            v-if="!isPaid"
            class="btn"
            :class="{'loading': paymentLoading}"
            :disabled="paymentLoading"
            @click.prevent="openPaymentModal"
          >Перейти к оплате
          </button>

          <div
            v-else
            class="order-success-payment"
          >
            <div class="order-success-payment-icon">
              <span class="icon-checkmark" />
            </div>
            <span
              class="order-success-payment-text"
            >
              Заказ успешно оплачен!
            </span>
          </div>

          <div
            v-if="!isPaid"
            class="order-success-email"
          >
            Также ссылка для оплаты отправлена на вашу почту {{ email }}
          </div>

          <div class="order-success-footer">
            <span>Обращаем ваше внимание, что заказы оформленные в регионы России мы отправляем после полной оплаты.</span>
            В ближайшее время (в рабочие часы магазина) мы свяжемся с вами по указанному контактному телефону для
            подтверждения вашего заказа.
          </div>

        </div>

      </div>

      <Popup
        :show="paymentPopup"
        @close="paymentPopup = false"
        class="payment-popup"
      >
        <div
          class="payment-output"
          v-html="bufferedOutput"
        />
      </Popup>

    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSuccess',
  computed: {
    id () {
      return this.$route.query.id
    },
    email () {
      return this.$route.query.email
    },
    hash () {
      return this.$route.query.hash
    }
  },
  data: () => ({
    paymentLoading: false,
    bufferedOutput: null,
    paymentPopup: false,
    isPaid: false
  }),
  methods: {
    async getOrderData () {
      this.paymentLoading = true
      await this.$store.dispatch('order/paymentCheckout', {
        id: this.id,
        hash: this.hash
      }).then(resp => {
        if (resp.result === 'success') {
          this.bufferedOutput = resp.item.paymentAction.bufferedOutput
          this.isPaid = resp.item.paymentAction.isPaid
        }
      }).catch(() => {
        this.$store.commit('error/setErrorDefault')
        this.$store.commit('error/openErrorModal')
      })
      this.paymentLoading = false
    },
    openPaymentModal () {
      this.paymentPopup = true
    }
  },
  async mounted () {
    await this.getOrderData()
  }
}
</script>

<style scoped>

</style>
