export const state = () => ({
  categories: [],
  sliderProducts: [],
  catalog: [],
  brandsMainInfo: {
    bannerImgSrc: '',
    title: '',
    descr: '',
    logoSrc: '',
    advantage: '',
    youtubeVideo: null
  },
  subcategories: [],
  sortList: [
    {
      code: 'price',
      title: 'по цене'
    },
    {
      code: 'title',
      title: 'по названию'
    }
  ],
  selectedSort: {
    code: 'price',
    title: 'по цене'
  },
  selectedSubcategory: []
})

export const getters = {
  categoriesFilter (state) {
    return [...state.catalog].sort((a, b) => {
      if (state.selectedSort.code === 'price') {
        return a.price - b.price
      } else if (state.selectedSort.code === 'title') {
        return a.title.localeCompare(b.title)
      } else {
        return 0
      }
    })
  }
}

export const mutations = {
  setCatalogCategories (state, array) {
    state.categories = array
  },
  setSliderProducts (state, array) {
    state.sliderProducts = array
  },
  setCatalog (state, array) {
    state.catalog = array
  },
  setBrandsMainInfo (state, data) {
    for (let key in data) {
      state.brandsMainInfo[key] = data[key]
    }
  },
  setSubcategories (state, data) {
    state.subcategories = data
  },
  setSelectedSort (state, data) {
    state.selectedSort = data
  },
  setSelectedSubcategory (state, data) {
    if (!state.selectedSubcategory.filter(item => item.id === data.id).length) {
      state.selectedSubcategory.push(data)
    }
  },
  deleteSelectedSubcategory (state, data) {
    state.selectedSubcategory = state.selectedSubcategory.filter(item => item.id !== data.id)
  }
}

export const actions = {
  async getCatalogCategories ({ commit }) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/category')
    commit('setCatalogCategories', res)
  },
  async getSliderProducts ({ commit }) {
    const res = await this.$axios.get('/product-slider-list')
    commit('setSliderProducts', res.data)
  },
  async getCatalog ({ commit }, category) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/product', {
      params: {
        categoryCode: category
      }
    })
    // const res = await this.$axios.$get('/catalog')
    commit('setCatalog', res)
  },
  async getBrandsMainInfo ({ commit }, symbol) {
    const res = await this.$axios.$get('/brand-catalog-main')
    commit('setBrandsMainInfo', res)
  },
  async getSubcategories ({ commit }, symbol) {
    const res = await this.$axios.$get('/subcategories')
    commit('setSubcategories', res)
  },
  async getCatalogFilterByCategories ({ commit }, data) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/product', {
      params: {
        categoryCode: data.category
      }
    })
    commit('setCatalog', res)
  }
}
