<template>

  <footer
    class="footer"
    :class="{'footer--light': light}">

    <div class="container">

      <div class="footer-row row">

        <div class="footer-col col-6">
          <div class="footer-contacts">

            <div class="h3">Мы всегда рады помочь</div>
            <p v-html="global.footer.contacts"/>

            <div class="subscribe-form-title">Подписаться на рассылку:</div>
            <form class="subscribes-form">
              <input
                type="text"
                class="subscribes-form-input"
                placeholder="Подписаться на обновления">
              <button type="submit" class="btn">Ок</button>
            </form>

          </div>
        </div>

        <div class="footer-col col-1">
          <nav class="footer-nav">
            <nuxt-link
              v-for="link in global.footer.firstMenu"
              :key="link.id"
              :to="link.url">
              {{ link.title }}
            </nuxt-link>
          </nav>
        </div>

        <div class="footer-col col-2">
          <nav class="footer-nav">
            <nuxt-link
              v-for="link in global.footer.secondMenu"
              :key="link.id"
              :to="link.url">
              {{ link.title }}
            </nuxt-link>
          </nav>
        </div>

        <div class="footer-mob-logo">
          <nuxt-link to="/">
            <img
              :src="global.logoIllustrationSrc"
              alt="">
          </nuxt-link>
        </div>

        <div class="footer-col col-3">
          <nav class="footer-nav soc-nav">
            <nuxt-link
              v-for="link in global.socList"
              :key="link.id"
              :to="link.url">
              {{ link.title }}
            </nuxt-link>
            <span>Ищите нас по хештегу #lamobile</span>
          </nav>
        </div>

      </div>

      <div class="footer-bottom">

        <div class="footer-bottom-left">

          <div class="footer-copyright">{{ global.footer.copyright }}</div>

          <div class="footer-dev">Дизайн — SUPREMATIKA</div>

        </div>

        <div class="footer-bottom-right">

          <div class="footer-pay">
            <img :src="`/img/pay/mastercard${light ? '-light': ''}.svg`" alt="">
            <img :src="`/img/pay/visa${light ? '-light': ''}.svg`" alt="">
            <img :src="`/img/pay/paypal${light ? '-light': ''}.svg`" alt="">
            <img :src="`/img/pay/mir${light ? '-light': ''}.svg`" alt="">
          </div>

          <div class="footer-logo">
            <nuxt-link to="/">
              <img
                :src="`/img/logo-illustration${light ? '-light': ''}.svg`"
                alt="">
            </nuxt-link>
          </div>

        </div>

      </div>

    </div>

  </footer>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'LayoutsFooter',
  props: {
    light: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      global: state => state.global
    })
  }
}
</script>

<style scoped>

</style>
