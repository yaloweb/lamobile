<template>
  <div class="product-mobile-footer">
    <div class="product-mobile-footer-title">
      {{ title }}
    </div>
    <div class="product-mobile-footer-btn">
      <button
        class="btn btn-sm"
        :class="{'loading': loading}"
        :disabled="loading"
        @click.prevent="$emit('add-to-basket')"
      >В корзину
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductMobileFooter',
  props: {
    title: String,
    loading: Boolean
  },
  methods: {
    async addToBasket () {
      const data = {
        productId: this.colors ? this.selectedColorObject.productId : this.item.productId,
        quantity: 1
      }
      this.addToCardLoading = true
      try {
        await this.$store.dispatch('basket/addToBasket', data)
      } finally {
        this.addToCardLoading = false
      }
    }
  }
}
</script>
