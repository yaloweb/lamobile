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
      title: 'По умолчанию'
    },
    {
      code: 'price',
      title: 'По цене'
    },
    {
      code: 'title',
      title: 'По названию'
    }
  ],
  selectedSort: {
    code: 'default',
    title: 'По умолчанию'
  },
  meta: {
    title: null,
    keywords: null,
    description: null,
    h1: null
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
  setCatalogMeta (state, meta) {
    state.meta = meta
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
    const newResPromise = this.$axios.$get('/catalog/product?new=y').then(resp => {
      newRes = resp.list
    })
    const popularResPromise = this.$axios.$get('/catalog/product?popular=y').then(resp => {
      popularRes = resp.list
    })
    const recommendedResPromise = this.$axios.$get('/catalog/product?recommended=y').then(resp => {
      recommendedRes = resp.list
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
    commit('setCatalog', res.list)
    commit('setCatalogMeta', res.meta)
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
    commit('setCatalogMeta', res.meta)
    commit('setCatalog', res.list)
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
