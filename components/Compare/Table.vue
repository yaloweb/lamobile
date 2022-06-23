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
                        {{ getParameter(parameter, item) }}
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
export default {
  name: 'Table',
  props: {
    title: String,
    parameters: [],
    items: []
  },
  computed: {
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
    getParameter (parameter, item) {
      if (item) {
        const param = item.parameters[parameter.key]
        if (param) {
          return param ? (param.length > 0 ? param : '1-') : '-'
        } else {
          return '-'
        }
      } else {
        return '-'
      }
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
    this.activeElements = this.items.map(item => item.id)
    this.eqHeight()
    window.addEventListener('resize', this.eqHeight)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.eqHeight))
  }
}
</script>

<style scoped>

</style>
