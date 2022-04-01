<template>

  <div class="compare-table-block">

    <AccordionItem
      :opened="accordionOpened"
      @toggle="accordionOpened = !accordionOpened">

      <template #header>Сравните модели</template>

      <template #body>

        <div class="compare-table-title">
          <div
            class="h1"
            v-html="title"/>
        </div>

        <div class="compare-table">

          <div class="compare-table-parameters">
            <ul>
              <li ref="parameterTitle">Название модели</li>
              <li
                ref="parameter"
                v-for="parameter in parameters"
                :key="parameter.key"
                v-html="parameter.title"/>
            </ul>
          </div>

          <div class="compare-table-items">

            <div class="compare-items-list">

              <div
                v-for="(item, index) in compareItems"
                :key="`${item.id}-${index}`"
                ref="product"
                class="compare-item">

                <div class="compare-item-select">
                  <v-select
                    label="title"
                    :options="items"
                    v-model="activeElements[index]"
                    :reduce="option => option.id"
                    :searchable="false"/>
                </div>

                <div class="compare-item-img">
                  <img
                    :src="item.imgSrc"
                    alt="">
                </div>
                <div
                  ref="productTitle"
                  class="compare-item-title"
                  v-html="item.title" />
                <div class="compare-item-parameters">
                  <ul>
                    <li
                      v-for="parameter in parameters"
                      :key="parameter.key">
                      <template v-if="parameter.key === 'colors'">
                        <div class="compare-items-colors">
                      <span
                        v-for="(color, colorIndex) in item.parameters.colors"
                        :key="colorIndex"
                        :style="{backgroundColor: color}"/>
                        </div>
                      </template>
                      <template v-else>
                        {{ item.parameters[parameter.key] ? (item.parameters[parameter.key].length > 0 ? item.parameters[parameter.key] : '1-') : '-' }}
                      </template>
                    </li>
                  </ul>
                </div>
                <div class="compare-item-btn">
                  <nuxt-link
                    :to="item.url"
                    class="compare-item-link">Подробнее <span class="icon-angle-right-light" /></nuxt-link>
                </div>
              </div>

            </div>

          </div>

        </div>

      </template>

    </AccordionItem>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('compare/getCompareData').then(() => {
      this.activeElements.push(this.items[0].id)
      this.activeElements.push(this.items[1].id)
      this.activeElements.push(this.items[2].id)
      this.eqHeight()
    })
  },
  name: 'Table',
  computed: {
    ...mapState({
      title: state => state.compare.title,
      parameters: state => state.compare.parameters,
      items: state => state.compare.items
    }),
    compareItems () {
      let arr = []
      this.activeElements.forEach(id => {
        arr.push(this.getCurrentCompareItem(id))
      })
      this.eqHeight()
      return arr
    }
  },
  data: () => ({
    activeElements: [],
    accordionOpened: false
  }),
  methods: {
    getCurrentCompareItem (id) {
      return Object.assign({}, this.items.filter(item => item.id === id)[0])
    },
    eqHeight () {
      this.$nextTick(() => {
        const parameterTitle = this.$refs.parameterTitle
        const productTitle = this.$refs.productTitle

        if (productTitle) {
          productTitle.forEach(item => {
            item.style.removeProperty('height')
          })
        }

        const parameter = this.$refs.parameter
        const product = this.$refs.product
        let titleHeight = 0

        if (productTitle) {
          productTitle.forEach(item => {
            if (item.offsetHeight > titleHeight) {
              titleHeight = item.offsetHeight
            }
          })
        }

        if (parameterTitle) {
          parameterTitle.style.height = `${titleHeight}px`
        }

        if (productTitle) {
          productTitle.forEach(item => {
            item.style.height = `${titleHeight}px`
          })
        }

        if (parameter) {
          parameter.forEach((item, index) => {
            if (product) {
              product.forEach(group => {
                group.querySelectorAll('.compare-item-parameters li').forEach((prodItem, prodIndex) => {
                  if (prodIndex === index) {
                    prodItem.style.height = `${item.clientHeight}px`
                  }
                })
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    this.eqHeight()
    window.addEventListener('resize', this.eqHeight)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.eqHeight))
  }
}
</script>

<style scoped>

</style>
