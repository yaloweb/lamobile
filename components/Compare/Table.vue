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
              <li :style="{'height': titleSize ? `${titleSize}px` : 'auto'}">
                <div ref="parameterTitle">Название модели</div>
              </li>
              <li
                v-for="(parameter, idx) in parameters"
                ref="parameter"
                :key="parameter.key"
                :style="{'height': sizes[idx] ? `${sizes[idx]}px` : 'auto'}"
                v-html="parameter.title"
              />
            </ul>
          </div>

          <div class="compare-table-items">

            <div class="compare-items-list">

              <div
                v-for="(item, index) in compareItems"
                :key="`${item.id}-${index}`"
                ref="product"
                class="compare-item"
              >

                <div class="compare-item-select">
                  <v-select
                    v-model="activeElements[index]"
                    label="title"
                    :options="items"
                    :reduce="option => option.id"
                    :searchable="false"
                  />
                </div>

                <div class="compare-item-img">
                  <img
                    :src="item.imgSrc"
                    alt="">
                </div>
                <div
                  class="compare-item-title"
                  :style="{'height': titleSize ? `${titleSize}px` : 'auto'}"
                >
                  <div ref="productTitle">
                    {{ item.title }}
                  </div>
                </div>
                <div class="compare-item-parameters">
                  <ul>
                    <li
                      v-for="(parameter, idx) in parameters"
                      :key="parameter.key"
                      :style="{'height': sizes[idx] ? `${sizes[idx]}px` : 'auto'}"
                    >
                      <div
                        class="compare-item-parameter"
                        ref="parametersValue"
                        :data-title="parameter.title"
                      >
                        <template v-if="parameter.key === 'colors'">
                          <div class="compare-items-colors">
                            <span
                              v-for="(color, colorIndex) in item.parameters.colors"
                              :key="colorIndex"
                              :style="{backgroundColor: color}"
                            />
                          </div>
                        </template>
                        <template v-else>
                          {{ getParameter(parameter, item) }}
                        </template>
                      </div>
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
    accordionOpened: false,
    titleSize: null,
    sizes: []
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
        this.sizes = []
        this.titleSize = null
        const parametrElements = this.$refs.parameter
        const parametersValueElements = this.$refs.parametersValue
        const parameterTitle = this.$refs.parameterTitle
        const productTitle = this.$refs.productTitle

        if (parametrElements) {
          parametrElements.forEach(parametr => {
            this.sizes.push(parametr.offsetHeight)
          })
        }

        if (parametersValueElements) {
          parametersValueElements.forEach((parametr, idx) => {
            const h = parametr.offsetHeight
            if (h > this.sizes[idx]) {
              this.$set(this.sizes, idx, h)
            }
          })
        }

        if (parameterTitle) {
          this.titleSize = parameterTitle.offsetHeight
        }

        if (productTitle) {
          productTitle.forEach(productTitleEl => {
            if (productTitleEl.offsetHeight > this.titleSize) {
              this.titleSize = productTitleEl.offsetHeight
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
