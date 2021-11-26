<template>

  <div class="auth-page">

    <div class="container">

      <div class="auth-block">

        <div class="back-to-main-link">
          <nuxt-link to="/"></nuxt-link>
        </div>

        <form
          class="auth-form"
          @submit.prevent="submit">

          <div class="form-title">Восстановление пароля</div>

          <div class="radio-group">
            <label class="form-label">Прислать проверочный код на</label>
            <FormRadio
              name="verification"
              label="phone"
              value="phone"
              v-model="verification">Телефон</FormRadio>
            <FormRadio
              name="verification"
              label="email"
              value="email"
              v-model="verification">Почта</FormRadio>
          </div>

          <div class="form-descr">
            <p>Введите в поле адрес электронной почты.<br> Мы отправим вам сообщение по электронной почте с инструкциями по созданию нового пароля.</p>
          </div>

          <FormInput
            v-if="verification === 'phone'"
            name="login"
            placeholder="+ 7 ___ ___ __ __"
            classes="vertical"
            :invalid="$v.phone.$error ? (!$v.phone.required || $v.phone.minLength) : false"
            :mask="'+ 7 ### ### ## ##'"
            v-model="phone"/>

          <FormInput
            v-if="verification === 'email'"
            name="login"
            placeholder="mail@mail.ru"
            classes="vertical"
            :invalid="$v.email.$error ? (!$v.email.required || $v.email.required) : false"
            v-model="email"/>

          <div class="form-submit">
            <button
              type="submit"
              class="btn btn-border btn-block">Получить проверочный код</button>
          </div>

          <div class="form-footer-link">
            <nuxt-link to="/login">Войти</nuxt-link>
          </div>

          <div class="form-footer-link">
            <nuxt-link to="/registration">Регистрация</nuxt-link>
          </div>

        </form>
      </div>

    </div>

  </div>

</template>

<script>

import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPassword',
  layout: 'auth',
  validations: {
    email: { required, email },
    phone: { required, minLength: minLength(17) }
  },
  data: () => ({
    email: '',
    phone: '',
    password: '',
    verification: 'phone'
  }),
  methods: {
    submit () {
      if (this.verification === 'phone') {
        if (this.$v.phone.$invalid) {
          this.$v.phone.$touch()
          return false
        }
      }
      if (this.verification === 'email') {
        if (this.$v.email.$invalid) {
          this.$v.email.$touch()
          return false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
