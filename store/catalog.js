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
      code: 'default',
      title: 'по умолчанию'
    },
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
    code: 'default',
    title: 'по умолчанию'
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
  setSliderProducts (state, { newRes, popularRes, recommendedRes }) {
    state.sliderProducts = []
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
    if (recommendedRes && recommendedRes.length) {
      state.sliderProducts.push({
        id: 3,
        category: 'Рекомендованные',
        list: recommendedRes
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
    const res = await this.$axios.$get('/catalog/category')
    if (Array.isArray(res)) {
      commit('setCatalogCategories', res.filter(item => item.level === '1'))
      commit('setSubcategories', res.filter(item => item.level === '2'))
    }
  },
  async getSliderProducts ({ commit }) {
    let newRes = []
    let popularRes = []
    let recommendedRes = []
    const newResPromise = this.$axios.get('/catalog/product?new=y').then(resp => {
      newRes = resp.data
    })
    const popularResPromise = this.$axios.get('/catalog/product?popular=y').then(resp => {
      popularRes = resp.data
    })
    const recommendedResPromise = this.$axios.get('/catalog/product?recommended=y').then(resp => {
      recommendedRes = resp.data
    })
    await Promise.all([
      newResPromise,
      popularResPromise,
      recommendedResPromise
    ])
    commit('setSliderProducts', {
      newRes,
      popularRes,
      recommendedRes
    })
  },
  async getCatalog ({ commit }, params) {
    const res = await this.$axios.$get('/catalog/product', {
      params
    })
    // const res = await this.$axios.$get('/catalog')
    commit('setCatalog', res)
  },
  async getBrandsMainInfo ({ commit }, symbol) {
    const res = await this.$axios.$get(`/catalog/brand/${symbol}`)
    commit('setBrandsMainInfo', res)
  },
  async getCatalogFilterByCategories ({ commit }, category) {
    const res = await this.$axios.$get('/catalog/product', {
      params: {
        category
      }
    })
    commit('setCatalog', res)
  },
  async getBrandsCategories ({ commit }, brandCode) {
    const res = await this.$axios.$get('/catalog/category',
      {
        params: {
          brandCode
        }
      })
    commit('setBrandsSubcategories', res.filter(item => item.level === '2'))
  }
}
