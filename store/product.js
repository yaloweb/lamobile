const getDefaultState = () => ({
  id: 0,
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
  deliveryGift: null,
  compare: {
    title: '',
    parameters: [],
    items: []
  },
  sections: []
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
    // const res = await this.$axios.$get('https://api-lamobile.bikdev.ru/products/with-cnstructor')
    dispatch('startResetState')
    commit('setProductInfo', res)
  }
}
