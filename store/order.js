export const state = () => ({
  deliveryServices: [],
  paymentServices: [],
  products: [],
  total: {
    delivery: 0,
    discount: 0,
    products: {
      price: 0,
      quantity: 0
    },
    weight: 0
  },
  successData: {}
})

export const mutations = {
  setOrderData (state, data) {
    for (let key in data) {
      state[key] = data[key]
    }
  },
  setOrderSuccessData (state, data) {
    state.successData = data
  }
}

export const actions = {
  async sendOrder ({ commit }, {
    send,
    name,
    lastName,
    email,
    phone,
    locationCode,
    cityQuery,
    deliveryId,
    paySystemId
  } = {}) {
    const fUserId = this.$cookies.get('fUserId')
    if (fUserId) {
      await this.$axios.$post('/api/natural/order/send', null, {
        params: {
          fUserId,
          send,
          name,
          lastName,
          email,
          phone,
          locationCode,
          cityQuery,
          deliveryId,
          paySystemId
        }
      }).then(resp => {
        commit('setOrderData', resp)
      })
    }
  },
  submitOrder ({ dispatch }, params) {
    const fUserId = this.$cookies.get('fUserId')
    return new Promise((resolve) => {
      this.$axios.$post('/natural/order/send', null, {
        params: {
          fUserId,
          ...params
        }
      }).then(response => {
        resolve(response)
      })
    })
  }
}
