export const state = () => ({
  product: {
    notAvailable: {
      title: null,
      text: null
    }
  }
})

export const mutations = {
  setProductText (state, textList) {
    state.product.notAvailable = textList['not-available']
  }
}

export const actions = {
  async getProductText ({ commit }) {
    const res = await this.$axios.$get('/text', {
      params: {
        code: 'natural-catalog-detail'
      }
    })
    commit('setProductText', res.list)
  }
}
