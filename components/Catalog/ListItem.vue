<template>

  <div
    class="product-list-view"
    :class="{'disabled': item.inStock === false}">
    <div class="product-list-view-row">

      <div
        v-if="item.tag"
        class="product-list-view-tag mob"
        :class="item.tag.color"
        v-text="item.tag.title"/>

      <div class="product-list-view-img">
        <nuxt-link
          :to="item.url"
          :event="item.inStock === false ? '' : 'click'">
          <img
            v-if="Array.isArray(item.imgSrc)"
            :src="item.imgSrc[0][0].imgSrc"
            alt="">
          <img
            v-else
            :src="item.imgSrc"
            alt="">
        </nuxt-link>
      </div>

      <div class="product-list-view-id">ID товара: <br>{{item.productId}}</div>

      <div class="product-list-view-title">
        <div class="product-list-view-id mob">ID товара: {{item.productId}}</div>
        <div
          v-if="item.tag"
          class="product-list-view-tag"
          :class="item.tag.color"
          v-text="item.tag.title"/>
        <div class="h6">
          <nuxt-link
            :to="item.url"
            :event="item.inStock === false ? '' : 'click'"
            v-text="item.title" />
        </div>
      </div>

      <div
        v-if="item.inStock !== false"
        class="product-colors-qnt">

        <template v-if="item.colors">
          <div
            v-for="(color, colorIdx) in item.colors"
            :key="color.id"
            class="product-color-item">
            <div
              class="product-color-item-texture"
              :class="{'with-border': color.withBorder}"
              :style="{backgroundColor: color.background}"/>
            <div class="product-color-item-quantity">
              <input
                v-model="selectedItems[colorIdx]"
                type="number"
                :class="{'is-error': error}"
                :disabled="color.quantity === undefined || color.quantity === 0"
                @input="setSelectedItemsValue(colorIdx, color.quantity, $event.target.value)"
              >
            </div>
            <div
              v-if="color.quantity !== undefined && color.quantity !== 0"
              class="product-color-item-price">{{ color.price | priceFilter }} ₽
            </div>
          </div>
        </template>

        <template v-else>
          <div class="product-color-item">

            <div class="product-color-item-texture"/>

            <div
              class="product-color-item-quantity">
              <input
                v-model="selectedItemsOnlyOne"
                type="number"
                :class="{'is-error': error}"
                @input="setSelectedItemsValue(undefined, item.quantity, $event.target.value)"
                :disabled="item.quantity === undefined || item.quantity === 0">
            </div>

          </div>
        </template>

      </div>

      <div
        v-if="item.inStock !== false"
        class="product-list-view-price">
        <span>{{ item.price | priceFilter }} ₽</span>
      </div>

      <div
        v-if="item.inStock !== false"
        class="product-list-view-cart">
        <button
          class="btn btn-border"
          @click="addToBasket">Добавить в корзину</button>
      </div>

      <div
        v-if="item.inStock === false"
        class="product-list-view-inquire">
        <a href="#">Узнать о поступлении></a>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'CatalogListItem',
  props: {
    item: Object
  },
  computed: {
    imgIsArray () {
      return Array.isArray(this.item.imgSrc)
    },
    currentColor () {
      const res = this.item.colors.filter(item => item.id === this.selectedColor)[0]
      return res || {}
    }
  },
  data: () => ({
    selectedItems: [],
    selectedItemsOnlyOne: 0,
    error: false
  }),
  methods: {
    setSelectedItems () {
      if (this.item.colors) {
        this.item.colors.forEach(color => {
          this.selectedItems.push(0)
        })
      }
    },
    setSelectedItemsValue (index, maxValue, value) {
      let val = parseInt(value)
      if (val < 0) {
        val = 0
      }
      if (val >= maxValue) {
        val = maxValue
      }
      if (val === '') {
        val = null
      }
      if (index === undefined) {
        this.selectedItemsOnlyOne = val || 0
      } else {
        this.selectedItems[index] = val || 0
      }
    },
    addToBasket () {
      if (this.item.colors) {
        if (this.selectedItems.filter(item => item === 0).length === this.selectedItems.length) {
          this.error = true
        } else {
          this.error = false
        }
      } else {
        this.error = !this.selectedItemsOnlyOne
      }
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

<style scoped>

</style>
