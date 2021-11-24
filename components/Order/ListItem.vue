<template>
  <div class="orders-list-item">

    <div class="order-list-item-info">

      <div class="order-list-item-info-date">
        <nuxt-link :to="`/orders/${item.number}`">Заказ от {{ parseDate (item.createdAt) }}</nuxt-link>
      </div>

      <div class="order-list-item-info-number">№{{ item.number }}</div>

    </div>

    <div class="order-list-item-products">
      <swiper :options="swiperOptions">

        <swiper-slide
          v-for="product in item.products"
          :key="product.id">
          <img
            :src="product.imgSrc"
            alt="">
        </swiper-slide>

      </swiper>
    </div>

    <div class="order-list-item-total">Итого: {{ item.totalPrice | priceFilter }} ₽</div>

    <div
      class="order-list-item-status"
      :class="status(item.status).color">
      {{ status(item.status).title }}
    </div>

    <div class="order-list-item-check">
      <a
        :href="item.checkPdf"
        target="_blank"
        download="">
        <span class="icon-download"></span>
      </a>
    </div>

    <div class="order-list-item-repeat">
      <button class="btn btn-border">Повторить заказ</button>
    </div>

  </div>
</template>

<script>

import moment from 'moment'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'OrderListItem',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    item: Object
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 19,
      speed: 600
    }
  }),
  methods: {
    parseDate (date) {
      const mDate = moment(date).locale('ru')
      return mDate.format('DD MMMM YYYY')
    },
    status (status) {
      switch (status) {
        case 1:
          return {
            color: 'green',
            title: 'Доставлен'
          }
        case 2:
          return {
            color: 'gray',
            title: 'Отменён'
          }
        case 3:
          return {
            color: 'red',
            title: 'Обрабатывается'
          }
        default:
          return {
            color: 'gray',
            title: 'Не определен'
          }
      }
    }
  }
}
</script>

<style scoped>

</style>
