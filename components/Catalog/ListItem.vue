<template>
  <div
    class="catalog-list-item"
    :class="{'loading': loading}">

    <div class="catalog-list-item-content">

      <div class="catalog-list-item-img">

        <div
          v-if="imgIsArray"
          class="catalog-list-item-slider">

          <swiper :options="swiperOptions">

            <swiper-slide
              v-for="(imgArr, idx) in item.imgSrc"
              :key="idx"
            >

              <div class="catalog-list-item-slide">

                <img
                  v-for="(img, idx2) in imgArr"
                  :key="idx2"
                  :class="{'active': img.color === selectedColor}"
                  :src="img.imgSrc"
                  alt="">

              </div>

            </swiper-slide>

          </swiper>

          <div
            ref="pagination"
            class="catalog-list-item-slider-pagination"
            :class="`pagination-${index}`"
            slot="pagination"/>

        </div>

        <div
          v-else
          class="catalog-list-item-img-container">

          <nuxt-link :to="'/catalog/' + item.id">
            <img
              :src="item.imgSrc"
              alt="">
          </nuxt-link>

        </div>

      </div>

      <div class="catalog-list-item-info">

        <div class="catalog-list-item-id">ID товара: {{ item.colors ? currentColor.productId : item.productId }}</div>

        <div class="catalog-list-item-title">
          <nuxt-link :to="'/catalog/' + item.id">
            {{ item.title }}
          </nuxt-link>
        </div>

        <div class="product-item-price">
          <span>{{ currentColor.price  | priceFilter }} ₽</span>
        </div>

      </div>

      <div class="catalog-list-item-mob">

        <div class="colors">

          <div
            v-for="(color, idx) in item.colors"
            :key="idx"
            class="catalog-list-item-quantity-item">

            <div class="catalog-list-item-quantity-item-color">
              <span
                :style="{backgroundColor: color.background}"
                :class="{'active': selectedColor === color.id}"
                @click="selectedColor = color.id"
              />
              {{ color.title }}
            </div>

          </div>

        </div>

        <div class="product-item-price">
          <span>{{ item.price | priceFilter }} ₽</span>
        </div>

      </div>

    </div>

    <div class="catalog-list-item-form">
      <div
        class="catalog-list-item-form-container"
        ref="formContainer">

        <div class="catalog-list-item-quantity">

          <div
            v-for="(color, idx) in item.colors"
            :key="idx"
            class="catalog-list-item-quantity-item">

            <div class="catalog-list-item-quantity-item-color">
              <span
                :style="{backgroundColor: color.background}"
                :class="{'active': selectedColor === color.id}"
                @click="selectedColor = color.id"
              />
              {{ color.title }}
            </div>

            <div class="catalog-list-item-quantity-input">

              <FormQuantityInput
                :value="color.quantity"
                @change-quantity="changeQuantity(color.productId, $event)"/>

            </div>

          </div>

        </div>

        <div class="catalog-list-item-total">

          <div class="catalog-list-item-clear">
            <a
              href="#"
              @click.prevent="deleteItem"
            >
              Удалить
            </a>
          </div>

          <div class="catalog-list-item-total-info">Минимальная сумма заказа <br>составляет 100 000₽.</div>

          <div class="catalog-list-item-total-value">
            Итого
            <span>{{ tweenedTotal.toFixed(0) | priceFilter }} ₽</span>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { gsap } from 'gsap'

export default {
  name: 'CatalogListItem',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    item: Object,
    index: Number,
    totalInfo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgIsArray () {
      return Array.isArray(this.item.imgSrc)
    },
    currentColor () {
      const res = this.item.colors.filter(item => item.id === this.selectedColor)[0]
      return res || {}
    },
    getTotalPrice () {
      let res = 0
      this.item.colors.forEach(color => {
        res += color.quantity * color.price
      })
      return res
    }
  },
  watch: {
    getTotalPrice: {
      handler (newVal) {
        gsap.to(this.$data, {
          duration: 0.5,
          tweenedTotal: newVal
        })
      },
      immediate: true
    }
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 400,
        pagination: {
          el: `.pagination-${this.index}`,
          type: 'bullets',
          clickable: true
        }
      },
      selectedColor: 0,
      sliderIsReady: false,
      tweenedTotal: 0,
      isMob: false,
      loading: false
    }
  },
  methods: {
    async changeQuantity (productId, quantity) {
      this.loading = true
      try {
        if (quantity) {
          await this.$store.dispatch('basket/updateBasket', {
            productId,
            quantity
          })
        } else {
          await this.$store.dispatch('basket/deleteItem', productId)
        }
      } finally {
        this.loading = false
        this.$emit('update')
      }
    },
    async deleteItem () {
      const promises = []
      this.loading = true
      this.item.colors.forEach(color => {
        promises.push(
          this.$store.dispatch('basket/deleteItem', color.productId)
        )
      })
      await Promise.all(promises)
      this.$emit('delete')
      this.loading = false
    }
  },
  mounted () {
    this.selectedColor = this.item.colors[0].id
  }
}
</script>

<style
  lang="sass"
  scoped
>

</style>
