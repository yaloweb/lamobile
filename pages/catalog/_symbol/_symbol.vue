<template>
  <div class="product-page">

    <UIBreadcrumbs/>

    <section class="s-product">
      <div class="container">

        <div class="product-main">

          <div class="product-main-img">
            <div class="product-main-img-container">
              <img
                v-for="img in productImages"
                :key="img.id"
                :class="{'visible': img.color === selectedColor}"
                :src="img.imgSrc"
                alt="">
            </div>
          </div>

          <div class="product-main-info">

            <div class="product-main-info-content">

              <div class="product-main-id">ID товара: {{ productId }}</div>

              <div class="product-title">
                <h1 v-html="title"/>
              </div>

              <div class="product-colors">
                <div class="product-colors-block">
                  <span
                    v-for="color in colors"
                    :key="color.id"
                    :style="{backgroundColor: color.background}"
                    :class="{'active': color.id === selectedColor}"
                    @click="selectedColor = color.id"/>
                </div>
              </div>

              <div class="product-buy">
                <button class="btn btn-border">Купить от {{ price | priceFilter }} ₽</button>
              </div>

            </div>

            <div class="product-gifts">

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

          </div>

        </div>

        <div class="s-products-features">

          <div class="small-container">

            <div class="h3">Характеристики</div>

            <div class="products-features">
              <ul>
                <li>
                  <span>Производитель</span>
                  <span>{{ features.manufacturer }}</span>
                </li>
                <li>
                  <span>Страна</span>
                  <span>{{ features.country }}</span>
                </li>
                <li>
                  <span>Материал</span>
                  <span>{{ features.material }}</span>
                </li>
                <li>
                  <span>Объём</span>
                  <span>{{ features.volume }}</span>
                </li>
                <li>
                  <span><a href="#">Гарантия</a></span>
                  <span>{{ features.guarantee }}</span>
                </li>
              </ul>
            </div>

            <div class="products-features-descr">
              <div
                class="products-features-descr-content"
                v-html="featuresFooterInfo"/>
            </div>

          </div>

        </div>

      </div>
    </section>

    <section class="s-recommended">
      <div class="container">

        <div class="section-title">
          <div class="h3">Рекомендуем также посмотреть</div>
        </div>

        <SliderProducts :list="recommendedProducts" />

      </div>
    </section>

    <section class="s-similar">
      <div class="container">

        <div class="section-title">
          <div class="h3">Похожее в журнале</div>
        </div>

        <SliderSimilar :list="similarProducts"/>

      </div>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('recommended/getRecommended'),
      this.$store.dispatch('recommended/getSimilar')
    ])
  },
  name: 'ProductPage',
  computed: {
    ...mapState({
      recommendedProducts: state => state.recommended.recommendedProducts,
      similarProducts: state => state.recommended.similarProducts
    })
  },
  data: () => ({
    productId: 7770002257,
    title: 'Основная щетка Roborock Main Brush of Robotic Vacuum Cleaner для робота-пылесоса S5 (SDZS02RR)',
    colors: [
      {
        id: 1,
        background: '#EEEFF3'
      },
      {
        id: 2,
        background: '#000000'
      },
      {
        id: 3,
        background: '#DDBBBB'
      }
    ],
    productImages: [
      {
        id: 1,
        color: 1,
        imgSrc: '/img/product/1.jpg'
      },
      {
        id: 2,
        color: 2,
        imgSrc: '/img/product/2.jpg'
      },
      {
        id: 3,
        color: 3,
        imgSrc: '/img/product/3.jpg'
      }
    ],
    selectedColor: 1,
    price: 990,
    giftsDescr: 'Рюкзак + термос + зонт Roborock <br> в подарок при покупке пылесоса',
    gifts: [
      {
        id: 1,
        title: 'Рюкзак',
        imgSrc: '/img/gifts/1.png'
      },
      {
        id: 2,
        title: 'Термос',
        imgSrc: '/img/gifts/2.png'
      },
      {
        id: 3,
        title: 'зонт Roborock',
        imgSrc: '/img/gifts/3.png'
      }
    ],
    features: {
      manufacturer: 'Roborock',
      country: 'Китай',
      material: 'Пластик',
      volume: '297 мл',
      guarantee: '365 дней'
    },
    featuresFooterInfo: 'Информация о технических характеристиках, описании, комплекте поставки и внешнем виде носит ознакомительный характер, не является публичной офертой, определяемой положениями статьи 437 ГК РФ и может быть изменена производителем без предварительного уведомления. Информацию о товаре уточняйте у наших менеджеров.'
  })
}
</script>

<style scoped>

</style>
