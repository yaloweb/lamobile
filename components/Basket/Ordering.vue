<template>

  <div
    class="ordering"
    v-loading="loading">

    <div class="ordering-title">
      <div class="h3">Оформление заказа</div>
    </div>

    <div class="ordering-form">

      <div class="h4">Получатель</div>

      <FormInput
        label="Имя *"
        name="name"
        placeholder="Ваше имя"
        :invalid="$v.name.$error ? !$v.name.required : false"
        v-model="name"/>

      <FormInput
        label="Фамилия *"
        name="lastName"
        placeholder="Ваша фамилия"
        :invalid="$v.lastName.$error ? !$v.lastName.required : false"
        v-model="lastName"/>

      <FormInput
        label="Почта *"
        name="email"
        placeholder="name@mail.ru"
        :invalid="$v.email.$error ? (!$v.email.required || $v.email.required) : false"
        v-model="email"/>

      <FormInput
        label="Телефон *"
        name="phone"
        placeholder="+ 7(___) ___-__-__"
        v-model="phone"
        :invalid="$v.phone.$error ? (!$v.phone.required || $v.phone.minLength) : false"
        mask="+ 7(###) ###-##-##"/>

      <FormCheckbox
        label=""
        v-model="callMeBack">
        Перезвоните мне
      </FormCheckbox>

    </div>

    <div class="ordering-form">

      <div class="h4">Способ доставки</div>

      <div class="delivery-type">

        <FormRadio
          value="free"
          v-model="deliveryType">
          СДЭК
          <small>бесплатно, 23 июля</small>
        </FormRadio>

        <FormRadio
          value="courier"
          v-model="deliveryType">
          Курьером (по Москве)
          <small>бесплатно, послезавтра</small>
        </FormRadio>

        <FormRadio
          value="express"
          v-model="deliveryType">
          Экспресс доставка
          <small>от 500 ₽</small>
        </FormRadio>

      </div>

    </div>

    <div class="delivery-address ordering-form">

      <div class="h4">Адрес доставки</div>

      <div class="form-group">
        <label class="form-label">Город</label>
        <div class="form-input">
          <v-select
            label="value"
            :options="cities"
            :searchable="false"
            :reduce="city => city.id"
            v-model="locationCode"/>
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
              v-model="street">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Дом"
              v-model="home">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Корп./стр."
              v-model="housing">
          </div>
          <div class="form-row-item">
            <input
              type="text"
              class="form-control"
              placeholder="Квартира"
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
            v-model="date"/>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Время доставки</label>
        <div class="form-input">
          <v-select
            label="value"
            :options="times"
            :searchable="false"
            v-model="time"/>
        </div>
      </div>

      <FormTextarea
        label="Комментарий"
        name="message"
        placeholder="Ваш комментарий"
        v-model="message"/>

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
import { mapGetters } from 'vuex'

export default {
  name: 'BasketOrdering',
  props: {
    loading: Boolean
  },
  validations: {
    name: { required },
    lastName: { required },
    email: { required, email },
    phone: { required, minLength: minLength(18) }
  },
  data: () => ({
    name: 'Олег',
    lastName: 'Олегов',
    email: 'oleg@mail.ru',
    phone: '(999) 999-99-99',
    callMeBack: false,
    deliveryType: 'free',
    locationCode: '',
    street: '',
    housing: '',
    home: '',
    apartment: '',
    date: '',
    time: '',
    message: '',
    paymentOnAccount: false,
    paymentOnline: false,
    privacyPolicy: false,
    submitLoading: false
  }),
  computed: {
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
    }
  },
  methods: {
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
        locationCode: Number(this.locationCode)
      }
      console.log(sendData)
      this.submitLoading = true
      await this.$store.dispatch('order/submitOrder', sendData)
      this.submitLoading = false
      // this.$router.push('/account/basket/success')
    }
  },
  async mounted () {
    await this.$store.dispatch('delivery/getDeliveryData')
    this.locationCode = this.cities[0]?.id
    this.date = this.dates[0]
    this.time = this.times[0]
  }
}
</script>

<style scoped>

</style>
