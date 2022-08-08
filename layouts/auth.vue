<template>

  <div class="wrapper wrapper--auth">

    <div class="auth-layout">

      <header class="auth-layout-header">
        <div class="container">

          <div class="back-to-main-link">
            <nuxt-link to="/" />
          </div>

          <div class="header-logo">
            <nuxt-link to="/" class="logo">
              <img :src="logo" alt="">
            </nuxt-link>
          </div>

        </div>
      </header>

      <Nuxt/>

    </div>

    <PopupError/>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'auth',
  computed: {
    ...mapState({
      logo: state => state.global.logoSrc
    })
  }
}
</script>

<style scoped>

</style>
