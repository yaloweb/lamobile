export const state = () => ({
  list: [],
  currentOrder: {
    id: 0,
    number: 0,
    createdAt: '',
    products: [],
    totalPrice: 0,
    status: 1,
    checkPdf: ''
  }
})

export const mutations = {
  setOrdersList (state, data) {
    state.list = data
  },
  setCurrentOrder (state, object) {
    state.currentOrder = object
  }
}

export const actions = {
  async getOrdersList ({ commit }) {
    const res = await this.$axios.get('/orders.json')
    commit('setOrdersList', res.data)
  },
  async getCurrentOrder ({ commit }, id) {
    const res = await this.$axios.get('/current-order.json')
    commit('setCurrentOrder', res.data)
  }
}
