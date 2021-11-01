<template>

  <div class="auth-page">

    <div class="container">

      <div class="auth-block">
        <form
          class="auth-form"
          @submit.prevent>

          <div class="form-title">Регистрация</div>

          <FormInput
            label="Логин/почта"
            name="login"
            placeholder="Введите логин или почту"
            classes="vertical"
            v-model="login"/>

          <FormInput
            type="password"
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
            classes="vertical"
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
export default {
  name: 'Registration',
  layout: 'auth',
  data: () => ({
    login: '',
    password: ''
  })
}
</script>

<style scoped>

</style>
