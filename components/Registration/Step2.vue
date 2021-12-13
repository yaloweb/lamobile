<template>
  <div class="registration-step">
    <div class="registration-step-2">

      <div class="form-title">Осталось немного!</div>

      <div class="form-descr">Заполните данные о своей компании, <br>и наш менеджер свяжется с вами для дальнейших шагов
      </div>

      <div class="registration-step-2-inputs">

        <div class="form-small-title">Контактное лицо</div>

        <FormInput
          name="email"
          placeholder="ФИО"
          :invalid="$v.name.$error ? !$v.name.required : false"
          classes="vertical"
          v-model="name"/>

        <FormInput
          name="phone"
          placeholder="Телефон"
          :invalid="$v.phone.$error ? !$v.phone.required : false"
          classes="vertical"
          :mask="'+7 (###) ###-##-##'"
          v-model="phone"/>

        <FormInput
          name="phone"
          placeholder="Email"
          :invalid="$v.email.$error ? (!$v.email.required || !$v.email.email) : false"
          classes="vertical"
          v-model="email"/>

        <FormCheckbox v-model="individual">Я юридическое лицо</FormCheckbox>

        <div class="form-submit">
          <button
            type="submit"
            class="btn btn-border btn-block"
            @click="next">Продолжить
          </button>
        </div>

        <div class="form-footer-link">
          <nuxt-link to="/login">У меня уже есть аккаунт</nuxt-link>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'
import FormCheckbox from '../Form/Checkbox'

export default {
  name: 'RegistrationStep2',
  components: { FormCheckbox },
  validations: {
    name: { required },
    phone: { required },
    email: {
      required,
      email
    }
  },
  data: () => ({
    name: '',
    phone: '',
    email: '',
    individual: true
  }),
  methods: {
    next () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      this.saveData()
      this.$emit('next')
    },
    saveData () {
      this.$store.commit('auth/setRegStep2', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        individual: this.individual
      })
    }
  },
  mounted () {
    this.name = this.$store.state.auth.registration.contactPerson.name
    this.phone = this.$store.state.auth.registration.contactPerson.phone
    this.email = this.$store.state.auth.registration.contactPerson.email
    this.individual = this.$store.state.auth.registration.contactPerson.individual
  }
}
</script>

<style scoped>

</style>
