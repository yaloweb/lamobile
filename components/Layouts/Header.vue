<template>

  <div class="header-component">

    <header
      class="header"
      :class="{
        'header-absolute': positionAbsolute,
        'light': isLight,
        'fixed': fixed,
        'visible': visible
      }">
      <div class="container">

        <div class="header-row">

          <div
            class="header-catalog"
            ref="headerCatalog"
            :class="{'active': catalog}">

            <div class="header-catalog-block">

              <button
                class="header-catalog-btn"
                :class="{'active': catalog && activeTab === 1}"
                @click="toggleCatalog"><span></span>Каталог
              </button>

              <div
                class="header-search"
                :class="{'active': catalog && activeTab === 2}">
                <input
                  type="text"
                  class="search-input"
                  placeholder="Поиск"
                  v-model="search">
                <span class="icon-search"/>
                <span
                  class="icon-close"
                  @click="closeSearch"/>
              </div>

            </div>

          </div>

          <div
            v-show="logo"
            class="header-logo">
            <nuxt-link to="/" class="logo">
              <img
                src="/img/logo-light.svg"
                class="light-logo"
                alt="">
              <img
                src="/img/logo.svg"
                alt="">
            </nuxt-link>
          </div>

          <div class="header-account">

            <div class="header-account-btns">
              <div
                class="header-account-link">
                <a
                  href="#"
                  class="header-account-btn"
                  @click.prevent="openCallbackPopup">
                  <span class="icon-phone"></span>
                </a>
              </div>
              <div
                class="header-account-link">
                <nuxt-link
                  to="/for-users"
                  class="header-account-btn">
                  <span class="icon-exclamation"></span>
                </nuxt-link>
              </div>
              <div
                class="header-account-link"
                :class="{'opened': accountDropdown}">
                <a
                  href="#"
                  class="header-account-btn"
                  @click="accountDropdown = true">
                  <span class="icon-user"></span>
                </a>
                <div class="header-acc-dropdown">
                  <a href="https://lamobile-opt.bikdev.ru/" class="opt-site-link"><span class="icon-arrow-right-circle" /> Вход для оптовых клиентов</a>
                </div>
              </div>
              <nuxt-link
                to="/account/basket"
                class="header-account-btn header-account-basket"
                :class="{'active': user.basket > 0}">
                <span class="icon-bag"></span>
                <span
                  v-if="basketProducts.length > 0"
                  class="basket-quantity">{{ basketProducts.length }}</span>
              </nuxt-link>
            </div>

          </div>

        </div>

      </div>
    </header>

    <div
      class="catalog-dropdown"
      :class="{'opened': catalog}"
      v-loading="searchLoading">

      <div class="catalog-dropdown-content">

        <transition name="tabs">

          <div
            v-show="activeTab === 1"
            class="catalog-dropdown-content-tab">

            <div class="catalog-dropdown-tabs-nav">
              <span
                :class="{'active': activeCatalogTab === 1}"
                @click="activeCatalogTab = 1">Товары</span>
              <span
                :class="{'active': activeCatalogTab === 2}"
                @click="activeCatalogTab = 2">Бренды</span>
            </div>

            <div class="catalog-dropdown-tabs">

              <transition name="tabs">
                <div
                  v-show="activeCatalogTab === 1"
                  class="catalog-dropdown-tab">

                  <div
                    v-if="categories"
                    class="catalog-dropdown-products">
                    <ul>
                      <li
                        v-for="link in categories"
                        :key="link.id"
                        @click="closeCatalog"
                      >
                        <nuxt-link :to="link.url">
                          {{ link.title }}
                        </nuxt-link>
                      </li>
                    </ul>
                    <div
                      class="catalog-dropdown-all"
                      @click="closeCatalog">
                      <nuxt-link
                        :to="categories[0] ? categories[0].url : '#'"
                        class="btn">Все товары
                      </nuxt-link>
                    </div>
                  </div>

                </div>
              </transition>

              <transition name="tabs">
                <div
                  v-show="activeCatalogTab === 2"
                  class="catalog-dropdown-tab">

                  <div class="brands">

                    <div
                      class="brands-list">
                      <div
                        v-for="brand in brands"
                        :key="brand.id"
                        class="brands-item"
                        @click="closeCatalog">
                        <nuxt-link
                          :to="brand.url">
                          <img
                            v-if="brand.imgSrc"
                            :src="brand.imgSrc"
                            alt="">
                          <span v-else>
                            {{ brand.title }}
                          </span>
                        </nuxt-link>
                      </div>
                    </div>

                    <nuxt-link
                      to="/catalog/roboty-pylesosy"
                      class="btn">Все бренды
                    </nuxt-link>

                  </div>

                </div>
              </transition>

            </div>

            <div class="dropdown-footer">
              <ul>
                <li
                  v-for="link in global.header.dropdownFooterMenu"
                  :key="link.id"
                  @click="closeCatalog">
                  <nuxt-link :to="link.url">
                    {{ link.title }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

          </div>

        </transition>

        <transition name="tabs">

          <div
            v-show="activeTab === 2"
            class="catalog-dropdown-content-tab">

            <div
              v-if="searchResults.accessories.length || searchResults.categories.length || searchResults.products.length"
              class="search-results-main">

              <div
                v-if="searchResults.products.length"
                class="search-catalog">

                <div
                  v-for="link in searchResults.products"
                  :key="link.id"
                  class="search-catalog-item"
                  @click="closeCatalog">
                  <nuxt-link :to="link.url">
                    <img
                      :src="link.imgSrc"
                      alt="">
                    <span v-html="link.title" />
                  </nuxt-link>
                </div>
              </div>

              <div
                v-if="searchResults.categories.length"
                class="search-categories">
                <div
                  v-for="link in searchResults.categories"
                  :key="link.id"
                  class="search-catalog-item"
                  @click="closeCatalog">
                  <nuxt-link
                    :to="link.url"
                    v-html="link.title" />
                </div>
              </div>

              <div
                v-if="searchResults.accessories.length"
                class="search-details">

                <div
                  v-for="link in searchResults.accessories"
                  :key="link.id"
                  class="search-details-item"
                  @click="closeCatalog">
                  <nuxt-link :to="link.url">
                    <img
                      :src="link.imgSrc"
                      alt="">
                    <span v-html="link.title" />
                  </nuxt-link>
                </div>

              </div>

            </div>

            <div
              v-else
              class="search-results-empty">
              Нет результатов
            </div>

          </div>

        </transition>

      </div>
    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import { debounce } from '@/helpers/debounce'

export default {
  name: 'LayoutsHeader',
  props: {
    logo: {
      type: Boolean,
      default: true
    },
    positionAbsolute: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      global: state => state.global,
      user: state => state.user,
      searchResults: state => state.search.results,
      categories: state => state.catalog.categories,
      brands: state => state.brands.brands,
      basketProducts: state => state.basket.products
    }),
    isLight () {
      return this.isMob ? (this.catalog ? false : this.light) : this.light
    }
  },
  watch: {
    search: debounce(function (newVal) {
      this.$store.dispatch('search/getSearchResults', newVal).then(() => {
        if (this.searchLoading) {
          this.searchLoading = false
        }
        if (newVal.length > 1) {
          this.openSearch()
        }
      })
      this.searchLoading = true
    }, 200)
  },
  data: () => ({
    activeTab: 1,
    activeCatalogTab: 1,
    catalog: false,
    search: '',
    searchLoading: false,
    searchLoadingPromise: '',
    pageScroll: 0,
    fixed: false,
    visible: false,
    accountDropdown: false,
    isMob: false
  }),
  methods: {
    toggleCatalog () {
      if (this.catalog && this.activeTab === 2) {
        this.activeTab = 1
      } else if (!this.catalog && this.activeTab === 2) {
        this.catalog = true
        this.activeTab = 1
      } else {
        this.catalog = !this.catalog
      }
    },
    closeCatalog () {
      this.catalog = false
    },
    openSearch () {
      this.catalog = true
      this.activeTab = 2
    },
    closeSearch () {
      if (window.innerWidth < 992) {
        this.activeTab = 1
      } else {
        this.catalog = false
      }
      this.search = ''
    },
    pageScrollEvent () {
      if (window.innerWidth < 576) {
        const t = window.pageYOffset
        this.fixed = t > 0
        this.visible = this.pageScroll > t
        this.pageScroll = t
      }
    },
    checkMob () {
      this.isMob = window.innerWidth < 768
    },
    openCallbackPopup () {
      this.$store.commit('callback/openCallbackPopup')
    }
  },
  mounted () {
    const clickOutCatalog = e => {
      let tg = e.target
      if (!tg.closest('.header-catalog-block') && !tg.closest('.catalog-dropdown')) {
        this.closeCatalog()
        this.closeSearch()
      }
      if (!tg.closest('.header-account-link')) {
        this.accountDropdown = false
      }
    }

    this.pageScrollEvent()

    document.addEventListener('click', clickOutCatalog)
    window.addEventListener('scroll', this.pageScrollEvent)
    window.addEventListener('resize', this.checkMob)

    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener('click', clickOutCatalog)
      window.removeEventListener('scroll', this.pageScrollEvent)
      window.removeEventListener('resize', this.checkMob)
    })

    this.checkMob()
  }
}
</script>

<style scoped>
</style>
