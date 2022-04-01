const getDefaultState = () => ({
  productId: 0,
  pageType: 0,
  title: '',
  colors: [],
  inStock: true,
  productImages: [],
  price: 0,
  giftsDescr: '',
  gifts: [],
  features: {},
  featuresFooterInfo: '',
  advantages: [],
  description: '',
  set: {},
  youtubeVideo: {},
  additionalAdvantages: {},
  operation: {},
  compareSection: false,
  deliveryTime: null,
  deliveryGift: null
})

export const state = getDefaultState()

export const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setProductInfo (state, data) {
    for (const key in data) {
      const dataIsDefined = data[key] !== undefined && data[key] !== null
      if (dataIsDefined) {
        state[key] = data[key]
      }
    }
  }
}

export const actions = {
  startResetState ({ commit }) {
    commit('resetState')
  },
  async getProductInfo ({ dispatch, commit }, symbol) {
    const res = await this.$axios.$get(`http://lamobile-api.bikstart.ru/api/catalog/product/${symbol}`)
    // const res = await this.$axios.$get(`/products/${symbol}`)
    console.log(res)
    dispatch('startResetState')
    commit('setProductInfo', res)
  }
}
