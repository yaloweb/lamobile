<template>

  <div class="page-footer">

    <footer
      class="footer"
      :class="{'footer--light': light}">

      <div class="container">

        <div class="footer-row row">

          <div class="footer-col col-5">
            <div class="footer-contacts">

              <div class="h3">Мы всегда рады помочь</div>
              <p v-html="global.footer.contacts"/>

            </div>
          </div>

          <div class="footer-col col-3">
            <nav class="footer-nav footer-nav-menu">
              <ul v-if="global.footer.firstMenu && global.footer.firstMenu.length">
                <li
                  v-for="link in global.footer.firstMenu"
                  :key="link.id">
                  <nuxt-link
                    :to="link.url">
                    {{ link.title }}
                  </nuxt-link>
                </li>
              </ul>
              <ul v-if="global.footer.secondMenu && global.footer.secondMenu.length">
                <li
                  v-for="link in global.footer.secondMenu"
                  :key="link.id">
                  <nuxt-link
                    :to="link.url">
                    {{ link.title }}
                  </nuxt-link>
                </li>
              </ul>
            </nav>
          </div>

          <div class="footer-col col-2">
            <div class="footer-nav-marketplaces">

              <nav class="footer-nav">
                <div class="h6">Мы на маркетплейсах</div>
                <a
                  v-for="(marketplace, idx) in marketplaces"
                  :key="idx"
                  :href="marketplace.url"
                  target="_blank">
                  {{ marketplace.title }}
                </a>
              </nav>

              <div class="footer-nav-marketplaces-logo">
                <nuxt-link to="/">
<!--                  <img-->
<!--                    :src="`/img/logo-illustration${light ? '-light': ''}.svg`"-->
<!--                    alt="">-->
                  <img src="/img/logo-footer.gif" alt="">
                </nuxt-link>
              </div>

            </div>
          </div>

          <div class="footer-col col-2">
            <nav class="footer-nav soc-nav">
              <div class="h6">Ищите нас по хештегу #lamobile</div>
              <div class="soc-list">
                <a
                  v-for="soc in global.socList"
                  :key="soc.id"
                  :href="soc.url"
                  target="_blank">
                  <img
                    :src="`/img/icons/footer-soc/${soc.title}.svg`"
                    alt="">
                </a>
              </div>
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
<!--                <img-->
<!--                  :src="`/img/logo-illustration${light ? '-light': ''}.svg`"-->
<!--                  alt="">-->
                <img src="/img/logo-footer.gif" alt="">
              </nuxt-link>
            </div>

          </div>

        </div>

      </div>

      <div
        class="up-btn"
        :class="{'visible': scrollUpVisible}"
        @click="scrollUp"
      />

    </footer>

    <PopupCallback/>

  </div>

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
  },
  data: () => ({
    scrollUpVisible: false,
    marketplaces: [
      {
        title: 'Яндекс.Маркет',
        url: 'https://market.yandex.ru/shop--lamobile/411462'
      },
      {
        title: 'Ozon',
        url: 'https://www.ozon.ru/seller/lamobile-9034/?miniapp=seller_9034'
      },
      {
        title: 'СберМаркет',
        url: 'https://sbermegamarket.ru/shop/lamobile-store/'
      },
      {
        title: 'Aliexpress',
        url: 'https://lamobile.aliexpress.ru/store/910365125'
      }
    ]
  }),
  methods: {
    scrollUp () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    const scrollEvent = () => {
      const scrollTop = window.pageYOffset
      this.scrollUpVisible = scrollTop > window.innerHeight
    }
    scrollEvent()
    window.addEventListener('scroll', scrollEvent)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('scroll', scrollEvent))
  }
}
</script>

<style scoped>

</style>
