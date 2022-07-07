<template>
  <form
    class="find-about-admission-form"
    @submit.prevent="sendAdmissionForm">

    <div class="form-descr">Оставьте свой e-mail, или номер телефона и имя, <br>а мы оповестим вас, когда товар
      появится в наличии
    </div>

    <FormSuccess
      :opened="success"
      text="мы оповестим вас, когда товар появится в наличии"
    />

    <div class="form-row">

      <FormInput
        name="login"
        placeholder="Имя"
        :invalid="$v.$error ? !$v.name.required : false"
        v-model="name"/>

      <FormInput
        name="login"
        placeholder="Email"
        :invalid="$v.$error ? (!$v.email.required || !$v.email.email) : false"
        v-model="email"/>

    </div>

    <FormCheckbox
      v-model="privacyPolicy"
      classes="square"
    >
      Я согласен с <a href="#">политикой обработки персональных данных</a>
    </FormCheckbox>

    <div class="form-submit">
      <button
        type="submit"
        class="btn"
        :disabled="!privacyPolicy">Узнать о поступлении</button>
    </div>

  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'FormAdmission',
  validations: {
    name: { required },
    email: { required, email }
  },
  props: {
    productId: Number
  },
  data: () => ({
    name: '',
    email: '',
    privacyPolicy: true,
    success: false
  }),
  methods: {
    sendAdmissionForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      this.$store.dispatch('product/productAdmission', {
        id: this.productId,
        name: this.name,
        email: this.email
      }).then(() => {
        this.success = true
        setTimeout(() => {
          this.name = ''
          this.email = ''
          this.success = false
          this.$v.$reset()
        }, 3000)
      })
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
