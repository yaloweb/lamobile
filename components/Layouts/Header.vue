<template>

  <header
    class="header"
    :class="{'header-absolute': positionAbsolute}">
    <div class="container">

      <div class="header-row">

        <div
          class="header-catalog"
          ref="headerCatalog"
          :class="{'active': catalog || search}">

          <div class="header-catalog-block">

            <button
              class="header-catalog-btn"
              :class="{'active': catalog && this.activeTab === 1}"
              @click="toggleCatalog"><span></span>Каталог</button>

            <div class="header-search">
              <input
                type="text"
                class="search-input"
                @focus="openSearch">
              <span class="icon-search"></span>
              <span class="icon-close"></span>
            </div>

          </div>

          <div
            class="catalog-dropdown"
            :class="{'opened': catalog}">
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
                            <li><a href="#">Роботы-пылесосы</a></li>
                            <li><a href="#">Аксессуары для роботов-пылесосов</a></li>
                            <li><a href="#">Свет</a></li>
                            <li><a href="#">Климат</a></li>
                            <li><a href="#">Внешние аккумуляторы</a></li>
                            <li><a href="#">Аксессуары в авто</a></li>
                            <li><a href="#">Беговые дорожки</a></li>
                          </ul>
                          <a href="#" class="btn btn-sm btn-border">Все товары</a>
                        </div>

                      </div>
                    </transition>

                    <transition name="tabs">
                      <div
                        v-show="activeCatalogTab === 2"
                        class="catalog-dropdown-tab">

                        <div class="brands">

                          <div class="brands-list">
                            <div class="brands-item">
                              <img src="~/assets/img/brands/1.png" alt="">
                            </div>
                            <div class="brands-item">
                              <img src="~/assets/img/brands/2.png" alt="">
                            </div>
                            <div class="brands-item">
                              <img src="~/assets/img/brands/3.png" alt="">
                            </div>
                            <div class="brands-item">
                              <img src="~/assets/img/brands/4.jpg" alt="">
                            </div>
                          </div>

                          <a href="#" class="btn btn-sm btn-border">Все товары</a>

                        </div>

                      </div>
                    </transition>

                  </div>

                  <div class="dropdown-footer">
                    <ul>
                      <li><a href="#">Журнал</a></li>
                      <li><a href="#">О нас</a></li>
                      <li><a href="#">Гарантии</a></li>
                      <li><a href="#">Оплата и доставка</a></li>
                      <li><a href="#">Условия продажи</a></li>
                      <li><a href="#">Обмен и возврат</a></li>
                      <li><a href="#">Контакты</a></li>
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
                      <a href="#" class="search-catalog-item">
                        <img src="~/assets/img/brands/5.jpg" alt="">
                        <span>Пылесосы Mi</span>
                      </a>
                      <a href="#" class="search-catalog-item">
                        <img src="~/assets/img/brands/6.jpg" alt="">
                        <span>Пылесосы Roborock</span>
                      </a>
                    </div>

                    <div class="search-categories">
                      <a href="#" class="search-category-item">Роботы-пылесосы</a>
                      <a href="#" class="search-category-item">Вертикальные пылесосы</a>
                      <a href="#" class="search-category-item">Запчасти для пылесосов</a>
                    </div>

                    <div class="search-details">

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

                      <a href="#" class="search-details-item">
                        <img src="~/assets/img/products-thumb/1.png" alt="">
                        <span>Аккумуляторная батарея Roborock Handheld  Vacuum Cleaner для пылесоса H6</span>
                      </a>

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
          <a href="/" class="logo">
            <img src="~/assets/img/logo.svg" alt="">
          </a>
        </div>

        <div class="header-account">

          <div class="header-location">Москва <a href="tel:+7 495 003 2233">+7 495 003 2233</a></div>

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
      global: state => state.global.global
    })
  },
  data: () => ({
    activeTab: 1,
    activeCatalogTab: 1,
    catalog: false
  }),
  methods: {
    toggleCatalog () {
      if (this.catalog && this.activeTab === 2) {
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
      this.search = false
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
