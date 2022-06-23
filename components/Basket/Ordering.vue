<template>

  <div
    class="ordering"
    v-loading="loading || updating">

    <div class="ordering-title">
      <div class="h3">Оформление заказа</div>
    </div>

    <div class="ordering-form">

      <div class="h4">Получатель</div>

      <FormInput
        label="Имя *"
        name="name"
        placeholder="Ваше имя"
        :invalid="$v.$error ? !$v.name.required : false"
        v-model="name"/>

      <FormInput
        label="Фамилия *"
        name="lastName"
        placeholder="Ваша фамилия"
        :invalid="$v.$error ? !$v.lastName.required : false"
        v-model="lastName"/>

      <FormInput
        label="Почта *"
        name="email"
        placeholder="name@mail.ru"
        :invalid="$v.$error ? !($v.email.required && $v.email.email) : false"
        v-model="email"/>

      <FormInput
        label="Телефон *"
        name="phone"
        placeholder="+ 7(___) ___-__-__"
        v-model="phone"
        :invalid="$v.$error ? !($v.phone.required && $v.phone.minLength) : false"
        mask="+ 7(###) ###-##-##"/>

      <FormCheckbox
        label=""
        v-model="callback">
        Перезвоните мне
      </FormCheckbox>

    </div>

    <div class="ordering-form">

      <div class="h4">Способ доставки</div>

      <div class="delivery-type">

        <FormRadio
          v-for="deliveryServiceItem in deliveryServices"
          :key="deliveryServiceItem.id"
          v-model="deliveryId"
          :value="deliveryServiceItem.id"
          name="deliveryServices"
        >
          {{ deliveryServiceItem.name.toUpperCase() }}
          <small v-html="deliveryServiceItem.description" />
        </FormRadio>

      </div>

    </div>

    <MapCdek
      v-show="cdekVisible"
      :load="cdekVisible"
      :cities="cities"
      @select="selectCdekPoint"
    />

    <div
      v-if="!cdekVisible"
      class="delivery-address ordering-form"
    >

      <div class="h4">Адрес доставки</div>

      <div class="form-group">
        <label class="form-label">Город</label>
        <div class="form-input">
          <v-select
            v-model="locationCode"
            label="value"
            :options="cities"
            :searchable="false"
            :reduce="city => city.code"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Адрес</label>
        <div class="form-row">
          <div class="form-row-item wide">
            <input
              type="text"
              class="form-control"
              placeholder="Улица"
              :class="{'invalid': $v.$error ? !$v.street.required : false}"
              v-model="street">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Дом"
              :class="{'invalid': $v.$error ? !$v.house.required : false}"
              v-model="house">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Корп./стр."
              v-model="building">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Квартира"
              :class="{'invalid': $v.$error ? !$v.apartment.required : false}"
              v-model="apartment">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Дата доставки</label>
        <div class="form-input">
          <v-select
            label="value"
            :options="dates"
            :searchable="false"
            :reduce="item => item.id"
            v-model="deliveryDate"/>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Время доставки</label>
        <div class="form-input">
          <v-select
            label="value"
            :options="times"
            :searchable="false"
            :reduce="item => item.id"
            v-model="deliveryTime"/>
        </div>
      </div>

      <FormTextarea
        label="Комментарий"
        name="message"
        placeholder="Ваш комментарий"
        v-model="comment"/>

    </div>

    <div class="delivery-payment-type ordering-form">

      <div class="h4">Оплата</div>

      <div class="delivery-payment-type-item">
        <img src="/img/icons/card.svg" alt="">Онлайн-оплата
      </div>

      <div class="delivery-captcha">
        <p>Подтвердите, что вы не робот *</p>
        <recaptcha />
      </div>

      <div class="privacy-policy-checkbox">
        <FormCheckbox
          v-model="privacyPolicy"
          classes="square">
          Я согласен с <a href="#">политикой обработки персональных данных</a>
        </FormCheckbox>
      </div>

      <div
        v-if="$v.$error"
        class="error-text">Пожалуйста, заполните обязательные поля и проверьте корректность введенных данных</div>

      <div class="delivery-confirm">
        <button
          class="btn"
          :disabled="canOrder || submitLoading"
          :class="{'loading': submitLoading}"
          @click="submitOrder"
        >
          Заказать
        </button>
      </div>

    </div>

  </div>

</template>

<script>

