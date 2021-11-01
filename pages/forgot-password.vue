<template>

  <div class="auth-page">

    <div class="container">

      <div class="auth-block">
        <form
          class="auth-form"
          @submit.prevent>

          <div class="form-title">Восстановление пароля</div>

          <div class="form-descr">
            <p>Введите в поле адрес электронной почты.<br> Мы отправим вам сообщение по электронной почте с инструкциями по созданию нового пароля.</p>
          </div>

          <FormInput
            label="Логин/почта"
            name="login"
            placeholder="Введите логин или почту"
            classes="vertical"
            v-model="login"/>

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

          <div class="form-submit">
            <button type="submit" class="btn btn-border btn-block">Получить проверочный код</button>
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
export default {
  name: 'ForgotPassword',
  layout: 'auth',
  data: () => ({
    login: '',
    password: '',
    verification: 'phone'
  })
}
</script>

<style scoped>

</style>
