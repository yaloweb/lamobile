export const state = () => ({
  recommendedProducts: [],
  similarProducts: []
})

export const mutations = {
  setRecommended (state, array) {
    state.recommendedProducts = array
  },
  setSimilar (state, array) {
    state.similarProducts = array
  }
}

export const actions = {
  async getRecommended ({ commit }) {
    const res = await this.$axios.get('/recommended-products.json')
    commit('setRecommended', res.data)
  },
  async getSimilar ({ commit }) {
    const res = await this.$axios.get('/similar.json')
    commit('setSimilar', res.data)
  }
}
