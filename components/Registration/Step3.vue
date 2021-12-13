<template>
  <div class="registration-step">
    <div class="registration-step-3">

      <div class="form-title">Осталось немного!</div>

      <div class="form-descr">Заполните данные о своей компании, <br>и наш менеджер свяжется с вами для дальнейших шагов
      </div>

      <FormInput
        label="Имя"
        placeholder="Имя"
        :invalid="$v.user.name.$error ? !$v.user.name.required : false"
        v-model="user.name"/>

      <FormInput
        label="Фамилия"
        placeholder="Фамилия"
        :invalid="$v.user.surname.$error ? !$v.user.surname.required : false"
        v-model="user.surname"/>

      <FormInput
        label="Почта"
        placeholder="Почта"
        :invalid="$v.user.email.$error ? !$v.user.email.required : false"
        v-model="user.email"/>

      <FormInput
        label="Телефон"
        placeholder="Телефон"
        :invalid="$v.user.phone.$error ? !$v.user.phone.required : false"
        mask="+7 (###) ###-##-##"
        v-model="user.phone"/>

    </div>
  </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'RegistrationStep3',
  validations: {
    user: {
      name: { required },
      surname: { required },
      email: { required, email },
      phone: { required }
    },
    name: { required },
    inn: { required },
    address: { required },
    additionalPhone: { required },
    site: { required },
    logo: { required },
    contactPersons: [
      {
        name: { required },
        surname: { required },
        email: { required, email },
        phone: { required }
      }
    ]
  },
  data: () => ({
    user: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      individual: true
    },
    name: '',
    inn: '',
    address: '',
    additionalPhone: '',
    site: '',
    logo: '',
    contactPersons: [
      {
        name: '',
        surname: '',
        email: '',
        phone: ''
      }
    ]
  })
}
</script>

<style scoped>

</style>
