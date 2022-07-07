<template>
  <form
    class="callback-form"
    @submit.prevent="sendCallbackData">

    <div class="form-title">Перезвонить мне</div>

    <p>Пн–сб с 10:00 – 19:00. Вс: выходной</p>

    <FormInput
      v-model="name"
      placeholder="Ваше имя"
      :invalid="$v.name.$error"/>

    <FormInput
      v-model="phone"
      :mask="'+7 (###) ###-##-##'"
      placeholder="+ 7(___) ___-__-__"
      :invalid="$v.phone.$error"/>

    <FormCheckbox
      v-model="privacyPolicy"
      classes="square"
    >
      Я согласен с <a href="#">политикой обработки персональных данных</a>
    </FormCheckbox>

    <div class="form-submit">
      <button
        type="submit"
        class="btn btn-block btn-lg"
        :class="{'loading': loading}"
        :disabled="loading || !privacyPolicy">Отправить заявку</button>
    </div>

    <div class="form-footer-link">
      <router-link to="/for-users">Контакты</router-link>
    </div>

    <FormSuccess
      :opened="success"
      text="мы оповестим вас, когда товар появится в наличии"
    />

  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'FormCallback',
  validations: {
    name: { required },
    phone: { required }
  },
  data: () => ({
    name: '',
    phone: '',
    privacyPolicy: false,
    success: false,
    loading: false
  }),
  methods: {
    async sendCallbackData () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      if (!this.loading) {
        let data = {
          name: this.name,
          phone: this.phone
        }
        try {
          this.loading = true
          await this.$store.dispatch('callback/sendCallbackData', data)
          this.success = true
          setTimeout(() => {
            this.success = false
            this.name = ''
            this.phone = ''
          }, 3000)
          this.loading = false
        } catch (e) {
          alert('Ошибка!')
        }
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
