export const state = () => ({
  products: [],
  gifts: {
    descr: '',
    list: []
  },
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
    state.gifts.descr = data.gifts.descr
    state.gifts.list = data.gifts.list
    state.total.products = data.total.products
    state.total.delivery = data.total.delivery
    state.total.discount = data.total.discount
  }
}

export const actions = {
  async getBasketData ({ commit }) {
    const res = await this.$axios.get('/basket')
    commit('setBasketData', res.data)
  },
  async deleteProduct ({ commit }, id) {
    const res = await this.$axios.get('/basket')
    commit('setBasketData', res.data)
  },
  addToBasket (ctx, { productId, quantity }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: 'http://lamobile-api.bikstart.ru/api/basket/add',
        data: {
          productId,
          quantity
        }
      }).then(response => {
        resolve()
      }).catch(error => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(error)
        return error
      })
    })
  }
}
