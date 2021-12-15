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
        :invalid="$v.user.email.$error ? (!$v.user.email.required || !$v.user.email.email) : false"
        v-model="user.email"/>

      <FormInput
        label="Телефон"
        placeholder="Телефон"
        :invalid="$v.user.phone.$error ? !$v.user.phone.required : false"
        mask="+7 (###) ###-##-##"
        v-model="user.phone"/>

      <FormCheckbox
        :label="' '"
        v-model="user.individual">Я юридическое лицо</FormCheckbox>

      <FormInput
        label="Название компании"
        :invalid="$v.name.$error ? !$v.name.required : false"
        v-model="name"/>

      <FormInput
        label="ИНН"
        :invalid="$v.inn.$error ? !$v.inn.required : false"
        mask="############"
        v-model="inn"/>

      <FormInput
        label="Адрес компании"
        :invalid="$v.address.$error ? !$v.address.required : false"
        v-model="address"/>

      <FormInput
        label="Дополнительный телефон"
        :invalid="$v.additionalPhone.$error ? !$v.additionalPhone.required : false"
        mask="+7 (###) ###-##-##"
        v-model="additionalPhone"/>

      <FormInput
        label="Сайт"
        :invalid="$v.site.$error ? !$v.site.required : false"
        v-model="site"/>

      <FormUpload
        label="Логотип"
        :value="logo"
        @change="logo = $event"
      />

      <div class="h5">Контактное лицо для связи</div>

      <div class="registrations-contact-persons">

        <div
          v-for="(contact, index) in contactPersons"
          :key="index"
          class="registrations-contact-person">
          <FormInput
            label="Имя"
            :invalid="$v.contactPersons.$each[index].name.$error ? !$v.contactPersons.$each[index].required : false"
            v-model="contact.name"/>

          <FormInput
            label="Фамилия"
            :invalid="$v.contactPersons.$each[index].surname.$error ? !$v.contactPersons.$each[index].surname.required : false"
            v-model="contact.surname"/>

          <FormInput
            label="Почта"
            :invalid="$v.contactPersons.$each[index].email.$error ? (!$v.contactPersons.$each[index].email.required || !$v.contactPersons.$each[index].email.email) : false"
            v-model="contact.email"/>

          <FormInput
            label="Телефон"
            :invalid="$v.contactPersons.$each[index].phone.$error ? !$v.contactPersons.$each[index].phone.required : false"
            mask="+7 (###) ###-##-##"
            v-model="contact.phone"/>

          <div
            v-if="contactPersons.length > 1"
            class="delete-contact-person">
            <a
              href="#"
              @click.prevent="removeContactPerson(index)">Удалить контактное лицо</a>
          </div>

        </div>

      </div>

      <div class="add-more">
        <a
          href="#"
          @click.prevent="addContactPerson">
          <span class="icon-plus-light"></span> Добавить контакт
        </a>
      </div>

      <div class="form-submit">
        <button
          class="btn btn-border"
          @click="submit">Зарегистрироваться</button>
      </div>

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
    contactPersons: {
      $each: {
        name: { required },
        surname: { required },
        email: { required, email },
        phone: { required }
      }
    }
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
  }),
  methods: {
    saveData () {
      this.$store.commit('auth/setRegStep3', {
        user: this.user,
        name: this.name,
        inn: this.inn,
        address: this.address,
        additionalPhone: this.additionalPhone,
        site: this.site,
        logo: this.logo,
        contactPersons: this.contactPersons
      })
    },
    addContactPerson () {
      this.contactPersons.push({
        name: '',
        surname: '',
        email: '',
        phone: ''
      })
    },
    removeContactPerson (index) {
      this.contactPersons.splice(index, 1)
    },
    submit () {
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
