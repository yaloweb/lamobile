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
  promocode: null
})

export const mutations = {
  setOrderData (state, data) {
    for (let key in state) {
      state[key] = data[key]
    }
  }
}

export const actions = {
  async sendOrder ({ commit }, params = {}) {
    const fUserId = this.$cookies.get('fUserId')
    if (fUserId) {
      await this.$axios.$post('/natural/order/send', null, {
        params: {
          fUserId,
          ...params
        }
      }).then(resp => {
        commit('setOrderData', resp)
        return resp
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
