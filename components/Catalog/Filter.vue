<template>
  <div
    :class="{'opened': visibleFilter}"
    class="catalog-filter">

    <div class="catalog-filter-title">Фильтр</div>

    <div
      class="catalog-filter-close"
      @click="closeFilter">
      <span class="icon-close"></span>
    </div>

    <div class="select-brands">

      <nav class="select-category">
        <button
          class="select-category-btn"
          :class="{ 'active': selectedCategory === 1 }"
          @click="selectedCategory = 1">
          Товары
        </button>
        <button
          class="select-category-btn"
          :class="{ 'active': selectedCategory === 2 }"
          @click="selectedCategory = 2">
          Запчасти
        </button>
      </nav>

      <div class="h4">Бренды</div>

      <div
        class="brand-label show-all"
        @click="selectBrand(null, true)">
        <div class="brand-title">Все бренды</div>
      </div>

      <div
        v-for="brand in brands"
        :key="brand.id"
        class="brand-label"
        :class="{'active': filters.brands.filter(item => item === brand.id).length > 0}">
        <div
          class="brand-title"
          @click="selectBrand(brand)">{{ brand.title }}</div>
        <div
          class="brand-close"
          @click="removeBrand(brand.id)">
          <span class="icon-close"/>
        </div>
      </div>

    </div>

    <div class="select-categories">

      <div class="h4">Категории</div>

      <div class="select-categories-list">

        <div class="select-categories-item show-all">
          <label class="filter-checkbox">
            <input
              type="checkbox"
              name="category"
              v-model="categoriesAll"
              @change="categoriesAllSelect">
            <span>Все категории</span>
          </label>
        </div>

        <div
          v-for="category in categories"
          :key="category.id"
          class="select-categories-item">
          <label class="filter-checkbox">
            <input
              type="checkbox"
              name="category"
              v-model="category.selected">
            <span>{{ category.title }}</span>
          </label>
          <div
            v-if="category.subcategories && category.selected"
            class="select-subcategories">
            <div
              v-for="subcategory in category.subcategories"
              :key="`${category.id}-${subcategory.id}`"
              class="select-categories-item">
              <label class="filter-checkbox">
                <input
                  type="checkbox"
                  name="category"
                  v-model="subcategory.selected">
                <span>{{ subcategory.title }}</span>
              </label>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="catalog-filter-btn">
      <button
        class="btn btn-border btn-block"
        @click="closeFilter">Показать товары</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CatalogFilter',
  props: {
    visibleFilter: Boolean
  },
  data: () => ({
    brands: [
      {
        id: 1,
        title: 'Roborock'
      },
      {
        id: 2,
        title: 'Yeelight'
      },
      {
        id: 3,
        title: '70mai'
      },
      {
        id: 4,
        title: 'ZMI'
      },
      {
        id: 5,
        title: '1More'
      },
      {
        id: 6,
        title: 'WalkingPad'
      },
      {
        id: 7,
        title: 'Mi'
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Аксессуары для роботов-пылесосов',
        selected: false
      },
      {
        id: 2,
        title: 'Свет',
        selected: false,
        subcategories: [
          {
            id: 1,
            title: 'Диодные ленты',
            selected: false
          },
          {
            id: 2,
            title: 'Настольные лампы',
            selected: false
          },
          {
            id: 3,
            title: 'Ночники',
            selected: false
          },
          {
            id: 4,
            title: 'Потолочные светильники',
            selected: false
          },
          {
            id: 5,
            title: 'Цокольные лампы',
            selected: false
          }
        ]
      },
      {
        id: 3,
        title: 'Климат',
        selected: false
      },
      {
        id: 4,
        title: 'Внешние аккумуляторы',
        selected: false
      },
      {
        id: 5,
        title: 'Аксессуары в авто',
        selected: false
      },
      {
        id: 6,
        title: 'Беговые дорожки',
        selected: false
      }
    ],
    filters: {
      brands: []
    },
    categoriesAll: false,
    selectedCategory: 1
  }),
  methods: {
    selectBrand (item, all) {
      if (!all) {
        if (this.filters.brands.filter(arrItem => arrItem === item.id).length === 0) {
          this.filters.brands.push(item.id)
        }
      } else {
        this.filters.brands = this.brands.map(item => item.id)
      }
    },
    removeBrand (id) {
      this.filters.brands = this.filters.brands.filter(arrItem => arrItem !== id)
    },
    categoriesAllSelect () {
      let res = !!this.categoriesAll
      this.categories.forEach(category => {
        category.selected = res
        if (category.subcategories) {
          category.subcategories.forEach(subcategory => {
            subcategory.selected = res
          })
        }
      })
    },
    closeFilter () {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>

</style>
