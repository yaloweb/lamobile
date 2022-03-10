export const state = () => ({
  categories: [],
  sliderProducts: [],
  catalog: [],
  brandsMainInfo: {
    bannerImgSrc: '',
    title: '',
    descr: '',
    logoSrc: '',
    advantage: ''
  }
})

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
    state.brandsMainInfo.bannerImgSrc = data.bannerImgSrc
    state.brandsMainInfo.title = data.title
    state.brandsMainInfo.descr = data.descr
    state.brandsMainInfo.logoSrc = data.logoSrc
    state.brandsMainInfo.advantage = data.advantage
  }
}

export const actions = {
  async getCatalogCategories ({ commit }) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/category')
    commit('setCatalogCategories', res)
  },
  async getSliderProducts ({ commit }) {
    const res = await this.$axios.get('/product-slider-list.json')
    commit('setSliderProducts', res.data)
  },
  async getCatalog ({ commit }, category) {
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/catalog/product', {
      params: {
        categoryCode: category
      }
    })
    commit('setCatalog', res)
  },
  async getBrandsMainInfo ({ commit }, symbol) {
    const res = await this.$axios.get('/brand-catalog-main.json')
    commit('setBrandsMainInfo', res.data)
  }
}
