<template>
  <form
    class="find-about-admission-form"
    @submit.prevent="sendAdmissionForm">

    <div class="form-descr">Оставьте свой e-mail, или номер телефона и имя, <br>а мы оповестим вас, когда товар
      появится в наличии
    </div>

    <div class="form-row">

      <FormInput
        name="login"
        placeholder="Имя"
        :invalid="$v.userData.name.$error ? !$v.userData.name.required : false"
        v-model="userData.name"/>

      <FormInput
        name="login"
        placeholder="Email"
        :invalid="$v.userData.email.$error ? (!$v.userData.email.required || !$v.userData.email.email) : false"
        v-model="userData.email"/>

    </div>

    <FormCheckbox
      v-model="userData.privacyPolicy"
      classes="square"
    >
      Я согласен с <a href="#">политикой обработки персональных данных</a>
    </FormCheckbox>

    <div class="form-submit">
      <button
        type="submit"
        class="btn"
        :disabled="!userData.privacyPolicy">Узнать о поступлении</button>
    </div>

  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'FormAdmission',
  validations: {
    userData: {
      name: { required },
      email: { required, email }
    }
  },
  data: () => ({
    userData: {
      name: '',
      email: '',
      privacyPolicy: true
    }
  }),
  methods: {
    sendAdmissionForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
