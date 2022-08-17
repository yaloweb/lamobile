<template>
  <div class="error-component">
    <div class="container">
      <div class="error">

        <h1>Страница не найдена</h1>

        <img
          src="/img/logo-lion.svg"
          alt="">

        <nav class="error-nav">
          <div class="h4">Вот несколько ссылок,<br>которые могут вас заинтересовать</div>
          <ul>
            <li>
              <nuxt-link to="/catalog">Каталог</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/magazine">Журнал</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">О нас</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/for-users">Контакты</nuxt-link>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error-layout'
}
</script>

<style scoped>

</style>
