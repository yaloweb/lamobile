<template>

  <div class="product-page">

    <UIBreadcrumbs/>

    <section class="s-product">
      <div class="container">

        <div class="product-main">

          <ProductInfoImages :selectedColor="selectedColor"/>

          <ProductInfoMain
            :selectedColor="selectedColor"
            @select-color="selectedColor = $event"/>

        </div>

      </div>

    </section>

    <section
      v-if="advantages ? advantages.length > 0 : false"
      class="s-product-advantages">
      <div class="container">

        <div class="advantages">

          <div
            v-for="advantage in advantages"
            :key="advantage.id"
            :style="{backgroundImage: `url(${advantage.imgSrc})`}"
            class="advantages-item">
            <div class="advantages-item-content">
              <div
                class="h2"
                v-html="advantage.title"/>
              <p v-html="advantage.descr"/>
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ProductType2',
  computed: {
    ...mapState({
      advantages: state => state.product.advantages
    })
  },
  data: () => ({
    selectedColor: 1
  })
}
</script>

<style scoped>

</style>
