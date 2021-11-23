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
        name="surname"
        placeholder="Ваша фамилия"
        :invalid="$v.surname.$error ? !$v.surname.required : false"
        v-model="surname"/>

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
            v-model="city"/>
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

      <FormCheckbox
        :withLabel="false"
        v-model="paymentOnAccount">
        <span class="checkbox-with-img"><img src="/img/icons/file.svg" alt="">По счету</span>
      </FormCheckbox>

      <div class="delivery-captcha">
        <p>Подтвердите, что вы не робот *</p>
        <recaptcha />
      </div>

      <div class="privacy-policy-checkbox">
        <FormCheckbox
          :withLabel="false"
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
          :disabled="canOrder"
          @click="submitOrder">Заказать</button>
      </div>

    </div>

  </div>

</template>

<script>

import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('delivery/getDeliveryData')
    this.city = this.cities[0]
    this.date = this.dates[0]
    this.time = this.times[0]
  },
  name: 'BasketOrdering',
  props: {
    loading: Boolean
  },
  validations: {
    name: { required },
    surname: { required },
    email: { required, email },
    phone: { required, minLength: minLength(18) }
  },
  computed: {
    ...mapState({
      cities: state => state.delivery.cities,
      dates: state => state.delivery.dates,
      times: state => state.delivery.times
    }),
    canOrder () {
      let can = true
      if (!this.privacyPolicy) {
        can = false
      }
      return !can
    }
  },
  data: () => ({
    name: '',
    surname: '',
    email: '',
    phone: '',
    callMeBack: false,
    deliveryType: 'free',
    city: '',
    street: '',
    housing: '',
    home: '',
    apartment: '',
    date: '',
    time: '',
    message: '',
    paymentOnAccount: false,
    paymentOnline: false,
    privacyPolicy: false
  }),
  methods: {
    submitOrder () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
