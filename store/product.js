const getDefaultState = () => ({
  productId: 0,
  pageType: 0,
  title: '',
  colors: [],
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
  compareSection: false
})

export const state = getDefaultState()

export const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setProductInfo (state, data) {
    for (const key in data) {
      if (data[key]) {
        state[key] = data[key] ? data[key] : state[key]
      }
    }
    console.log(state)
  }
}

export const actions = {
  startResetState ({ commit }) {
    commit('resetState')
  },
  async getProductInfo ({ dispatch, commit }, symbol) {
    const res = await this.$axios.get(`/products/${symbol}.json`)
    dispatch('startResetState')
    commit('setProductInfo', res.data)
  }
}
