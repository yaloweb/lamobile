<template>

  <div
    class="product-item"
    :class="{'disabled': item.inStock === false}"
  >

    <div
      v-if="item.tag || item.inStock === false"
      class="product-item-tag"
      :class="item.tag ? item.tag.color : ''">

      <template v-if="item.inStock === false">
        <span class="goods-arrival">Нет в наличии</span>
      </template>

      <template v-else>
        {{item.tag.title}}
      </template>

    </div>

    <div
      class="product-item-img"
      :class="{'is-slider': Array.isArray(item.imgSrc)}"
    >

      <div
        v-if="checkImg"
        class="product-item-img-container">

        <template v-if="Array.isArray(item.imgSrc)">

          <div
            v-for="(imgList, index) in item.imgSrc"
            :key="index"
            class="product-item-img-slider"
            :class="{'visible': imgList.color === selectedColor}"
          >
            <div class="product-item-img-slider-img-hover">
              <a
                v-for="(i, idx) in imgList.list"
                :key="`${index}-1-${idx}`"
                :href="item.url"
                @mouseenter="hoverImg = idx"
                @click.prevent="$router.push(item.url)"
              />
            </div>
            <div class="product-item-img-slider-img">
              <img
                v-for="(imgItem, idx) in imgList.list"
                :key="`${index}-2-${idx}`"
                :src="imgItem"
                :class="{'active': hoverImg === idx}"
                alt=""
              />
            </div>
          </div>

        </template>

        <template v-else>

          <nuxt-link
            :to="getUrl"
            :event="item.inStock === false ? '' : 'click'">
            <img
              :src="item.imgSrc"
              alt="">
          </nuxt-link>

        </template>
      </div>

      <div
        v-else
        class="product-item-img-no-picture">
        <img src="/img/icons/photo-camera.png" alt="">
        <span>Нет изображения</span>
      </div>

    </div>

    <div class="product-item-text">

      <div class="product-item-title">

        <nuxt-link
          :to="getUrl"
          :event="item.inStock === false ? '' : 'click'">
          {{ item.title }}
        </nuxt-link>
      </div>

      <div
        v-if="item.inStock !== false"
        class="product-item-footer">

        <div
          v-if="item.colors"
          class="product-img-thumbs-block">
          <div class="product-img-thumbs">
            <div
              v-for="color in item.colors"
              :key="color.id"
              class="product-img-thumb"
              :class="{active: selectedColor === color.id}"
              @click="selectedColor = color.id"
              :style="{backgroundColor: color.background}"/>
          </div>
        </div>

        <div class="product-item-price">
          <span>{{ item.price | priceFilter }} ₽</span>
        </div>

        <div
          class="product-item-add-to-cart">
          <button
            class="product-item-add-to-cart-btn"
            v-tooltip.top="'В корзину'"
            @click="addToBasket"
            :disabled="addToCardLoading">
            <span class="icon-bag"></span>
          </button>
        </div>

      </div>

      <div
        v-else
        class="product-item-not-available-btn">
        <nuxt-link
          class="btn btn-border btn-block"
          :to="getUrl"
        >
          Узнать о поступлении
        </nuxt-link>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    item: Object
  },
  computed: {
    haveColors () {
      return this.item.colors
    },
    currentColor () {
      return this.item.colors?.filter(item => item.id === this.selectedColor)[0]
    },
    checkImg () {
      let can = false
      if (Array.isArray(this.item.imgSrc)) {
        if (this.item.imgSrc.filter(item => item.list ? item.list.length !== 0 : false).length) {
          can = true
        }
      } else if (this.item.imgSrc?.length > 0) {
        can = true
      }
      return can
    },
    getUrl () {
      return this.item.url ? this.item.url : '#'
    }
  },
  data: () => ({
    selectedColor: 0,
    addToCardLoading: false,
    hoverImg: 0
  }),
  methods: {
    async addToBasket () {
      const data = {
        productId: this.haveColors ? this.currentColor.productId : this.item.productId,
        quantity: 1
      }
      this.addToCardLoading = true
      try {
        await this.$store.dispatch('basket/addToBasket', data)
      } finally {
        this.addToCardLoading = false
      }
    }
  },
  mounted () {
    if (this.haveColors) {
      this.selectedColor = this.item.colors[0].id
    }
  }
}
</script>

<style scoped>
</style>
