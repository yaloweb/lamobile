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
  sections: [],
  similarArticles: []
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
    const res = await this.$axios.$get(`/catalog/product/${symbol}`)
    commit('setProductInfo', res)
  },
  productAdmission (ctx, { id, email, name }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/catalog/subscribe/${id}`, {
        params: {
          id,
          email,
          name
        }
      }).then(resolve).catch(reject)
    })
  }
}
