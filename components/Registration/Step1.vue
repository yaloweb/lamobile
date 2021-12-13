<template>
  <div class="registration-step">

    <div class="auth-form">

      <div class="form-title">Регистрация</div>

      <FormInput
        label="Почта"
        name="email"
        placeholder="Введите почту"
        classes="vertical"
        :invalid="$v.email.$error ? (!$v.email.required || !$v.email.email) : false"
        v-model="email"/>

      <FormInput
        type="password"
        label="Придумайте пароль"
        name="password"
        placeholder="Введите пароль"
        classes="vertical"
        :invalid="$v.password.$error ? !$v.password.required : false"
        v-model="password"/>

      <FormInput
        type="password"
        label="Придумайте пароль"
        name="password"
        placeholder="Введите пароль"
        classes="vertical"
        :invalid="$v.repeatPassword.$error ? !$v.repeatPassword.required : false"
        v-model="repeatPassword"/>

      <p
        v-if="danger"
        class="danger-text">{{ dangerText }}</p>

      <div class="form-submit">
        <button
          type="submit"
          class="btn btn-border btn-block"
          @click="next">Зарегистрироваться</button>
      </div>

      <div class="form-footer-link">
        <nuxt-link to="/forgot-password">Забыли пароль?</nuxt-link>
      </div>

    </div>

  </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'RegistrationStep1',
  validations: {
    email: { required, email },
    password: { required },
    repeatPassword: { required }
  },
  data: () => ({
    email: '',
    password: '',
    repeatPassword: '',
    danger: false,
    dangerText: ''
  }),
  methods: {
    saveData () {
      this.$store.commit('auth/setRegStep1', {
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      })
    },
    next () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      if (this.password !== this.repeatPassword) {
        this.dangerText = 'Пароли не совпадают'
        this.danger = true
        return false
      }
      this.saveData()
      this.$emit('next')
    }
  },
  mounted () {
    this.email = this.$store.state.auth.registration.email
    this.password = this.$store.state.auth.registration.password
    this.repeatPassword = this.$store.state.auth.registration.repeatPassword
  }
}
</script>

<style scoped>

</style>
