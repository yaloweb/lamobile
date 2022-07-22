<template>

  <div class="product-item">

    <div
      v-if="item.tag"
      class="product-item-tag"
      :class="item.tag ? item.tag.color : ''">
      {{item.tag.title}}
    </div>

    <div
      class="product-item-img"
      :class="{'is-slider': Array.isArray(item.imgSrc)}"
      @mouseleave="hoverImg = 0"
    >

      <div
        v-if="item.imgSrc && item.imgSrc.length"
        class="product-item-img-container">

        <template v-if="Array.isArray(item.imgSrc)">

          <template v-if="typeof item.imgSrc[0] === 'object'">
            <div
              v-for="(imgList, index) in item.imgSrc"
              :key="index"
              class="product-item-img-slider"
              :class="{'visible': imgList.productId === selectedColor}"
            >
              <div
                class="product-item-img-slider-img-hover"
                @click.prevent="$router.push(item.url)"
              >
                <span
                  v-for="(i, idx) in imgList.list"
                  :key="`${index}-1-${idx}`"
                  @mouseenter="hoverImg = idx"
                />
              </div>
              <div class="product-item-img-slider-img">
                <template v-if="imgList.list.length">
                  <img
                    v-for="(imgItem, idx) in imgList.list"
                    :key="`${index}-2-${idx}`"
                    :src="imgItem"
                    :class="{'active': hoverImg === idx}"
                    alt=""
                  />
                </template>
                <ProductNoPicture v-else/>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="product-item-img-slider visible">
              <div
                class="product-item-img-slider-img-hover"
                @click.prevent="$router.push(item.url)"
              >
                <span
                  v-for="(i, idx) in item.imgSrc"
                  :key="`1-${idx}`"
                  @mouseenter="hoverImg = idx"
                />
              </div>
              <div class="product-item-img-slider-img">
                <template v-if="item.imgSrc.length">
                  <img
                    v-for="(imgItem, idx) in item.imgSrc"
                    :key="`2-${idx}`"
                    :src="imgItem"
                    :class="{'active': hoverImg === idx}"
                    alt=""
                  />
                </template>
                <ProductNoPicture v-else/>
              </div>
            </div>
          </template>

        </template>

        <template v-else>

          <nuxt-link :to="getUrl">
            <img
              :src="item.imgSrc"
              alt="">
          </nuxt-link>

        </template>
      </div>

      <ProductNoPicture v-else/>

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
              :key="color.productId"
              class="product-img-thumb"
              :class="{active: selectedColor === color.productId}"
              @click="selectedColor = color.productId"
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
      return this.item.colors?.filter(item => item.productId === this.selectedColor)[0]
    },
    getUrl () {
      return this.item.url || '#'
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
      this.selectedColor = this.item.colors[0].productId
    }
  }
}
</script>

<style scoped>
</style>
