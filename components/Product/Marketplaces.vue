<template>
  <div class="product-marketplaces">

    <div class="product-marketplaces-title">Или купить на другой площадке</div>

    <div class="product-marketplaces-row">

      <div
        v-for="(marketplace, key) in marketplaces"
        :key="marketplace"
        class="product-marketplace">

        <template v-if="marketplaceList[key]">
          <a
            :href="marketplace"
            class="product-marketplace-link"
            target="_blank"
          />

          <div class="product-marketplace-img">
            <img
              :src="marketplaceList[key].img"
              alt="">
          </div>

          <div class="product-marketplace-title">
            {{ marketplaceList[key].title }}
          </div>
        </template>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductMarketplaces',
  props: {
    marketplaces: Object
  },
  data: () => ({
    marketplaceList: {
      yandex: {
        img: '/img/marketplaces/yandex.png',
        title: 'Яндекс.Маркет'
      },
      ozon: {
        img: '/img/marketplaces/ozon.png',
        title: 'Ozon'
      },
      sbermarket: {
        img: '/img/marketplaces/sber.png',
        title: 'Cбер Маркет'
      },
      aliexpress: {
        img: '/img/marketplaces/aliexpress.png',
        title: 'Aliexpress'
      }
    }
  })
}
</script>
