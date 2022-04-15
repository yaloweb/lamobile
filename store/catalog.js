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
  selectedSubcategory: null,
  brandsSubcategories: []
})

export const getters = {
  categoriesFilter (state) {
    return [...state.catalog].sort((a, b) => {
      if (state.selectedSort.code === 'price') {
        return a.price - b.price
      } else if (state.selectedSort.code === 'title') {
        return a.title?.localeCompare(b.title)
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
  setSliderProducts (state, { newRes, popularRes }) {
    if (newRes && newRes.length) {
      state.sliderProducts.push({
        id: 1,
        category: 'Новинки',
        list: newRes
      })
    }
    if (popularRes && popularRes.length) {
      state.sliderProducts.push({
        id: 2,
        category: 'Популярное',
        list: popularRes
      })
    }
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
    state.selectedSubcategory = data
  },
  clearSelectedSubcategory (state) {
    state.selectedSubcategory = null
  },
  setBrandsSubcategories (state, data) {
    state.brandsSubcategories = data
  }
}

export const actions = {
  async getCatalogCategories ({ commit }) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/category')
    if (Array.isArray(res)) {
      commit('setCatalogCategories', res.filter(item => item.level === '1'))
      commit('setSubcategories', res.filter(item => item.level === '2'))
    }
  },
  async getSliderProducts ({ commit }) {
    let newRes = []
    let popularRes = []
    const newResPromise = this.$axios.get('http://lamobile-api.bikstart.ru/api/catalog/product?new=y').then(resp => {
      newRes = resp.data
    })
    const popularResPromise = this.$axios.get('http://lamobile-api.bikstart.ru/api/catalog/product?popular=y').then(resp => {
      popularRes = resp.data
    })
    await Promise.all([
      newResPromise,
      popularResPromise
    ])
    commit('setSliderProducts', {
      newRes,
      popularRes
    })
  },
  async getCatalog ({ commit }, params) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/product', {
      params
    })
    // const res = await this.$axios.$get('/catalog')
    commit('setCatalog', res)
  },
  async getBrandsMainInfo ({ commit }, symbol) {
    const res = await this.$axios.$get(`http://lamobile-api.bikstart.ru/api/catalog/brand/${symbol}`)
    commit('setBrandsMainInfo', res)
  },
  async getCatalogFilterByCategories ({ commit }, category) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/product', {
      params: {
        category
      }
    })
    commit('setCatalog', res)
  },
  async getBrandsCategories ({ commit }, brandCode) {
    const res = await this.$axios.$get('https://lamobile-api.bikstart.ru/api/catalog/category',
      {
        params: {
          brandCode
        }
      })
    commit('setBrandsSubcategories', res.filter(item => item.level === '2'))
  }
}
