<template>
  <div
    class="product-main-info"
    :class="{'visible-content': mobContentVisible}">

    <div
      class="product-main-info-container"
      :class="{'marketplace-opened': marketplacesCheck}">

      <div class="product-main-info-content">

        <div class="product-main-id"><span>ID товара: {{ productId }}</span></div>

        <div class="product-title">
          <h1 v-html="title"/>
        </div>

        <div class="product-colors">
          <div
            class="product-colors-block">
            <span
              v-for="color in colors"
              :key="color.id"
              :style="{backgroundColor: color.background}"
              :class="{'active': color.id === selectedColor}"
              @click="$emit('select-color', color.id)"/>
          </div>
        </div>

        <div
          v-if="inStock"
          class="product-buy">
          <button
            class="btn btn-border">Купить от {{ price | priceFilter }} ₽
          </button>
        </div>

        <form
          v-if="!inStock"
          class="find-about-admission-form"
          @submit.prevent="sendAdmissionForm">

          <div class="form-descr">Оставьте свой e-mail, или номер телефона и имя, <br>а мы оповестим вас, когда товар появится в наличии</div>

          <FormInput
            name="login"
            placeholder="Имя"
            :invalid="$v.userData.name.$error ? !$v.userData.name.required : false"
            v-model="userData.name"/>

          <FormInput
            name="login"
            placeholder="Email"
            :invalid="$v.userData.email.$error ? (!$v.userData.email.required || !$v.userData.email.email) : false"
            v-model="userData.email"/>

          <div class="form-submit">
            <button type="submit" class="btn btn-border">Узнать о поступлении ></button>
          </div>

        </form>

      </div>

      <div
        v-if="gifts ? gifts.length > 0 : false"
        class="product-gifts">

        <div class="product-gifts-left">
          <div class="h3">Подарок</div>
          <p v-html="giftsDescr"/>
        </div>

        <div class="product-gifts-right">
          <div class="gifst-list">
            <div
              v-for="gift in gifts"
              :key="gift.id"
              class="gift-item">
              <img
                :src="gift.imgSrc"
                alt="">
            </div>
          </div>
        </div>

      </div>

      <div
        v-if="shops"
        class="product-check-marketplaces">
        <a
          href="#"
          @click.prevent="marketplacesCheck = true">Или купить на другой площадке от 990 ₽ </a>
      </div>

      <transition name="fade">
        <div
          v-if="shops && marketplacesCheck"
          class="product-marketplaces">

          <div class="product-marketplaces-row">

            <div
              v-for="shop in shops"
              :key="shop.id"
              class="product-marketplace">

              <div class="product-marketplace-img">
                <img
                  :src="shop.img"
                  alt="">
              </div>

              <div class="product-marketplace-title">
                {{ shop.name }}
              </div>

              <div class="product-marketplace-price">Цена: {{ shop.price | priceFilter }} ₽</div>

              <div class="product-marketplace-link">
                <a :href="shop.link">Перейти на сайт</a>
              </div>

            </div>

          </div>

        </div>
      </transition>

    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ProductInfoMain',
  props: {
    selectedColor: Number
  },
  validations: {
    userData: {
      name: { required },
      email: { required, email }
    }
  },
  computed: {
    ...mapState({
      productId: state => state.product.productId,
      title: state => state.product.title,
      inStock: state => state.product.inStock,
      colors: state => state.product.colors,
      price: state => state.product.price,
      giftsDescr: state => state.product.giftsDescr,
      gifts: state => state.product.gifts,
      shops: state => state.product.shops
    })
  },
  data: () => ({
    mobContentVisible: false,
    marketplacesCheck: false,
    userData: {
      name: '',
      email: ''
    }
  }),
  methods: {
    sendAdmissionForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
    }
  },
  mounted () {
    const scroll = () => {
      const scrY = window.scrollY
      scrY > 30 ? this.mobContentVisible = true : this.mobContentVisible = false
    }
    window.addEventListener('scroll', scroll)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('scroll', scroll))
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
    -webkit-transform: translateY(10px);
    -moz-transform: translateY(10px);
    -ms-transform: translateY(10px);
    -o-transform: translateY(10px);
    transform: translateY(10px);
  }
</style>
