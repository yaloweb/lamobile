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

export const state = getDefaultState

export const mutations = {
  resetState (state) {
    for (let key in state) {
      state[key] = getDefaultState()[key]
    }
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
  async getProductInfo ({ dispatch, commit }, symbol) {
    const res = await this.$axios.$get(`/natural/catalog/product/${symbol}`)
    commit('setProductInfo', res)
  }
}
