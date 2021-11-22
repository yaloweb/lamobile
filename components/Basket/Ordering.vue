<template>

  <div
    class="ordering"
    v-loading="loading">

    <div class="ordering-title">
      <div class="h3">Оформление заказа</div>
    </div>

    <div class="ordering-form">

      <div class="h4">Получатель</div>

      <FormInput
        label="Имя *"
        name="name"
        placeholder="Ваше имя"
        v-model="name"/>

      <FormInput
        label="Фамилия *"
        name="surname"
        placeholder="Ваша фамилия"
        v-model="surname"/>

      <FormInput
        label="Почта *"
        name="email"
        placeholder="name@mail.ru"
        v-model="email"/>

      <FormInput
        label="Телефон *"
        name="phone"
        placeholder="+ 7(___) ___-__-__"
        v-model="phone"
        mask="+ 7(###) ###-##-##"/>

      <FormCheckbox
        label=""
        v-model="callMeBack">
        Перезвоните мне
      </FormCheckbox>

    </div>

    <div class="ordering-form">

      <div class="h4">Способ доставки</div>

      <div class="delivery-type">

        <FormRadio
          value="free"
          v-model="deliveryType">
          СДЭК
          <small>бесплатно, 23 июля</small>
        </FormRadio>

        <FormRadio
          value="courier"
          v-model="deliveryType">
          Курьером (по Москве)
          <small>бесплатно, послезавтра</small>
        </FormRadio>

        <FormRadio
          value="express"
          v-model="deliveryType">
          Экспресс доставка
          <small>от 500 ₽</small>
        </FormRadio>

      </div>

    </div>

    <div class="ordering-form">

      <div class="h4">Адрес доставки</div>

      <div class="form-group">
        <label class="form-label">Город</label>
        <div class="form-input">
          <v-select :options="['Москва', 'Санкт-Петербург']"/>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'BasketOrdering',
  props: {
    loading: Boolean
  },
  data: () => ({
    name: '',
    surname: '',
    email: '',
    phone: '',
    callMeBack: false,
    deliveryType: 'free'
  })
}
</script>

<style scoped>

</style>
