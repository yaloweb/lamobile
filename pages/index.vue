<template>

  <div class="main-page">

    <section class="s-main-window">

      <div class="banners-slider-img">

        <swiper
          ref="bannersImgSwiper"
          :options="swiperOptions">

          <swiper-slide
            v-for="slide in slides"
            :key="slide.id"
            >
            <div
              class="banners-slider-img-item"
              :style="{backgroundImage: `url(${slide.imgSrc})`}"/>
          </swiper-slide>

        </swiper>

      </div>

      <div class="main-window-content">

        <div class="container">

          <div class="banners-slider swiper-container">

            <swiper
              ref="bannersSwiper"
              :options="swiperOptions">

              <swiper-slide
                v-for="slide in slides"
                :key="slide.id">
                <div
                  class="banner-item">

                  <div
                    class="banner-item-title"
                    v-html="slide.title"/>
                  <p v-html="slide.descr"/>
                  <a
                    :href="slide.url"
                    class="btn btn-sm btn-border">Подробнее</a>

                </div>

              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>

            </swiper>

            <div class="banners-button-prev"><span class="icon-arrow-left"></span></div>
            <div class="banners-button-next"><span class="icon-arrow-right"></span></div>

          </div>

          <div class="main-window-logo">
            <img src="~/assets/img/logo-big.svg" alt="">
          </div>

        </div>

      </div>

    </section>

  </div>

</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  layout: 'main',
  components: {
    Swiper,
    SwiperSlide
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      allowTouchMove: false,
      parallax: true,
      navigation: {
        nextEl: '.banners-button-next',
        prevEl: '.banners-button-prev'
      }
    },
    slides: [
      {
        id: 1,
        title: 'Новый круглый <br>и потрясающий',
        imgSrc: require('~/assets/img/main-window.jpg'),
        descr: 'Робот-пылесос Xiaomi Roborock S7 (Русская версия)',
        url: '#'
      },
      {
        id: 2,
        title: 'Новый круглый <br>и потрясающий',
        imgSrc: require('~/assets/img/main-window.jpg'),
        descr: 'Робот-пылесос Xiaomi Roborock S7 (Русская версия)',
        url: '#'
      }
    ]
  })
}
</script>