import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BasketOrdering',
  props: {
    loading: Boolean
  },
  validations () {
    if (this.cdekVisible) {
      return {
        name: { required },
        lastName: { required },
        email: {
          required,
          email
        },
        phone: {
          required,
          minLength: minLength(18)
        }
      }
    } else {
      return {
        name: { required },
        lastName: { required },
        email: {
          required,
          email
        },
        phone: {
          required,
          minLength: minLength(18)
        },
        street: { required },
        house: { required },
        apartment: { required }
      }
    }
  },
  watch: {
    deliveryId (value) {
      let params = {
        send: 'n',
        deliveryId: value
      }
      if (this.usedPromocode) {
        params.promocode = this.usedPromocode
      }
      this.sendOrder(params)
    },
    async verificationPromocode (value) {
      this.$store.commit('promocode/setPromocodeLoading', true)
      this.$store.commit('promocode/setPromocodeApplied', false)
      await this.sendOrder({
        send: 'n',
        promocode: value
      })
      this.$store.commit('promocode/setPromocodeApplied', !!this.usedPromocode)
      this.$store.commit('promocode/setPromocodeLoading', false)
    }
  },
  computed: {
    ...mapState({
      deliveryServices: state => state.order.deliveryServices,
      paymentServices: state => state.order.paymentServices,
      verificationPromocode: state => state.promocode.promocode,
      usedPromocode: state => state.order.promocode
    }),
    ...mapGetters({
      cities: 'delivery/getCities',
      times: 'delivery/getTimes',
      dates: 'delivery/getDates'
    }),
    canOrder () {
      let can = true
      if (!this.privacyPolicy) {
        can = false
      }
      return !can
    },
    cdekVisible () {
      return this.deliveryServices.filter(delivery => delivery.id === this.deliveryId)[0]?.isSdek
    }
  },
  data: () => ({
    name: null,
    lastName: null,
    email: null,
    phone: null,
    callback: false,
    deliveryId: null,
    locationCode: null,
    cdekLocationCode: null,
    storeCode: null,
    storeAddress: null,
    street: null,
    house: null,
    building: null,
    apartment: null,
    deliveryDate: null,
    deliveryTime: null,
    comment: null,
    privacyPolicy: false,
    submitLoading: false,
    updating: false
  }),
  methods: {
    async sendOrder (params) {
      // this.updating = true
      await this.$store.dispatch('order/sendOrder', params ? { ...params } : {})
      // this.updating = false
    },
    setDefaultDeliveryService () {
      if (this.deliveryServices && this.deliveryServices.length) {
        this.deliveryId = this.deliveryServices[0].id
      }
    },
    async submitOrder () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      const sendData = {
        send: 'y',
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        callback: this.callback,
        deliveryId: this.deliveryId,
        paySystemId: this.paymentServices[0].id
      }

      if (this.cdekVisible) {
        if (!this.cdekLocationCode) {
          this.$store.commit('error/setErrorText', 'Вы не выбрали пункт самовывоза.')
          this.$store.commit('error/openErrorModal')
          return false
        }
        sendData.locationCode = this.cdekLocationCode
        sendData.storeCode = this.storeCode
        sendData.storeAddress = this.storeAddress
      } else {
        sendData.locationCode = this.locationCode
        sendData.street = this.street
        sendData.house = this.house
        sendData.building = this.building
        sendData.apartment = this.apartment
        sendData.deliveryDate = this.deliveryDate
        sendData.deliveryTime = this.deliveryTime
        sendData.comment = this.comment
      }

      if (this.usedPromocode) {
        sendData.promocode = this.usedPromocode
      }

      this.submitLoading = true

      try {
        await this.$store.dispatch('order/submitOrder', sendData).then(data => {
          if (data.result !== 'error') {
            this.submitLoading = false
            this.$router.push({
              path: '/account/basket/success',
              query: {
                id: data.orderId,
                email: sendData.email,
                hash: data.orderHash
              }
            })
          }
        })
      } catch (e) {
        this.$store.commit('error/setErrorDefault')
        this.$store.commit('error/openErrorModal')
      }

      this.submitLoading = false
    },
    selectCdekPoint (location) {
      this.cdekLocationCode = location.code
      this.storeCode = location.id
      this.storeAddress = location.address
    }
  },
  async mounted () {
    await this.sendOrder()
    this.setDefaultDeliveryService()
    await this.$store.dispatch('delivery/getDeliveryData')
    this.locationCode = this.cities[0]?.code
    this.deliveryDate = this.dates[0]
    this.deliveryTime = this.times[0]
  }
}
</script>

<style scoped>

</style>
