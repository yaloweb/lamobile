<template>

  <div class="account-page">

    <UIBreadcrumbs/>

    <div class="container">

      <div class="page-title">
        <h1>Личный кабинет</h1>
      </div>

      <div class="account-block">

        <form
          class="account-form"
          @submit.prevent>

          <div class="account-form-left">

            <div class="account-form-data">

              <div class="form-title">Ваши данные</div>

              <FormInput
                label="Логин/почта"
                v-model="login"
                placeholder="Введите логин или почту"/>

              <FormInput
                label="Телефон"
                v-model="phone"
                placeholder="Введите Телефон"
                :mask="'+7 (###) ### ## ##'"/>

              <FormCheckbox
                label="Тип организации"
                v-model="companyType">Юридическое лицо
              </FormCheckbox>

              <div class="form-submit">
                <button
                  type="submit"
                  class="btn btn-border btn-block">Сохранить
                </button>
              </div>

            </div>

          </div>

          <div class="account-form-right">

            <div class="form-title">Изменить пароль</div>

            <FormInput
              type="password"
              label="Текущий пароль"
              v-model="currentPassword"/>

            <FormInput
              type="password"
              label="Новый пароль"
              v-model="newPassword"/>

            <FormInput
              type="password"
              label="Повторите пароль"
              v-model="repeatPassword"/>

            <div class="form-submit">
              <button
                type="submit"
                class="btn btn-border btn-block">Сохранить
              </button>
            </div>

          </div>

        </form>

      </div>

    </div>

  </div>

</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'user',
  mixins: [breadcrumbs],
  data: () => ({
    login: '',
    phone: '',
    companyType: false,
    description: '',
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
    breadcrumbs: [
      {
        title: 'Личный кабинет'
      }
    ]
  })
}
</script>

<style scoped>

</style>
