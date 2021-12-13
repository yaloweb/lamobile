<template>

  <div class="auth-page">

    <div class="container">

      <div class="auth-block">

        <div class="back-to-main-link">
          <nuxt-link to="/"></nuxt-link>
        </div>

        <form
          class="auth-form"
          @submit.prevent="event">

          <div class="form-title">Вход</div>

          <FormInput
            label="Почта"
            name="login"
            placeholder="Введите почту"
            classes="vertical"
            :invalid="$v.email.$error ? (!$v.email.required || !$v.email.email) : false"
            v-model="email"/>

          <FormInput
            type="password"
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
            classes="vertical"
            :invalid="$v.password.$error ? !$v.password.required : false"
            v-model="password"/>

          <div class="form-submit">
            <button type="submit" class="btn btn-border btn-block">Войти</button>
          </div>

          <div class="form-footer-link">
            <nuxt-link to="/forgot-password">Забыли пароль?</nuxt-link>
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

import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  layout: 'auth',
  validations: {
    email: { required, email },
    password: { required }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.auth.login.email
      },
      set (value) {
        this.$store.commit('auth/setLoginData', {
          field: 'email',
          value
        })
      }
    },
    password: {
      get () {
        return this.$store.state.auth.login.password
      },
      set (value) {
        this.$store.commit('auth/setLoginData', {
          field: 'password',
          value
        })
      }
    }
  },
  methods: {
    event () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
