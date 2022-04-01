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
    const res = await this.$axios.get('/orders')
    commit('setOrdersList', res.data)
  },
  async getCurrentOrder ({ commit }, id) {
    const res = await this.$axios.get('/current-order')
    commit('setCurrentOrder', res.data)
  }
}
