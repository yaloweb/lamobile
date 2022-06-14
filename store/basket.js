export const state = () => ({
  products: [],
  gifts: {
    descr: '',
    list: []
  },
  recommended: []
})

export const mutations = {
  setBasketData (state, data) {
    state.products = data.products
    state.gifts.descr = data.gifts.descr
    state.gifts.list = data.gifts.list
    state.recommended = data.recommended
  }
}

export const actions = {
  async getBasketData ({ commit }) {
    const fUserId = this.$cookies.get('fUserId')
    if (fUserId) {
      const res = await this.$axios.$get('/natural/basket', {
        params: {
          fUserId
        }
      })
      commit('setBasketData', res)
    }
  },
  addToBasket ({ dispatch }, { productId, quantity }) {
    const fUserId = this.$cookies.get('fUserId')
    let data = {
      productId,
      quantity
    }
    if (fUserId) {
      data.fUserId = fUserId
    }
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: '/natural/basket/add',
        data
      }).then(response => {
        if (response.data.result === 'success') {
          if (!fUserId) {
            this.$cookies.set('fUserId', response.data.fUserId)
          }
          dispatch('alert/openAlert', 'Товар успешно добавлен в корзину!', { root: true })
          dispatch('getBasketData')
        }
        resolve()
      }).catch(error => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(error)
        return error
      })
    })
  },
  updateBasket ({ dispatch }, { productId, quantity }) {
    const fUserId = this.$cookies.get('fUserId')
    let data = {
      productId,
      quantity
    }
    if (fUserId) {
      data.fUserId = fUserId
    }
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: '/natural/basket/update',
        data
      }).then(response => {
        if (response.data.result === 'success') {
          if (!fUserId) {
            this.$cookies.set('fUserId', response.data.fUserId)
          }
          dispatch('getBasketData')
        }
        resolve()
      }).catch(error => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(error)
        return error
      })
    })
  },
  async deleteItem ({ dispatch }, productId) {
    const fUserId = this.$cookies.get('fUserId')
    if (fUserId) {
      await this.$axios({
        method: 'post',
        url: '/natural/basket/delete',
        data: {
          productId,
          fUserId
        }
      }).then(response => {
        if (response.data.result === 'success') {
          dispatch('getBasketData')
        }
      })
    }
  }
}
