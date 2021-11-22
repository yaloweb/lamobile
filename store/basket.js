export const state = () => ({
  products: [],
  total: {
    products: {
      quantity: 0,
      price: 0
    },
    delivery: 0,
    discount: 0
  }
})

export const mutations = {
  setBasketData (state, data) {
    state.products = data.products
    state.total.products = data.total.products
    state.total.delivery = data.total.delivery
    state.total.discount = data.total.discount
  }
}

export const actions = {
  async getBasketData ({ commit }) {
    const res = await this.$axios.get('/basket.json')
    commit('setBasketData', res.data)
  },
  async deleteProduct ({ commit }, id) {
    const res = await this.$axios.get('/basket.json')
    commit('setBasketData', res.data)
  }
}
