<template>
  <div
    class="form-success"
    :class="{'visible': opened}">
    <div class="form-success-content">

      <img src="/img/logo-lion.svg" alt="">

      <div class="h5">Успешно!</div>

      <p>{{ text }}</p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: {
    opened: Boolean,
    text: {
      type: String,
      default: 'Мы свяжемся с Вами в ближайшее время.'
    }
  }
}
</script>
