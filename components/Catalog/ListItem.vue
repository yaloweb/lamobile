<template>
  <div class="catalog-list-item">

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
                  :class="{'active': item.colors ? (img.color === selectedColor) : true}"
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
          <span>{{ item.price | priceFilter }} ₽</span>
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

    <div
      class="catalog-list-item-form"
      :class="{'opened': fullCard}">
      <div
        class="catalog-list-item-form-container"
        ref="formContainer">

        <div class="catalog-list-item-quantity">

          <template v-if="item.colors">

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
                  v-model="selectedItems[idx]"
                  :max="color.quantity"/>

              </div>

            </div>

          </template>

          <template v-else>

            <div class="catalog-list-item-quantity-item-color" />

            <div class="catalog-list-item-quantity-input">

              <FormQuantityInput
                v-model="selectedItemsOnlyOne"
                :max="item.quantity"/>

            </div>

          </template>

        </div>

        <div class="catalog-list-item-total">

          <div class="catalog-list-item-clear">
            <a
              v-if="deleteButton"
              href="#"
              @click.prevent="$emit('delete')"
            >
              Удалить
            </a>
            <a
              v-else
              href="#"
              @click.prevent="clearSelected"
              class="reset"
            >Сбросить</a>
          </div>

          <div class="catalog-list-item-total-info">Минимальная сумма заказа <br>составляет 100 000₽.</div>

          <div class="catalog-list-item-total-value">
            Итого
            <span>{{ tweenedTotal.toFixed(0) | priceFilter }} ₽</span>
          </div>

        </div>

      </div>
    </div>

    <div
      class="catalog-list-item-more-btn"
      :class="{'active': fullCard}"
      @click="toggleFull">
      <span class="icon-arrow-down" />
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
    deleteButton: {
      type: Boolean,
      default: false
    },
    totalInfo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgIsArray () {
      return Array.isArray(this.item.imgSrc)
    },
    getTotalPrice () {
      let res = 0
      if (this.item.colors) {
        this.selectedItems.forEach((item, index) => {
          res += item * this.item.colors[index].price
        })
      } else {
        res = this.item.price * this.selectedItemsOnlyOne
      }
      return res
    },
    currentColor () {
      const res = this.item.colors.filter(item => item.id === this.selectedColor)[0]
      return res || {}
    }
  },
  watch: {
    // item: {
    //   handler () {
    //     if (this.item.colors) {
    //       this.selectedColor = this.item.colors[0].id
    //       this.setSelectedItems()
    //     }
    //   },
    //   deep: true
    // },
    getTotalPrice (newVal) {
      gsap.to(this.$data, { duration: 0.5, tweenedTotal: newVal })
      this.$emit('change-selected-items', {
        selectedItems: this.selectedItems,
        selectedItemsOnlyOne: this.selectedItemsOnlyOne
      })
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
      selectedItems: [],
      selectedItemsOnlyOne: 0,
      tweenedTotal: 0,
      isMob: false,
      fullCard: false
    }
  },
  methods: {
    setSelectedItems () {
      if (this.item.colors) {
        this.item.colors.forEach(color => {
          this.selectedItems.push(color.inBasket || 0)
        })
      }
    },
    clearSelected () {
      this.setSelectedItems()
      this.selectedItemsOnlyOne = 0
    },
    toggleFull () {
      this.fullCard = !this.fullCard
    }
  },
  mounted () {
    if (this.item.colors) {
      this.selectedColor = this.item.colors[0].id
      this.setSelectedItems()
    } else {
      this.selectedItemsOnlyOne = 0
    }
  }
}
</script>

<style
  lang="sass"
  scoped
>

</style>
