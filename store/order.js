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
  }
})

export const mutations = {
  setOrderData (state, data) {
    for (let key in data) {
      state[key] = data[key]
    }
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
      await this.$axios.$post('/natural/order/send', null, {
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
    return new Promise((resolve, reject) => {
      this.$axios.$post('/natural/order/send', null, {
        params: {
          fUserId,
          ...params
        }
      }).then(response => {
        resolve(response)
        // eslint-disable-next-line no-undef
      }).catch(reject)
    })
  },
  paymentCheckout (ctx, { id, hash }) {
    return this.$axios.$get(`/natural/order/${id}`, {
      params: {
        hash
      }
    })
  }
}
