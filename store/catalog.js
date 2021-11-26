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
  async getSliderProducts ({ commit }) {
    const res = await this.$axios.get('/product-slider-list.json')
    commit('setSliderProducts', res.data)
  },
  async getCatalog ({ commit }, symbol) {
    const res = await this.$axios.get('/catalog.json')
    commit('setCatalog', res.data)
  },
  async getBrandsMainInfo ({ commit }, symbol) {
    const res = await this.$axios.get('/brand-catalog-main.json')
    commit('setBrandsMainInfo', res.data)
  }
}
