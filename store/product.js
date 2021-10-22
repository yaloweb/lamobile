export const state = () => ({
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
  set: {}
})

export const mutations = {
  setProductInfo (state, data) {
    for (const key in data) {
      if (data[key]) {
        state[key] = data[key]
      }
    }
  }
}

export const actions = {
  async getProductInfo ({ commit }, symbol) {
    const res = await this.$axios.get(`/products/${symbol}.json`)
    commit('setProductInfo', res.data)
  }
}
