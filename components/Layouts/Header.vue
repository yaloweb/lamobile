<template>

  <header
    class="header"
    :class="{'header-absolute': positionAbsolute}">
    <div class="container">

      <div class="header-row">

        <div
          class="header-catalog"
          ref="headerCatalog"
          :class="{'active': catalog}">

          <div class="header-catalog-block">

            <button
              class="header-catalog-btn"
              :class="{'active': catalog && this.activeTab === 1}"
              @click="toggleCatalog"><span></span>Каталог</button>

            <div
              class="header-search"
              :class="{'active': catalog && this.activeTab === 2}">
              <input
                type="text"
                class="search-input"
                v-model="search"
                @input="searchHandler">
              <span class="icon-search" />
              <span
                class="icon-close"
                @click="closeSearch"/>
            </div>

          </div>

          <div
            class="catalog-dropdown"
            :class="{'opened': catalog}"
            v-loading="searchLoading">

            <div class="catalog-dropdown-close">
              <span
                class="icon-close"
                @click="closeCatalog" />
            </div>

            <form class="mob-search-form">
              <div
                class="header-search"
                :class="{'active': catalog && this.activeTab === 2}">
                <input
                  type="text"
                  class="search-input"
                  v-model="search"
                  @input="searchHandler">
                <span class="icon-search" />
                <span
                  class="icon-close"
                  @click="closeSearch"/>
              </div>
            </form>

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

                        <div class="catalog-dropdown-products">
                          <ul>
                            <li
                              v-for="link in global.header.catalogMenu"
                              :key="link.id">
                              <nuxt-link :to="link.url">
                                {{ link.title }}
                              </nuxt-link>
                            </li>
                          </ul>
                          <nuxt-link
                            to="/catalog"
                            class="btn btn-sm btn-border">Все товары</nuxt-link>
                        </div>

                      </div>
                    </transition>

                    <transition name="tabs">
                      <div
                        v-show="activeCatalogTab === 2"
                        class="catalog-dropdown-tab">

                        <div class="brands">

                          <div class="brands-list">
                            <div
                              v-for="brand in global.header.brands"
                              :key="brand.id"
                              class="brands-item">
                              <img
                                :src="brand.imgSrc"
                                alt="">
                            </div>
                          </div>

                          <nuxt-link
                            to="/catalog"
                            class="btn btn-sm btn-border">Все товары</nuxt-link>

                        </div>

                      </div>
                    </transition>

                  </div>

                  <div class="dropdown-footer">
                    <ul>
                      <li
                        v-for="link in global.header.dropdownFooterMenu"
                        :key="link.id">
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

                  <div class="search-results-main">

                    <div class="search-catalog">

                      <nuxt-link
                        v-for="link in searchResults.products"
                        :key="link.id"
                        :to="link.url"
                        class="search-catalog-item">
                        <img
                          :src="link.imgSrc"
                          alt="">
                        <span>{{ link.title }}</span>
                      </nuxt-link>
                    </div>

                    <div class="search-categories">
                      <nuxt-link
                        v-for="link in searchResults.categories"
                        :key="link.id"
                        :to="link.url"
                        class="search-category-item">
                        {{ link.title }}
                      </nuxt-link>
                    </div>

                    <div class="search-details">

                      <nuxt-link
                        v-for="link in searchResults.accessories"
                        :key="link.id"
                        :to="link.url"
                        class="search-details-item">
                        <img
                          :src="link.imgSrc"
                          alt="">
                        <span>{{ link.title }}</span>
                      </nuxt-link>

                    </div>

                  </div>

                </div>

              </transition>

            </div>
          </div>

        </div>

        <div
          v-if="logo"
          class="header-logo">
          <nuxt-link to="/" class="logo">
            <img :src="global.logoSrc" alt="">
          </nuxt-link>
        </div>

        <div class="header-account">

          <div class="header-location">Москва <a :href="`tel:${global.phone}`">{{ global.phone }}</a></div>

          <div class="header-account-btns">
            <a href="#" class="header-account-btn">
              <span class="icon-user"></span>
            </a>
            <a href="#" class="header-account-btn">
              <span class="icon-bag"></span>
            </a>
          </div>

        </div>

      </div>

    </div>
  </header>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    logo: {
      type: Boolean,
      default: true
    },
    positionAbsolute: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      global: state => state.global,
      searchResults: state => state.search.results
    })
  },
  data: () => ({
    activeTab: 1,
    activeCatalogTab: 1,
    catalog: false,
    search: '',
    searchLoading: false,
    searchLoadingPromise: ''
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
    searchHandler () {
      if (this.search.length > 1) {
        this.$store.dispatch('search/getSearchResults').then(() => {
          this.openSearch()
          if (this.searchLoading) {
            this.searchLoading = false
          }
        })
        this.searchLoading = true
      }
    }
  },
  mounted () {
    const clickOutCatalog = e => {
      let tg = e.target
      if (!tg.closest('.header-catalog')) {
        this.closeCatalog()
        this.closeSearch()
      }
    }
    document.addEventListener('click', clickOutCatalog)
    this.$on('hook:beforeDestroy', () => document.removeEventListener('click', clickOutCatalog))
  }
}
</script>

<style scoped>
</style>
